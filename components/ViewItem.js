import { albumItemSelectors } from "../lib/globals";

import styles from "../styles/EditItem.module.css";

export default function ViewItem({ data }) {
	const DisplayComponent = albumItemSelectors.find(
		(item) => item.key === data.type
	)?.displayComponent;

	console.log(data);

	return (
		<div className={`albumCard ${styles.editItem} themeCard`}>
			<h3>{data.title}</h3>
			<div className={`cardContent`}>
				<DisplayComponent data={data.value} />
			</div>
			{data?.type !== "Text" ? (
				<div className={`cardCaption`}>{data.caption}</div>
			) : null}
		</div>
	);
}
