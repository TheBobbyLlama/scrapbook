import { useState, useEffect, useRef, useCallback, cloneElement } from "react";

import styles from "../../styles/Select.module.css";

function isParentOrSelf(checkNode, matchNode) {
	if (checkNode === matchNode) {
		return true;
	}

	let curNode = checkNode.parentNode;

	while (curNode) {
		if (curNode === matchNode) {
			return true;
		}

		curNode = curNode.parentNode;
	}

	return false;
}

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
	const myRef = useRef(null);
	// Close select options if user clicks elsewhere.
	const checkClick = useCallback((e) => {
		if (!isParentOrSelf(e.target, myRef.current)) {
			setOpen(false);
		}
	}, []);

	useEffect(() => {
		window.addEventListener("click", checkClick);

		return () => {
			window.removeEventListener("click", checkClick);
		};
	}, [checkClick]);

	useEffect(() => {
		setInternalIndex(selectedIndex);
	}, [selectedIndex]);

	const myClass = [
		className,
		"select",
		styles.select,
		open && "focus",
		open && styles.selectFocus,
		"themeControl",
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
			ref={myRef}
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
				<div className={`${styles.selectOptions} selectOptions themeControl`}>
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
	const myClass = [className, styles.option, "selectOption"]
		.filter((item) => !!item)
		.join(" ");
	return (
		<div className={myClass} {...rest}>
			{children}
		</div>
	);
}
