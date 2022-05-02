import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAlignJustify,
	faImage,
	faLink,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import YouTubeIcon from "../images/YouTube.svg";
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
		display: (
			<>
				<FontAwesomeIcon icon={faImage} /> Image
			</>
		),
		displayComponent: DisplayImage,
		selectComponent: SelectImage,
	},
	{
		key: "Link",
		display: (
			<>
				<FontAwesomeIcon icon={faLink} /> Link
			</>
		),
		displayComponent: DisplayLink,
		selectComponent: SelectLink,
	},
	{
		key: "Text",
		display: (
			<>
				<FontAwesomeIcon icon={faAlignJustify} /> Text
			</>
		),
		displayComponent: DisplayText,
		selectComponent: SelectText,
	},
	{
		key: "Video",
		display: (
			<>
				<Image src={YouTubeIcon} alt="YouTube" height={16} width={16} /> Video
			</>
		),
		displayComponent: DisplayVideo,
		selectComponent: SelectVideo,
	},
];

export const modalKeys = {
	deleteSection: "DELETE_SECTION",
	addItem: "ADD_ITEM",
	editItem: "EDIT_ITEM",
	deleteItem: "DELETE_ITEM",
	unsavedChanges: "UNSAVED_CHANGES",
};
