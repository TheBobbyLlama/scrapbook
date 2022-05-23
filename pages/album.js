import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MongoClient, ObjectId } from "mongodb";
import { useDispatch } from "react-redux";
import { setAlbumData } from "../redux/albumSlice";
import { themes } from "../lib/globals";

import Head from "next/head";
import Logo from "../components/Logo";
import Loading from "../components/Loading";
import ViewArea from "../components/ViewArea";

import styles from "../styles/Album.module.css";

export default function ViewAlbum(props) {
	const { albumData } = props;
	const dispatch = useDispatch();
	const router = useRouter();

	const themeIndex = albumData
		? Math.max(
				themes.findIndex((theme) => theme.name === albumData.theme),
				0
		  )
		: 0;

	useEffect(() => {
		if (albumData) {
			dispatch(setAlbumData(albumData));
		} else {
			router.push("/");
		}
	}, []);

	return (
		<main className={`${styles.main} ${themes[themeIndex].className}`}>
			<Head>
				<title>Cherit{albumData?.title ? ` - ${albumData.title}` : ""}</title>
			</Head>
			<header className={`${styles.header} themeBordered`}>
				<Link href="/" passHref>
					<h2 className="brand">
						<Logo size="1em" />
						Cherit
					</h2>
				</Link>
				{albumData && <h1 className="themeTitle">{albumData.title}</h1>}
				<div />
			</header>
			{albumData ? <ViewArea albumData={albumData} /> : <Loading />}
		</main>
	);
}

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
