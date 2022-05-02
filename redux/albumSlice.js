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
				state.value.sections = [...state.value.sections]; // Copy array so original remains unchanged.

				state.value.sections.splice(
					action.payload.sectionIndex,
					0,
					action.payload.section
				);

				delete state.value.saved;
			}
		},
		deleteSection: (state, action) => {
			state.value.sections = [...state.value.sections]; // Copy array so original remains unchanged.
			state.value.sections.splice(action.payload.sectionIndex, 1);
			delete state.value.saved;
		},
		setSectionTitle: (state, action) => {
			state.value.sections = [...state.value.sections]; // Copy array so original remains unchanged.

			state.value.sections[action.payload.sectionIndex] = {
				...state.value.sections[action.payload.sectionIndex],
			}; // Copy section so original remains unchanged.

			state.value.sections[action.payload.sectionIndex].title =
				action.payload.title;
			delete state.value.saved;
		},
		insertItem: (state, action) => {
			const { item, sectionIndex, itemIndex } = action.payload;
			if (
				item &&
				sectionIndex >= 0 &&
				sectionIndex < state.value.sections.length &&
				itemIndex >= 0
			) {
				state.value.sections[sectionIndex] = {
					...state.value.sections[sectionIndex],
				}; // Copy section so original remains unchanged.

				state.value.sections[sectionIndex].items = [
					...state.value.sections[sectionIndex].items,
				]; // Copy array so original remains unchanged.

				state.value.sections[sectionIndex].items.splice(itemIndex, 0, item);

				delete state.value.saved;
			}
		},
		editItem: (state, action) => {
			const { item, sectionIndex, itemIndex } = action.payload;

			if (
				item &&
				sectionIndex >= 0 &&
				sectionIndex < state.value.sections.length &&
				itemIndex >= 0 &&
				itemIndex < state.value.sections[sectionIndex].items.length
			) {
				state.value.sections[sectionIndex] = {
					...state.value.sections[sectionIndex],
				}; // Copy section so original remains unchanged.

				state.value.sections[sectionIndex].items = [
					...state.value.sections[sectionIndex].items,
				]; // Copy array so original remains unchanged.

				state.value.sections[sectionIndex].items[itemIndex] = item;

				delete state.value.saved;
			}
		},
		deleteItem: (state, action) => {
			const { sectionIndex, itemIndex } = action.payload;

			if (
				sectionIndex >= 0 &&
				sectionIndex < state.value.sections.length &&
				itemIndex >= 0 &&
				itemIndex < state.value.sections[sectionIndex].items.length
			) {
				state.value.sections[sectionIndex] = {
					...state.value.sections[sectionIndex],
				}; // Copy section so original remains unchanged.

				state.value.sections[sectionIndex].items = [
					...state.value.sections[sectionIndex].items,
				]; // Copy array so original remains unchanged.

				state.value.sections[sectionIndex].items.splice(itemIndex, 1);

				delete state.value.saved;
			}
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
	deleteSection,
	setSectionTitle,
	insertItem,
	editItem,
	deleteItem,
} = albumSlice.actions;

export default albumSlice.reducer;
