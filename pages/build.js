import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlbumData, markSaved, setTitle } from "../redux/albumSlice";

import Head from "next/head";
import Logo from "../components/Logo";
import BuildArea from "../components/BuildArea";
import styles from "../styles/Build.module.css";

export default function CreateAlbum() {
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();

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

	const changeTitle = (e) => {
		dispatch(setTitle(e.target.value));
	};

	const canSave =
		!albumData?.saved &&
		albumData?.title &&
		albumData?.sections.some((section) => section.items.length);

	return (
		<main className={styles.main}>
			<Head>
				<title>
					My Scrapbook - {albumData?.title ? albumData.title : "New Album"}
				</title>
				<link rel="icon" href="/Logo.png" />
			</Head>
			<header className={styles.header}>
				<h2 className="brand">
					<Logo size="1em" />
					Scrapbook
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
				<button className="btn" disabled={!canSave}>
					Save
				</button>
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
