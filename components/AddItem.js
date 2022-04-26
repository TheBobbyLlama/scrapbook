import { useSelector, useDispatch } from "react-redux";
import { modalKeys } from "../lib/globals";
import { setModal } from "../redux/modalSlice";

import styles from "../styles/AddItem.module.css";

export default function AddItem({ index, sectionIndex, minimal }) {
	const dispatch = useDispatch();

	return (
		<div
			className={styles.addItem + " " + (minimal && styles.addItemMinimal)}
			onClick={() => {
				dispatch(
					setModal({ key: modalKeys.addItem, props: { index, sectionIndex } })
				);
			}}
		>
			{minimal ? "+" : "Add Item"}
		</div>
	);
}
