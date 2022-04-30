import { useState, useEffect, cloneElement } from "react";

import styles from "../../styles/Select.module.css";

export function Select({
	name,
	className,
	selectedIndex,
	onChange,
	children,
	...rest
}) {
	const [open, setOpen] = useState(false);
	const [internalIndex, setInternalIndex] = useState(selectedIndex || 0);

	useEffect(() => {
		setInternalIndex(selectedIndex);
	}, [selectedIndex]);

	const myClass = [
		className,
		"select",
		styles.select,
		open && "focus",
		open && styles.selectFocus,
	]
		.filter((item) => !!item)
		.join(" ");

	const selectedChild = children
		? children.length
			? children[internalIndex]
			: children
		: null;

	const doSelection = (index) => {
		if (index !== internalIndex) {
			setInternalIndex(index);

			if (onChange) {
				const dummyEvent = { target: { name, value: index } };
				onChange(dummyEvent);
			}
		}
	};

	return (
		<div
			name={name}
			className={myClass}
			{...rest}
			onClick={() => {
				if (children) {
					setOpen(!open);
				}
			}}
		>
			{selectedChild}
			{open && (
				<div className={styles.selectOptions}>
					{children.length
						? children.map((child, index) => {
								return cloneElement(child, {
									onClick: () => {
										doSelection(index);
									},
								});
						  })
						: cloneElement(children, {
								onClick: () => {
									doSelection(0);
								},
						  })}
				</div>
			)}
		</div>
	);
}

export function Option({ className, children, ...rest }) {
	const myClass = [className, styles.option].filter((item) => !!item).join(" ");
	return (
		<div className={myClass} {...rest}>
			{children}
		</div>
	);
}
