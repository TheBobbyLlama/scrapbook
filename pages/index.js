import { MongoClient } from "mongodb";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Logo from "../components/Logo";
import styles from "../styles/Home.module.css";

export default function Home(props) {
	return (
		<main className={styles.main}>
			<Head>
				<title>My Scrapbook</title>
				<meta name="description" content="A free online scrapbook creator!" />
				<link rel="icon" href="/Logo.png" />
			</Head>

			<Logo size="200px" />
			<header className={styles.header}>
				<h1>
					Welcome to My <span className="brand">Scrapbook</span> Site!
				</h1>
			</header>
			<div className={styles.cardHolder}>
				<section className={styles.card}>
					<h2>Get Started Now!</h2>
					<p>
						My <span className="brand">Scrapbook</span> Site is <em>free</em>{" "}
						and there&apos;s <em>no sign up</em> &mdash; you can begin building
						your scrapbook immediately!
					</p>
					<p>
						Once you have made a scrapbook of your own, you will receive a link
						that you can use to share with friends and family, or edit it later.
					</p>
					<div className="centerText">
						<Link href="/build" passHref>
							<button className="btn">Start a Scrapbook!</button>
						</Link>
					</div>
				</section>
				<section className={styles.card}>
					<h2>Latest Albums</h2>
				</section>
			</div>
		</main>
	);
}

export async function getServerSideProps() {
	try {
		const client = await MongoClient.connect(process.env.MONGODB_URI);

		const db = client.db();

		const albums = db.collection("albums");

		// TODO - Pull in 5? most recent items!!!
		const latest = await albums.find().toArray();

		client.close();

		return {
			props: {
				latest,
			},
		};
	} catch (e) {
		console.error(e);
		return {
			props: {
				error: e.message,
				latest: [],
			},
		};
	}
}
