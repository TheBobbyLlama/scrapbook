import { useEffect } from "react";
import useFormData from "../hooks/useFormData";

import { Select, Option } from "./ui/Select";

import { albumItemSelectors } from "../lib/globals";
//import styles from "../styles/ModalAddItem.module.css";

const ModalAddItem = ({ index, sectionIndex }) => {
	const [formData, handleChange, updateFormData] = useFormData({
		itemType: 0,
	});

	let SelectorComponent = albumItemSelectors[formData.itemType].component;

	const selectItemValue = (value) => {
		updateFormData({ value });
	};

	return (
		<form className="modal-generic themeStandard">
			<h3 className="themeTitle">Add New Item</h3>
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
			<SelectorComponent value={formData.value} onSelect={selectItemValue} />
			<div>
				<button type="submit" className="btn" disabled={!formData.value}>
					Add
				</button>
			</div>
		</form>
	);
};

export default ModalAddItem;
