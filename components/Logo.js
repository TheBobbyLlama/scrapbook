import styles from "../styles/Logo.module.css";

export default function Logo({ size }) {
	return (
		<div className={styles.logo} style={{ height: size, width: size }}></div>
	);
}
