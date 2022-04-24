import { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Create.module.css";

export default function CreateAlbum() {
	const [albumData, setAlbumData] = useState();
	const [unsavedData, setUnsavedData] = useState(false);

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		const albumId = query.get("id");

		if (albumId) {
			/*fetch(`/api/album/${albumId}`).then((data) => {
				console.log(data);
			});*/
			// TODO - Fetch Album data!
		} else {
			setAlbumData({
				title: "Untitled Album",
				items: [],
				private: false,
			});
		}
	}, []);

	const changeTitle = (e) => {
		setAlbumData({ ...albumData, title: e.target.value });
		setUnsavedData(true);
	};

	return (
		<main className={styles.main}>
			<Head>
				<title>My Scrapbook - Create Album</title>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<header className={styles.header}>
				<h2 className="brand">Scrapbook</h2>
				{albumData && (
					<input
						className={"text " + styles.title}
						type="text"
						value={albumData.title}
						onChange={changeTitle}
					></input>
				)}
				<button className="btn" disabled={!unsavedData}>
					Save
				</button>
			</header>
			<section className={styles.workArea}>
				{albumData ? (
					<div>Content!</div>
				) : (
					<div className="lds-heart">
						<div></div>
					</div>
				)}
			</section>
		</main>
	);
}
