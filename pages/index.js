import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Logo from "../components/Logo";
import styles from "../styles/Home.module.css";

const fadeText = [
	"Cherish it.",
	"Share it.",
	<>
		<span className="brand">Cherit</span>.
	</>,
];

export default function Home(props) {
	const [fadeLevel, setFadeLevel] = useState(0);

	// Display the first fade-in text as soon as the component mounts.
	useEffect(() => {
		setFadeLevel(1);
	}, []);

	useEffect(() => {
		if (fadeLevel < fadeText.length) {
			const timer = setTimeout(() => {
				setFadeLevel(fadeLevel + 1);
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [fadeLevel]);

	return (
		<main className={styles.main}>
			<Head>
				<title>Cherit</title>
			</Head>

			<Logo size="200px" />
			<header className={styles.header}>
				<h1 className={styles.showFade}>
					{fadeText.map((item, index) => {
						return (
							<span
								key={index}
								className={index < fadeLevel ? styles.fadeIn : null}
							>
								{item}
							</span>
						);
					})}
				</h1>
			</header>
			<div className={styles.cardHolder}>
				<section className={styles.card}>
					<h2>Get Started Now!</h2>
					<p>
						<span className="brand">Cherit</span> is <em>free</em> and
						there&apos;s <em>no sign up</em> &mdash; you can begin building your
						scrapbook or photo album immediately!
					</p>
					<p>
						Once you have made an album of your own, you will receive a link
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
