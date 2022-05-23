import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteSection, setSectionTitle } from "../redux/albumSlice";
import { setModal } from "../redux/modalSlice";
import { modalKeys } from "../lib/globals";

import AddSection from "./AddSection";
import AddItem from "./AddItem";
import EditItem from "./EditItem";

import styles from "../styles/AlbumSection.module.css";

export default function EditSection({ index }) {
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();

	return (
		<>
			<section className={`albumSection ${styles.albumSection} themeStandard`}>
				<div
					className={`${styles.trashButton} btn`}
					onClick={() => {
						dispatch(
							setModal({
								key: modalKeys.deleteSection,
								props: { sectionIndex: index },
								theme: albumData.theme,
							})
						);
					}}
				>
					<FontAwesomeIcon icon={faTrash} />
				</div>
				<h2>
					<input
						type="text"
						className={"text in-place themeTitle " + styles.title}
						value={albumData.sections[index].title}
						maxLength={50}
						placeholder="Enter Title (optional)"
						onChange={(e) => {
							dispatch(
								setSectionTitle({ sectionIndex: index, title: e.target.value })
							);
						}}
					/>
				</h2>
				{albumData.sections[index].items.map((item, arrIdx) => {
					return (
						<EditItem
							key={"item" + item.timestamp}
							sectionIndex={index}
							index={arrIdx}
							data={item}
						/>
					);
				})}
				<AddItem
					index={albumData.sections[index].items.length}
					sectionIndex={index}
				/>
			</section>
			<AddSection index={index + 1} />
		</>
	);
}

export function ModalDeleteSection({ sectionIndex }) {
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();
	const itemCount = albumData.sections[sectionIndex].items.length;

	return (
		<div className="modal-generic themeStandard">
			<h2 className="themeTitle">Confirm</h2>
			<p>Are you sure you want to delete this section?</p>
			{itemCount ? (
				<p>
					This section currently has {itemCount}{" "}
					{itemCount === 1 ? "item" : "items"} which will be lost!
				</p>
			) : null}
			<div>
				<button
					className="btn"
					onClick={() => {
						dispatch(deleteSection({ sectionIndex }));
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
