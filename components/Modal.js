import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../redux/modalSlice";

import { modalKeys, themes } from "../lib/globals";

import { ModalDeleteSection } from "./EditSection";
import ModalAddItem from "./ModalAddItem";
import ModalEditItem from "./ModalEditItem";
import { ModalDeleteItem } from "./EditItem";
import ModalSave from "./ModalSave";
import { ModalUnsavedChanges } from "../pages/build";
import ModalShare from "./ModalShare";

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
	const router = useRouter();
	const bgRef = useRef(null);

	let ModalGen;

	// Set up an event to ensure the current modal will always be cleared if the user navigates elsewhere.
	useEffect(() => {
		router.beforePopState(() => {
			dispatch(setModal());
			return true;
		});
	}, []);

	// Clear modal if it's cancellable and the user clicks outside.
	const bgClick = (e) => {
		if (!isChild(e.target, bgRef.current) && !ModalGen.noCancel) {
			dispatch(setModal());
		}
	};

	switch (key) {
		case modalKeys.deleteSection:
			ModalGen = ModalDeleteSection;
			break;
		case modalKeys.addItem:
			ModalGen = ModalAddItem;
			break;
		case modalKeys.editItem:
			ModalGen = ModalEditItem;
			break;
		case modalKeys.deleteItem:
			ModalGen = ModalDeleteItem;
			break;
		case modalKeys.saveAlbum:
			ModalGen = ModalSave;
			break;
		case modalKeys.unsavedChanges:
			ModalGen = ModalUnsavedChanges;
			break;
		case modalKeys.shareAlbum:
			ModalGen = ModalShare;
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
