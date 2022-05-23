import ViewItem from "./ViewItem";

import styles from "../styles/AlbumSection.module.css";

export default function ViewSection({ data }) {
	return (
		<section className={`albumSection ${styles.albumSection} themeStandard`}>
			<h2 className="themeTitle">{data.title}</h2>
			{data.items.map((item) => {
				return <ViewItem key={"item" + item.timestamp} data={item} />;
			})}
		</section>
	);
}
