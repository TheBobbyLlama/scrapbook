import { useSelector, useDispatch } from "react-redux";
import useFormData from "../hooks/useFormData";
import { albumItemSelectors, modalKeys } from "../lib/globals";
import { setModal } from "../redux/modalSlice";

import AddItem from "./AddItem";

import styles from "../styles/EditItem.module.css";

export default function EditItem({ index, sectionIndex, data }) {
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();
	const [formData, handleChange] = useFormData({ ...data });

	const DisplayComponent = albumItemSelectors.find(
		(item) => item.key === data.type
	)?.displayComponent;

	return (
		<>
			<AddItem index={index} sectionIndex={sectionIndex} minimal />
			<div className="albumCard themeCard">
				<h3>
					<input
						name="title"
						className="text in-place themeTitle"
						placeholder="Enter Title (optional)"
						maxLength={50}
						value={formData.title}
						onChange={handleChange}
					/>
				</h3>
				<div className={`cardContent ${styles.editContent}`}>
					<DisplayComponent data={formData.value} />
					{/* TODO - Add button to edit content */}
				</div>
				<textarea
					name="caption"
					className="text themeControl"
					placeholder="Add a Caption (optional)"
					maxLength={100}
					value={formData.caption}
					onChange={handleChange}
				/>
			</div>
		</>
	);
}
