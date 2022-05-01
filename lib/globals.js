import DisplayImage from "../components/DisplayImage";
import SelectImage from "../components/SelectImage";
import DisplayLink from "../components/DisplayLink";
import SelectLink from "../components/SelectLink";
import DisplayText from "../components/DisplayText";
import SelectText from "../components/SelectText";
import DisplayVideo from "../components/DisplayVideo";
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
		displayComponent: DisplayImage,
		selectComponent: SelectImage,
	},
	{
		key: "Link",
		displayComponent: DisplayLink,
		selectComponent: SelectLink,
	},
	{
		key: "Text",
		displayComponent: DisplayText,
		selectComponent: SelectText,
	},
	{
		key: "Video",
		displayComponent: DisplayVideo,
		selectComponent: SelectVideo,
	},
];

export const modalKeys = {
	addItem: "ADD_ITEM",
	unsavedChanges: "UNSAVED_CHANGES",
};
