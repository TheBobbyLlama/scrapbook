import { useSelector } from "react-redux";

import AddSection from "./AddSection";
import EditSection from "./EditSection";

import styles from "../styles/AlbumArea.module.css";

export default function BuildArea() {
	const albumData = useSelector((state) => state.album.value);

	return (
		<section className={`${styles.albumArea} themeWorkArea`}>
			<AddSection index={0} />
			{albumData.sections.map((section, index) => (
				<EditSection key={"section" + section.timestamp} index={index} />
			))}
		</section>
	);
}
