import { useSelector, useDispatch } from "react-redux";
import { removeSection, setSectionTitle } from "../redux/albumSlice";

import AddSection from "./AddSection";

import styles from "../styles/EditSection.module.css";

export default function EditSection({ index }) {
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();

	return (
		<>
			<section className="albumSection">
				<h2>
					<input
						type="text"
						className={"text in-place " + styles.title}
						value={albumData.sections[index].title}
						maxLength={50}
						onChange={(e) => {
							dispatch(
								setSectionTitle({ sectionIndex: index, title: e.target.value })
							);
						}}
					/>
				</h2>
			</section>
			<AddSection index={index + 1} />
		</>
	);
}
