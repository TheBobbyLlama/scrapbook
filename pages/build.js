import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setAlbumData, markSaved, setTitle } from "../redux/albumSlice";
import { modalKeys } from "../lib/globals";
import { setModal } from "../redux/modalSlice";

import Head from "next/head";
import Logo from "../components/Logo";
import BuildArea from "../components/BuildArea";
import styles from "../styles/Build.module.css";

export default function CreateAlbum() {
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();
	const router = useRouter();

	const hasData =
		albumData?.title &&
		albumData?.sections.some((section) => section.items.length);
	const canShare = albumData?.saved && hasData;
	const canSave = !albumData?.saved && hasData;

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		const tmpId = query.get("id");

		if (tmpId) {
			/*fetch(`/api/album/${tmpId}`).then((data) => {
				console.log(data);
			});*/
		} else {
			dispatch(
				setAlbumData({
					title: "Untitled Album",
					sections: [],
					private: false,
				})
			);
		}
	}, [dispatch]);

	const clickBrandNav = () => {
		if (hasData) {
			dispatch(
				setModal({
					key: modalKeys.unsavedChanges,
				})
			);
		} else {
			router.push("/");
		}
	};

	const changeTitle = (e) => {
		dispatch(setTitle(e.target.value));
	};

	return (
		<main className={styles.main}>
			<Head>
				<title>
					Cherish - {albumData?.title ? albumData.title : "New Album"}
				</title>
			</Head>
			<header className={styles.header}>
				<h2 className="brand" onClick={clickBrandNav}>
					<Logo size="1em" />
					Cherish
				</h2>
				{albumData && (
					<input
						className={"text in-place " + styles.title}
						type="text"
						maxLength={50}
						value={albumData.title}
						onChange={changeTitle}
					></input>
				)}
				<div className={styles.headerButtons}>
					<button className="btn" disabled={!canShare}>
						Share
					</button>
					<button className="btn" disabled={!canSave}>
						Save
					</button>
				</div>
			</header>
			{albumData ? (
				<BuildArea albumData={albumData} />
			) : (
				<div className="lds-heart">
					<div></div>
				</div>
			)}
		</main>
	);
}

const ModalUnsavedChanges = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	return (
		<div className="modal-generic">
			<h2>Confirm</h2>
			<p>You have unsaved work. Are you sure you want to leave this page?</p>
			<div>
				<button
					className="btn"
					onClick={() => {
						router.push("/");
						dispatch(setModal());
					}}
				>
					Yes
				</button>
				<button
					className="btn"
					onClick={() => {
						dispatch(setModal());
					}}
				>
					No
				</button>
			</div>
		</div>
	);
};

ModalUnsavedChanges.canCancel = true;

export { ModalUnsavedChanges };
