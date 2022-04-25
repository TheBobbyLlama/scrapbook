import { useDispatch } from "react-redux";

import styles from "../styles/AddItem.module.css";

export default function AddItem({ index, sectionIndex, minimal }) {
	const dispatch = useDispatch();

	return (
		<div
			className={styles.addItem + " " + (minimal && styles.addItemMinimal)}
			onClick={() => {
				// TODO!
				//dispatch();
			}}
		>
			{minimal ? "+" : "Add Item"}
		</div>
	);
}
