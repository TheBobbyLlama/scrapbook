var FormData = require("form-data");

export default function handler(req, res) {
	if (req.method !== "POST") {
		res.status(500);
		return;
	}

	const { data, title } = req.body;

	const body = new FormData();

	body.append("image", data.replace(/^data:image\/png;base64,/, "")); // Need to strip the prefix for the API!
	body.append("type", "base64");

	if (title) {
		body.append("title", title);
	}

	fetch("https://api.imgur.com/3/upload", {
		method: "POST",
		headers: {
			Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
		},
		body,
	})
		.then((apiRes) => {
			return apiRes.json();
		}, res.status(500))
		.then((data) => {
			if (data.success) {
				res.status(200).json({ url: data.data.link });
			} else {
				res.status(data.status);
			}
		}, res.status(500));
}

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "10mb",
		},
	},
};
