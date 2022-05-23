var FormData = require("form-data");
var axios = require("axios").default;

export default function handler(req, res) {
	try {
		if (req.method !== "POST") {
			res.status(500);
			return;
		}

		const { data, title } = req.body;

		const body = new FormData();

		body.append("image", data.replace(/^data:image\/.*;base64,/, "")); // Need to strip the prefix for the API!
		body.append("type", "base64");

		if (title) {
			body.append("title", title);
		}

		axios
			.post("https://api.imgur.com/3/upload", body, {
				headers: {
					Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
				},
			})
			.then(
				({ data }) => {
					if (data.success) {
						res.status(200).json({ url: data.data.link });
					} else {
						res.status(500).json({
							message: "An error has occurred.",
						});
					}
				},
				() => {
					res.status(500);
				}
			);
	} catch {
		res.status(500);
	}
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb",
		},
	},
};
