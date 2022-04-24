import AddSection from "./AddSection";
import EditSection from "./EditSection";

import styles from "../styles/BuildArea.module.css";

export default function BuildArea({ albumData, changeFunc }) {
	const insertSection = (index) => {
		changeFunc({ type: "Insert Section", index });
	};

	return (
		<section className={styles.buildArea}>
			{albumData.sections.map((_, index) => (
				<EditSection key={"section" + index} index={index} />
			))}
			<AddSection
				onClick={() => {
					insertSection(albumData.sections.length);
				}}
			/>
		</section>
	);
}
