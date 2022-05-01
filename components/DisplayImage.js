import styles from "../styles/Display.module.css";

export default function DisplayImage({ data }) {
	const dataValue = data?.dataCropped || data?.data || data?.url || data;

	if (dataValue) {
		return (
			<div
				className={styles.displayImage}
				style={{ backgroundImage: `url('${dataValue}')` }}
			></div>
		);
	} else {
		return <></>;
	}
}
