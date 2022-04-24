import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./albumSlice";

export default configureStore({
	reducer: {
		album: albumReducer,
	},
});
