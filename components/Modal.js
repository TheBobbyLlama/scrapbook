import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../redux/modalSlice";

import { modalKeys, themes } from "../lib/globals";

import ModalAddItem from "./ModalAddItem";
import { ModalUnsavedChanges } from "../pages/build";

function isChild(checkNode, matchNode) {
	let curNode = checkNode.parentNode;

	while (curNode) {
		if (curNode === matchNode) {
			return true;
		}

		curNode = curNode.parentNode;
	}

	return false;
}

export default function Modal() {
	const { key, props, theme } = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	const bgRef = useRef(null);

	let ModalGen;

	// Clear modal if it's cancellable and the user clicks outside.
	const bgClick = (e) => {
		if (!isChild(e.target, bgRef.current) && !ModalGen.noCancel) {
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
				ref={bgRef}
				className={`modalBG ${themes[themeIndex].className}`}
				onClick={bgClick}
			>
				<div>
					<ModalGen {...props} />
				</div>
			</div>
		);
	} else {
		return <></>;
	}
}
