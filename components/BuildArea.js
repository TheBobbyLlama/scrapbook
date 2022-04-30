import { useSelector } from "react-redux";

import AddSection from "./AddSection";
import EditSection from "./EditSection";

import styles from "../styles/BuildArea.module.css";

export default function BuildArea() {
	const albumData = useSelector((state) => state.album.value);

	return (
		<section className={`${styles.buildArea} themeWorkArea`}>
			<AddSection index={0} />
			{albumData.sections.map((section, index) => (
				<EditSection key={"section" + section.id} index={index} />
			))}
		</section>
	);
}
