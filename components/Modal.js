import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../redux/modalSlice";

import { modalKeys } from "../lib/globals";

import ModalAddItem from "./ModalAddItem";
import { ModalUnsavedChanges } from "../pages/build";

export default function Modal() {
	const { key, props } = useSelector((state) => state.modal);
	const dispatch = useDispatch();

	let ModalGen;

	const bgClick = () => {
		if (!ModalGen.noCancel) {
			dispatch(setModal());
		}
	};

	switch (key) {
		case modalKeys.addItem:
			ModalGen = ModalAddItem;
			break;
		case modalKeys.unsavedChanges:
			MdalGen = ModalUnsavedChanges;
			break;
		default:
			break;
	}

	if (ModalGen) {
		return (
			<div className="modalBG" onClick={bgClick}>
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<ModalGen {...props} />
				</div>
			</div>
		);
	} else {
		return <></>;
	}
}
