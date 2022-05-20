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

	const handleKeyDown = (e) => {
		if (open) {
			switch (e.code) {
				case "Enter":
				case "Space":
				case "Escape":
					setOpen(false);
					break;
				case "ArrowUp":
					if (internalIndex > 0) {
						doSelection(internalIndex - 1);
					}
					break;
				case "ArrowDown":
					if (children?.length && internalIndex < children.length - 1) {
						doSelection(internalIndex + 1);
					}
					break;
				default:
					if (children?.length && e.key.match(/^[a-z0-9]$/i)) {
						const matches = children
							.map((child) => child.key.toString().toLowerCase())
							.filter((key) => {
								return key.startsWith(e.key.toLowerCase());
							})
							.map((key) =>
								children.findIndex(
									(child) => child.key.toString().toLowerCase() === key
								)
							);

						let setIndex = matches.length ? matches[0] : -1;

						for (let i = 0; i < matches.length; i++) {
							if (matches[i] > internalIndex) {
								setIndex = matches[i];
								break;
							}
						}

						if (setIndex > -1) {
							doSelection(setIndex);
						}
					}
					break;
			}
		} else {
			switch (e.code) {
				case "Enter":
				case "Space":
				case "ArrowDown":
					setOpen(true);
					break;
				default:
					break;
			}
			if (e.code === "Enter" || e.code === "Space" || e.code === "ArrowDown") {
				setOpen(true);
			}
		}
	};

	return (
		<div
			ref={myRef}
			name={name}
			className={myClass}
			role="combobox"
			aria-controls="customSelectOpen"
			aria-activedescendant={open && "customSelectOpen"}
			aria-expanded={open}
			tabIndex={0}
			{...rest}
			onKeyDown={handleKeyDown}
			onClick={() => {
				if (children) {
					setOpen(!open);
				}
			}}
		>
			{selectedChild}
			{open && (
				<div
					id="customSelectOpen"
					className={`${styles.selectOptions} selectOptions themeControl`}
				>
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
