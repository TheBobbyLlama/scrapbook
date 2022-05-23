import styles from "../styles/AlbumArea.module.css";

import ViewSection from "./ViewSection";

const ViewArea = ({ albumData }) => {
	return (
		<section className={`${styles.albumArea} themeWorkArea`}>
			{albumData.sections.map((section) => (
				<ViewSection key={"section" + section.timestamp} data={section} />
			))}
		</section>
	);
};

export default ViewArea;
