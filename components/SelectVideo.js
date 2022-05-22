import { useState } from "react";

import YouTube from "react-youtube";

import styles from "../styles/SelectSimple.module.css";

const SelectorVideo = ({ value, onSelect }) => {
	const [curVideo, setCurVideo] = useState(value?.id || "");
	const [videoInput, setVideoInput] = useState(
		value ? "https://www.youtube.com/watch?v=" + value.id : ""
	);

	const updateCurVideo = (e) => {
		setVideoInput(e.target.value);

		const params = new URLSearchParams(e.target.value.split("?")[1]);
		const videoId = params.get("v");

		if (videoId) {
			setCurVideo(videoId);
		} else {
			setCurVideo("");
		}
	};

	const updateVideoEmbed = (e) => {
		e.preventDefault();
		onSelect({ id: curVideo });
	};

	return (
		<div className={styles.selectSimple}>
			<form onSubmit={updateVideoEmbed}>
				<input
					type="text"
					className="text themeControl"
					placeholder="Enter URL here"
					value={videoInput}
					onChange={updateCurVideo}
					onBlur={updateVideoEmbed}
				/>
			</form>
			<div>{value?.id && <YouTube videoId={value.id} />}</div>
		</div>
	);
};

export default SelectorVideo;
