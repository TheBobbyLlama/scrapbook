import { useSelector } from "react-redux";

import AddSection from "./AddSection";
import EditSection from "./EditSection";

import styles from "../styles/BuildArea.module.css";

export default function BuildArea() {
	const albumData = useSelector((state) => state.album.value);

	return (
		<section className={styles.buildArea}>
			{albumData.sections.map((_, index) => (
				<EditSection key={"section" + index} index={index} />
			))}
			<AddSection index={albumData.sections.length} />
		</section>
	);
}
