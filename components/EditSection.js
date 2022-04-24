import AddSection from "./AddSection";

import styles from "../styles/EditSection.module.css";

export default function EditSection({ index }) {
	return (
		<>
			<AddSection />
			<section>Hi {index}</section>
		</>
	);
}
