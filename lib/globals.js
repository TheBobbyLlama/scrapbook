import SelectImage from "../components/SelectImage";
import SelectLink from "../components/SelectLink";
import SelectText from "../components/SelectText";
import SelectVideo from "../components/SelectVideo";

export const themes = [
	{
		name: "Standard",
		className: "",
	},
	{
		name: "Dark",
		className: "darkTheme",
	},
	{
		name: "Sunshine",
		className: "sunshineTheme",
	},
];

export const albumItemSelectors = [
	{
		key: "Image",
		component: SelectImage,
	},
	{
		key: "Link",
		component: SelectLink,
	},
	{
		key: "Text",
		component: SelectText,
	},
	{
		key: "Video",
		component: SelectVideo,
	},
];

export const modalKeys = {
	addItem: "ADD_ITEM",
	unsavedChanges: "UNSAVED_CHANGES",
};
