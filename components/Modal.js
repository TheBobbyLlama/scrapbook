import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../redux/modalSlice";

import { modalKeys } from "../redux/modalSlice";

import ModalAddItem from "./ModalAddItem";

import styles from "../styles/Modal.module.css";

export default function Modal() {
	const { key, props } = useSelector((state) => state.modal);
	const dispatch = useDispatch();

	const bgClick = () => {
		if (modalGen.canCancel) {
			dispatch(setModal());
		}
	};

	let modalGen;

	switch (key) {
		case modalKeys.addItem:
			modalGen = ModalAddItem;
		default:
			break;
	}

	if (modalGen) {
		return (
			<div className={styles.modalBG} onClick={bgClick}>
				{modalGen(props)}
			</div>
		);
	} else {
		return <></>;
	}
}
