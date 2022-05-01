import { useState, useRef } from "react";
import ReactCrop from "react-image-crop";

import { canvasPreview } from "../lib/canvasPreview";

import styles from "../styles/SelectImage.module.css";
import "react-image-crop/dist/ReactCrop.css";

const SelectorImage = ({ value, onSelect }) => {
	const [crop, setCrop] = useState(value?.crop);
	const [image, setImage] = useState(value?.data || value?.url);
	const [imageDisplay, setImageDisplay] = useState(
		value?.display || value?.url || ""
	);
	const [formBusy, setFormBusy] = useState(false);
	const imgRef = useRef(null);
	const canvasRef = useRef(null);

	const onDisplayChange = (e) => {
		setImageDisplay(e.target.value);
	};

	const uploadFile = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setCrop(undefined);
			setImage(null);
			setImageDisplay(e.target.files[0].name);
			setFormBusy(true);

			const reader = new FileReader();
			reader.addEventListener(
				"load",
				() => {
					setImage(reader.result);
					setFormBusy(false);
					onSelect({ display: e.target.files[0].name, data: reader.result });
				},
				false
			);

			reader.readAsDataURL(e.target.files[0]);
		}
	};

	const tryDisplaySubmit = (e) => {
		e?.preventDefault();

		if (imageDisplay !== (value?.display || value)) {
			if (!imageDisplay) {
				setImage(null);
				onSelect(null);
			} else {
				setImage(imageDisplay);
				onSelect({ url: imageDisplay });
			}
		}
	};

	// Update image cropping info.
	const postCrop = async (c) => {
		const newValue = { ...value };

		if (c.height && c.width) {
			newValue.crop = c;
			await canvasPreview(imgRef.current, canvasRef.current, c);
			newValue.dataCropped = canvasRef.current.toDataURL();
		} else {
			delete newValue.crop;
		}
		onSelect(newValue);
	};

	return (
		<div className={styles.selectImage}>
			<form onSubmit={tryDisplaySubmit}>
				<input
					type="text"
					className="text themeControl"
					placeholder="Paste Image URL"
					value={imageDisplay}
					onChange={onDisplayChange}
					onBlur={tryDisplaySubmit}
					disabled={formBusy}
				/>
				<div>
					<input
						type="file"
						accept="image/*"
						onChange={uploadFile}
						disabled={formBusy}
					/>
				</div>
			</form>
			<div className={`${styles.imageArea} themeInset`}>
				{image && (
					<ReactCrop
						crop={crop}
						onChange={(c) => setCrop(c)}
						onComplete={postCrop}
					>
						{/* This HAS to be an <img> element to work with ReactCrop. */}
						{/* eslint-disable @next/next/no-img-element */}
						<img ref={imgRef} src={image} alt="" />
						{/* eslint-enable @next/next/no-img-element */}
					</ReactCrop>
				)}
				<canvas
					ref={canvasRef}
					className={styles.preview}
					style={{
						width: value?.crop?.width,
						height: value?.crop?.height,
					}}
				/>
			</div>
		</div>
	);
};

export default SelectorImage;
