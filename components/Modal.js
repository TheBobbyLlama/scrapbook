import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../redux/modalSlice";

import { modalKeys } from "../lib/globals";

import ModalAddItem from "./ModalAddItem";
import { ModalUnsavedChanges } from "../pages/build";

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
			break;
		case modalKeys.unsavedChanges:
			modalGen = ModalUnsavedChanges;
			break;
		default:
			break;
	}

	if (modalGen) {
		return (
			<div className="modalBG" onClick={bgClick}>
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					{modalGen(props)}
				</div>
			</div>
		);
	} else {
		return <></>;
	}
}
