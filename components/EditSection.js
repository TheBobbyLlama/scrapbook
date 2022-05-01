import { useSelector, useDispatch } from "react-redux";
import { removeSection, setSectionTitle } from "../redux/albumSlice";

import AddSection from "./AddSection";
import AddItem from "./AddItem";
import EditItem from "./EditItem";

import styles from "../styles/EditSection.module.css";

export default function EditSection({ index }) {
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();

	return (
		<>
			<section className="albumSection themeStandard">
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
