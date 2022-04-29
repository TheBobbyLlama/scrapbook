import { useState } from "react";

const useFormData = (initialValue) => {
	const [formData, setFormData] = useState(initialValue || {});

	const handleChange = (e) => {
		setFormData((prevData) => {
			return { ...prevData, [e.target.name]: e.target.value };
		});
	};

	const updateFormData = (newData) => {
		setFormData((prevData) => {
			return { ...prevData, ...newData };
		});
	};

	return [formData, handleChange, updateFormData];
};

export default useFormData;
