import { createSlice } from "@reduxjs/toolkit";

export const modalKeys = {
	addItem: "ADD_ITEM",
};

export const modalSlice = createSlice({
	name: "modal",
	initialState: {
		key: undefined,
		props: undefined,
	},
	reducers: {
		setModal: (state, action) => {
			state.key = action?.payload?.key;
			state.props = action?.payload?.props;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
