import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlbumData } from "../redux/albumSlice";
import { setModal } from "../redux/modalSlice";

import Loading from "./Loading";

// Deep clone!
const cloneAlbum = (albumData) => {
	const result = { ...albumData };
	result.sections = [...result.sections];

	for (let s = 0; s < result.sections.length; s++) {
		result.sections[s] = { ...result.sections[s] };
		result.sections[s].items = [...result.sections[s].items];

		for (let i = 0; i < result.sections[s].items.length; i++) {
			result.sections[s].items[i] = { ...result.sections[s].items[i] };
		}
	}

	return result;
};

const ModalSave = () => {
	const [isSaving, setIsSaving] = useState(false);
	const [password, setPassword] = useState("");
	const [processed, setProcessed] = useState(0);
	const [saveCount, setSaveCount] = useState(1);
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();

	const imageQueue = [];

	const showError = (error) => {
		// TODO - Add a modal!
		alert(error);
		dispatch(setModal());
	};

	const saveAlbum = async (e) => {
		e?.preventDefault();

		if (isSaving) return;

		const saveMe = cloneAlbum(albumData);

		if (password) {
			saveMe.password = password;
		}

		saveMe.sections.forEach((section, sectionIndex) => {
			section.items.forEach((item, itemIndex) => {
				if (item.type === "Image") {
					const tryData = item.value.dataCropped || item.value.data;

					if (tryData) {
						imageQueue.push({
							sectionIndex,
							itemIndex,
							title: item.title,
							data: tryData,
						});

						setSaveCount((state) => state + 1);
					}
				}
			});
		});

		setIsSaving(true);

		while (imageQueue.length) {
			const imgurResult = await fetch("/api/image", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: imageQueue[0].title,
					data: imageQueue[0].data,
				}),
			}).then((data) => data.json());

			if (imgurResult.url) {
				const curItem =
					saveMe.sections[imageQueue[0].sectionIndex].items[
						imageQueue[0].itemIndex
					];

				saveMe.sections[imageQueue[0].sectionIndex].items[
					imageQueue[0].itemIndex
				] = {
					...curItem,
					value: {
						url: imgurResult.url,
					},
				};
			}

			imageQueue.splice(0, 1); // Clear the queued item.
			setProcessed((state) => state + 1);
		}

		fetch("/api/save", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(saveMe),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					showError(res.status);
				}
			}, showError)
			.then((data) => {
				dispatch(setAlbumData(data));
				dispatch(setModal());
			}, showError);
	};

	// If the album already has an id, then we can go straight to saving.
	useEffect(() => {
		if (albumData._id) {
			saveAlbum(albumData);
		}
	}, []);

	return (
		<div className="modal-generic themeStandard">
			<h3 className="themeTitle">Saving {albumData.title}</h3>
			{isSaving ? (
				<>
					<Loading />
					<progress max={saveCount} value={processed} />
				</>
			) : !albumData._id ? (
				<form onSubmit={saveAlbum}>
					<div className="form-row">
						<input
							type="password"
							className="text themeControl"
							placeholder="Choose a Password..."
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
					</div>
					<div className="form-row">
						<button
							type="submit"
							className="btn"
							disabled={password.length < 4}
						>
							Save
						</button>
						<button
							type="button"
							className="btn"
							onClick={() => dispatch(setModal())}
						>
							Cancel
						</button>
					</div>
				</form>
			) : null}
		</div>
	);
};

ModalSave.noCancel = true;

export default ModalSave;
