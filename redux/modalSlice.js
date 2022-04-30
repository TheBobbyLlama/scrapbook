import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
	name: "modal",
	initialState: {
		key: undefined,
		props: undefined,
		theme: "",
	},
	reducers: {
		setModal: (state, action) => {
			state.key = action?.payload?.key;
			state.props = action?.payload?.props;
			state.theme = action?.payload?.theme || "";
		},
	},
});

// Action creators are generated for each case reducer function
export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
