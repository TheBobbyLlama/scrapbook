import styles from "../styles/Display.module.css";

export default function DisplayText({ data }) {
	return (
		<div
			className={styles.displayText}
			dangerouslySetInnerHTML={{ __html: data }}
		/>
	);
}
