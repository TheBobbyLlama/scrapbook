import styles from "../styles/AddSection.module.css";

export default function AddSection({ onClick }) {
	return (
		<div className={styles.addSection} onClick={onClick}>
			Add Section
		</div>
	);
}
