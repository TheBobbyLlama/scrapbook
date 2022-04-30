import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
	setAlbumData,
	markSaved,
	setTheme,
	setTitle,
} from "../redux/albumSlice";
import { themes, modalKeys } from "../lib/globals";
import { setModal } from "../redux/modalSlice";

import Head from "next/head";
import Logo from "../components/Logo";
import BuildArea from "../components/BuildArea";
import { Select, Option } from "../components/ui/Select";
import styles from "../styles/Build.module.css";
import selectStyles from "../styles/Select.module.css";

export default function CreateAlbum() {
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();
	const router = useRouter();

	const hasData =
		albumData?.title &&
		albumData?.sections.some((section) => section.items.length);
	const canShare = albumData?.saved && hasData;
	const canSave = !albumData?.saved && hasData;

	const themeIndex = albumData
		? Math.max(
				themes.findIndex((theme) => theme.name === albumData.theme),
				0
		  )
		: 0;

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

	return (
		<main className={`${styles.main} ${themes[themeIndex].className}`}>
			<Head>
				<title>
					Cherish - {albumData?.title ? albumData.title : "New Album"}
				</title>
			</Head>
			<header className={`${styles.header} themeBordered`}>
				<h2 className="brand" onClick={clickBrandNav}>
					<Logo size="1em" />
					Cherish
				</h2>
				{albumData && (
					<input
						className={"text in-place themeTitle " + styles.title}
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
			<footer className={`${styles.footer} themeBordered`}>
				<div>
					<label htmlFor="theme">Theme</label>
					<Select
						id="theme"
						className={`${selectStyles.selectLow} ${styles.footerSelect}`}
						selectedIndex={themeIndex}
						onChange={changeTheme}
					>
						{themes.map((theme) => (
							<Option key={theme.name}>{theme.name}</Option>
						))}
					</Select>
				</div>
				<div>
					<input id="private" type="checkbox" />
					<label htmlFor="private">Private</label>
				</div>
			</footer>
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
