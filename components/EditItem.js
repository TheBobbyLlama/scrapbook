import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFormData from "../hooks/useFormData";
import { albumItemSelectors, modalKeys } from "../lib/globals";
import { editItem, deleteItem } from "../redux/albumSlice";
import { setModal } from "../redux/modalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import AddItem from "./AddItem";

import styles from "../styles/EditItem.module.css";

export default function EditItem({ index, sectionIndex, data }) {
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();
	const [formData, handleChange, updateFormData] = useFormData({ ...data });

	const curItem = albumData.sections[sectionIndex].items[index];

	// Ensure formData is synchronized if content is changed by the edit modal.
	useEffect(() => {
		if (curItem.type !== formData.type || curItem.value !== formData.value) {
			updateFormData({ type: curItem.type, value: curItem.value });
		}
	}, [curItem, formData, updateFormData]);

	const DisplayComponent = albumItemSelectors.find(
		(item) => item.key === data.type
	)?.displayComponent;

	const postUpdate = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		const newItem = { ...data, [key]: value };
		dispatch(editItem({ item: newItem, sectionIndex, itemIndex: index }));

		handleChange(e);
	};

	return (
		<>
			<AddItem index={index} sectionIndex={sectionIndex} minimal />
			<div className={`albumCard ${styles.editItem} themeCard`}>
				<div
					className={`${styles.trashButton} btn`}
					onClick={() => {
						dispatch(
							setModal({
								key: modalKeys.deleteItem,
								props: { sectionIndex, itemIndex: index },
								theme: albumData.theme,
							})
						);
					}}
				>
					<FontAwesomeIcon icon={faTrash} />
				</div>
				<h3>
					<input
						name="title"
						className="text in-place themeTitle"
						placeholder="Enter Title (optional)"
						maxLength={50}
						value={formData.title}
						onChange={postUpdate}
					/>
				</h3>
				<div className={`cardContent ${styles.editContent}`}>
					<DisplayComponent data={formData.value} />
					{/* TODO - Add button to edit content */}
					<div
						className={`${styles.editButton} btn`}
						onClick={() => {
							dispatch(
								setModal({
									key: modalKeys.editItem,
									props: { sectionIndex, itemIndex: index },
									theme: albumData.theme,
								})
							);
						}}
					>
						<FontAwesomeIcon icon={faPenToSquare} />
					</div>
				</div>
				{curItem?.type !== "Text" ? (
					<textarea
						name="caption"
						className="text themeControl"
						placeholder="Add a Caption (optional)"
						maxLength={100}
						value={formData.caption}
						onChange={postUpdate}
					/>
				) : null}
			</div>
		</>
	);
}

export function ModalDeleteItem({ sectionIndex, itemIndex }) {
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();

	const curItem = albumData.sections[sectionIndex].items[itemIndex];

	const DisplayComponent = albumItemSelectors.find(
		(item) => item.key === curItem.type
	)?.displayComponent;

	return (
		<div className="modal-generic themeStandard">
			<h2 className="themeTitle">Confirm</h2>
			<p>Are you sure you want to delete this item?</p>
			<div className="cardContent">
				<DisplayComponent data={curItem.value} />
			</div>
			<div>
				<button
					className="btn"
					onClick={() => {
						dispatch(deleteItem({ sectionIndex, itemIndex }));
						dispatch(setModal());
					}}
				>
					Yes
				</button>
				<button
					className="btn"
					onClick={() => {
						dispatch(setModal());
					}}
				>
					No
				</button>
			</div>
		</div>
	);
}
