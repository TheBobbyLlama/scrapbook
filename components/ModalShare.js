import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../redux/modalSlice";

const ModalShare = () => {
	const albumData = useSelector((state) => state.album.value);
	const dispatch = useDispatch();

	const url = window.location.origin + "/album?id=" + albumData._id;

	return (
		<div className="modal themeStandard">
			<h2 className="themeTitle">Share {albumData.title}</h2>
			<p>Click the link to copy it.</p>
			<div>
				<button
					className="btn"
					onClick={() => {
						navigator.clipboard.writeText(url);
					}}
				>
					{url}
				</button>
			</div>
		</div>
	);
};

export default ModalShare;
