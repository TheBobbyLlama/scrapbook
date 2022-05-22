import { useState } from "react";
import Embed from "react-embed";

import styles from "../styles/SelectSimple.module.css";

const SelectLink = ({ value, onSelect }) => {
	const [curLink, setCurLink] = useState(value || "");

	const updateLinkEmbed = (e) => {
		e.preventDefault();
		onSelect(curLink);
	};

	return (
		<div className={styles.selectSimple}>
			<form onSubmit={updateLinkEmbed}>
				<input
					type="text"
					className="text themeControl"
					placeholder="Enter URL here"
					value={curLink}
					onChange={(e) => setCurLink(e.target.value)}
					onBlur={updateLinkEmbed}
				/>
			</form>
			<div>{value && <Embed url={value} />}</div>
		</div>
	);
};

export default SelectLink;
