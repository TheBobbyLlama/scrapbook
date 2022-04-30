import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../redux/modalSlice";

import { modalKeys, themes } from "../lib/globals";

import ModalAddItem from "./ModalAddItem";
import { ModalUnsavedChanges } from "../pages/build";

export default function Modal() {
	const { key, props, theme } = useSelector((state) => state.modal);
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
			ModalGen = ModalUnsavedChanges;
			break;
		default:
			break;
	}

	const themeIndex = Math.max(
		themes.findIndex((curTheme) => curTheme.name === theme),
		0
	);

	if (ModalGen) {
		return (
			<div
				className={`modalBG ${themes[themeIndex].className}`}
				onClick={bgClick}
			>
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
