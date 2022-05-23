import { useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";
import styles from "../styles/SelectSimple.module.css";

const SelectorText = ({ value, onSelect }) => {
	const formats = ["align", "bold", "font", "italic", "list", "underline"];

	const modules = {
		toolbar: [
			["bold", "italic", "underline"],
			[{ list: "ordered" }, { list: "bullet" }],
			["clean"],
		],
	};

	// The Quill change handler passes many other params that we don't need.
	const handleChange = (editorText) => {
		onSelect({
			_id: value?._id,
			text: editorText,
			invalid: editorText.length > 5000,
		});
	};

	return (
		<div className={`${styles.selectSimple} ${styles.fixedHeight}`}>
			<ReactQuill
				className={`${styles.quill} themeControl`}
				formats={formats}
				modules={modules}
				value={value?.text || ""}
				onChange={handleChange}
			/>
		</div>
	);
};

export default SelectorText;
