import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useFormData from "../hooks/useFormData";
import { insertItem } from "../redux/albumSlice";
import { setModal } from "../redux/modalSlice";

import { Select, Option } from "./ui/Select";

import { albumItemSelectors } from "../lib/globals";
//import styles from "../styles/ModalAddItem.module.css";

const ModalAddItem = ({ index, sectionIndex }) => {
	const dispatch = useDispatch();
	const [formData, handleChange, updateFormData] = useFormData({
		itemType: 0,
	});

	let SelectorComponent = albumItemSelectors[formData.itemType].selectComponent;

	const selectItemValue = (value) => {
		updateFormData({ value });
	};

	const addItem = () => {
		dispatch(
			insertItem({
				sectionIndex,
				itemIndex: index,
				item: {
					timestamp: Date.now(),
					title: "",
					type: albumItemSelectors[formData.itemType].key,
					value: formData.value,
					caption: "",
				},
			})
		);
		dispatch(setModal());
	};

	return (
		<div className="modal themeStandard">
			<h3 className="themeTitle">
				Add New
				<Select
					name="itemType"
					className="themeControl"
					selectedIndex={formData.itemType}
					onChange={(e) => {
						handleChange(e);
						updateFormData({ value: null });
					}}
				>
					{albumItemSelectors.map((item) => {
						return <Option key={item.key}>{item.key}</Option>;
					})}
				</Select>
			</h3>
			<SelectorComponent value={formData.value} onSelect={selectItemValue} />
			<div>
				<button className="btn" onClick={addItem} disabled={!formData.value}>
					Add
				</button>
			</div>
		</div>
	);
};

export default ModalAddItem;
