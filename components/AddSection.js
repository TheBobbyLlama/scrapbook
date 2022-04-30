import { useDispatch } from "react-redux";
import { insertSection } from "../redux/albumSlice";

import styles from "../styles/AddSection.module.css";

export default function AddSection({ index }) {
	const dispatch = useDispatch();

	return (
		<div
			className={`${styles.addSection} themeWorkAreaCutout`}
			onClick={() => {
				dispatch(
					insertSection({
						sectionIndex: index,
						section: {
							timestamp: Date.now(),
							title: "New Section",
							items: [],
						},
					})
				);
			}}
		>
			Add Section
		</div>
	);
}
