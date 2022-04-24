import { getCollection } from "../../../lib/mongodb";

export default function handler(req, res) {
	const { albumId } = req.query;

	// TODO - Hit MongoDB!
	res.status(200).json({ message: "Success!" });
}
