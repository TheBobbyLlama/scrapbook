import { useEffect } from "react";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import { useDispatch, useSelector } from "react-redux";
import { setAlbumData, setTheme, setTitle } from "../redux/albumSlice";
import { themes, modalKeys } from "../lib/globals";
import { setModal } from "../redux/modalSlice";

import Head from "next/head";
import Logo from "../components/Logo";
import Loading from "../components/Loading";
import BuildArea from "../components/BuildArea";
import { Select, Option } from "../components/ui/Select";
import styles from "../styles/Build.module.css";
import selectStyles from "../styles/Select.module.css";

export default function Build(props) {
	const { albumData: inputData } = props;
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();
	const router = useRouter();

	const hasData =
		albumData?.title &&
		albumData?.sections.some((section) => section.items.length);
	const canShare = albumData?._id;
	const canSave = !albumData?.saved && hasData;

	const themeIndex = albumData
		? Math.max(
				themes.findIndex((theme) => theme.name === albumData.theme),
				0
		  )
		: 0;

	useEffect(() => {
		if (inputData) {
			dispatch(setAlbumData(inputData));
		} else {
			dispatch(
				setAlbumData({
					title: "Untitled Album",
					sections: [],
					private: false,
				})
			);
		}
	}, []);

	useEffect(() => {
		if (albumData?._id) {
			router.replace(
				{
					pathname: "/build",
					query: {
						id: albumData._id,
					},
				},
				undefined,
				{ shallow: true }
			);
		}
	}, [albumData?._id]);

	const clickBrandNav = () => {
		if (albumData?.sections.some((section) => section.items.length)) {
			dispatch(
				setModal({
					key: modalKeys.unsavedChanges,
					theme: albumData.theme,
				})
			);
		} else {
			router.push("/");
		}
	};

	const changeTitle = (e) => {
		dispatch(setTitle(e.target.value));
	};

	const changeTheme = (e) => {
		dispatch(setTheme(themes[e.target.value].name));
	};

	const showSaveModal = () => {
		dispatch(setModal({ key: modalKeys.saveAlbum, theme: albumData.theme }));
	};

	const showShareModal = () => {
		dispatch(setModal({ key: modalKeys.shareAlbum, theme: albumData.theme }));
	};

	return (
		<main className={`${styles.main} ${themes[themeIndex].className}`}>
			<Head>
				<title>
					Cherit - {albumData?.title ? albumData.title : "New Album"}
				</title>
			</Head>
			<header className={`${styles.header} themeBordered`}>
				<h2 className="brand" onClick={clickBrandNav}>
					<Logo size="1em" />
					Cherit
				</h2>
				{albumData && (
					<input
						className={"text in-place themeTitle " + styles.title}
						type="text"
						maxLength={50}
						placeholder="Enter an Album Title"
						value={albumData.title}
						onChange={changeTitle}
					></input>
				)}
				<div className={styles.headerButtons}>
					<button className="btn" onClick={showShareModal} disabled={!canShare}>
						Share
					</button>
					<button className="btn" onClick={showSaveModal} disabled={!canSave}>
						Save
					</button>
				</div>
			</header>
			{albumData ? (
				<>
					<BuildArea albumData={albumData} />
					<footer className={`${styles.footer} themeBordered`}>
						<div>
							<label htmlFor="theme">Theme</label>
							<Select
								id="theme"
								aria-label="theme"
								className={`${selectStyles.selectLow} ${styles.footerSelect} selectLow`}
								selectedIndex={themeIndex}
								onChange={changeTheme}
							>
								{themes.map((theme) => (
									<Option key={theme.name}>{theme.name}</Option>
								))}
							</Select>
						</div>
						{/*<div>
							<input id="private" type="checkbox" />
							<label htmlFor="private">Private</label>
								</div>*/}
					</footer>
				</>
			) : (
				<Loading />
			)}
		</main>
	);
}

const ModalUnsavedChanges = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	return (
		<div className="modal-generic themeStandard">
			<h2 className="themeTitle">Confirm</h2>
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

export { ModalUnsavedChanges };

export async function getServerSideProps({ query }) {
	const { id } = query;

	if (!id) {
		return {
			props: {},
		};
	}

	try {
		const client = await MongoClient.connect(process.env.MONGODB_URI);

		const db = client.db();

		const albumCollection = await db.collection("albums");
		const textCollection = await db.collection("text");

		const albumData = await albumCollection.findOne({ _id: ObjectId(id) });

		for (let s = 0; s < albumData.sections.length; s++) {
			for (let i = 0; i < albumData.sections[s].items.length; i++) {
				const curItem = albumData.sections[s].items[i];

				if (curItem.type === "Text") {
					curItem.value = await textCollection.findOne({
						_id: ObjectId(curItem.value._id),
					});
				}
			}
		}

		client.close();

		return {
			props: {
				albumData: JSON.parse(JSON.stringify(albumData)),
			},
		};
	} catch (e) {
		console.error(e);
		return {
			props: {
				error: e.message,
			},
		};
	}
}
