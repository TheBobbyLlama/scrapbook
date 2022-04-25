import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./albumSlice";
import modalReducer from "./modalSlice";

export default configureStore({
	reducer: {
		album: albumReducer,
		modal: modalReducer,
	},
});
