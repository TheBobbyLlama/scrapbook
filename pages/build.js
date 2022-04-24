import { useEffect, useState } from "react";

import Head from "next/head";
import Logo from "../components/Logo";
import BuildArea from "../components/BuildArea";
import styles from "../styles/Build.module.css";

export default function CreateAlbum() {
	const [albumId, setAlbumId] = useState();
	const [albumData, setAlbumData] = useState();
	const [unsavedData, setUnsavedData] = useState(false);

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		const tmpId = query.get("id");

		setAlbumId(tmpId);

		if (tmpId) {
			/*fetch(`/api/album/${tmpId}`).then((data) => {
				console.log(data);
			});*/
		} else {
			setAlbumData({
				title: "Untitled Album",
				sections: [],
				private: false,
			});
		}
	}, []);

	const changeTitle = (e) => {
		setAlbumData({ ...albumData, title: e.target.value });
		setUnsavedData(true);
	};

	const addSection = (section) => {
		const newSections = [...albumData.sections, section];
		setAlbumData({ ...albumData, sections: newSections });
	};

	const changeAlbumData = (operation) => {
		let newAlbumData;

		switch (operation.type) {
			case "Insert Section":
				let index = operation.index;
				let newData = {
					title: "New Section",
					items: [],
				};

				newAlbumData = { ...albumData };
				newAlbumData.sections = [...newAlbumData.sections];

				if (index >= 0) {
					newAlbumData.sections.splice(index, 0, newData);
				} else {
					console.warn(`Recieved section index of ${index}!`);
					return;
				}

				break;
			default:
				return;
		}

		if (newAlbumData) {
			setAlbumData(newAlbumData);
		}
	};

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
						className={"text " + styles.title}
						type="text"
						maxLength={50}
						value={albumData.title}
						onChange={changeTitle}
					></input>
				)}
				<button className="btn" disabled={!unsavedData}>
					Save
				</button>
			</header>
			{albumData ? (
				<BuildArea albumData={albumData} changeFunc={changeAlbumData} />
			) : (
				<div className="lds-heart">
					<div></div>
				</div>
			)}
		</main>
	);
}
