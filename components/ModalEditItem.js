import { useDispatch, useSelector } from "react-redux";
import useFormData from "../hooks/useFormData";
import { editItem } from "../redux/albumSlice";
import { setModal } from "../redux/modalSlice";

import { Select, Option } from "./ui/Select";

import { albumItemSelectors } from "../lib/globals";

const ModalEditItem = ({ itemIndex, sectionIndex }) => {
	const albumData = useSelector((state) => state.album.value);

	const curItem = albumData.sections[sectionIndex].items[itemIndex];

	const dispatch = useDispatch();
	const [formData, handleChange, updateFormData] = useFormData({
		itemType: albumItemSelectors.findIndex((key) => key.key === curItem.type),
		value: curItem.value,
	});

	let SelectorComponent = albumItemSelectors[formData.itemType].selectComponent;

	const selectItemValue = (value) => {
		updateFormData({ value });
	};

	const confirmEdit = () => {
		const newData = {
			type: albumItemSelectors[formData.itemType].key,
			value: formData.value,
		};

		dispatch(
			editItem({ itemIndex, sectionIndex, item: { ...curItem, ...newData } })
		);
		dispatch(setModal());
	};

	return (
		<div className="modal themeStandard">
			<h3 className="themeTitle">
				Edit
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
						return <Option key={item.key}>{item.display}</Option>;
					})}
				</Select>
			</h3>
			<SelectorComponent value={formData.value} onSelect={selectItemValue} />
			<div>
				<button
					className="btn"
					onClick={confirmEdit}
					disabled={!formData.value}
				>
					Update
				</button>
				<button className="btn" onClick={() => dispatch(setModal())}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default ModalEditItem;
