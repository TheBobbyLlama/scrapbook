import { createSlice } from "@reduxjs/toolkit";

export const albumSlice = createSlice({
	name: "album",
	initialState: {
		value: undefined,
	},
	reducers: {
		setAlbumData: (state, action) => {
			state.value = action.payload;

			if (state.value) {
				state.value.saved = true;
			}
		},
		markSaved: (state) => {
			state.value.saved = true;
		},
		setTheme: (state, action) => {
			state.value.theme = action.payload;
			delete state.value.saved;
		},
		setTitle: (state, action) => {
			state.value.title = action.payload;
			delete state.value.saved;
		},
		insertSection: (state, action) => {
			if (action.payload.sectionIndex >= 0) {
				state.value.sections.splice(
					action.payload.sectionIndex,
					0,
					action.payload.section
				);

				delete state.value.saved;
			}
		},
		removeSection: (state, action) => {
			state.value.sections.splice(action.sectionIndex, 1);
			delete state.value.saved;
		},
		setSectionTitle: (state, action) => {
			state.value.sections[action.payload.sectionIndex].title =
				action.payload.title;
			delete state.value.saved;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setAlbumData,
	markSaved,
	setTheme,
	setTitle,
	insertSection,
	removeSection,
	setSectionTitle,
} = albumSlice.actions;

export default albumSlice.reducer;
