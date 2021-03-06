const bcrypt = require("bcrypt");
import { ObjectId } from "mongodb";
import { getCollection } from "../../lib/mongodb";

export default async function handler(req, res) {
	try {
		let result;
		const album = req.body;
		const textItems = [];

		const textCollection = await getCollection("text");
		const albumCollection = await getCollection("albums");

		// Send all text items off to their own documents, to prevent any issues with size limits.
		for (let s = 0; s < album.sections.length; s++) {
			for (let i = 0; i < album.sections.length; i++) {
				const curItem = album.sections[s].items[i];

				if (curItem.type === "Text" && curItem.value?.text) {
					let result;

					if (curItem.value._id) {
						result = await textCollection.updateOne(
							{ _id: ObjectId(curItem.value._id) },
							{ $set: { text: curItem.value.text } }
						);
					} else {
						result = await textCollection.insertOne({
							text: curItem.value.text,
						});

						curItem.value._id = result.insertedId;
					}

					textItems.push({ ...curItem.value });

					delete curItem.value.text;
					delete curItem.value.invalid;
				}
			}
		}

		if (album._id) {
			const { _id, ...setAlbum } = album;
			result = await albumCollection.updateOne(
				{ _id: ObjectId(album._id) },
				{ $set: { ...setAlbum } }
			);
		} else if (album.password) {
			album.password = await bcrypt.hash(album.password, 10);
			result = await albumCollection.insertOne(album);
			album._id = result.insertedId;
		} else {
			res.status(400).json({ message: "A password is required." });
			return;
		}

		// Now that the album document is saved, go back through and put the text back so it can be displayed on the front end.
		for (let s = 0; s < album.sections.length; s++) {
			for (let i = 0; i < album.sections[s].items.length; i++) {
				const curItem = album.sections[s].items[i];

				if (curItem.type === "Text") {
					curItem.value.text = textItems.find(
						(textData) => textData._id === curItem.value._id
					).text;
				}
			}
		}

		res.status(200).json(album);
	} catch {
		res.status(500);
	}
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "50mb",
		},
	},
};
