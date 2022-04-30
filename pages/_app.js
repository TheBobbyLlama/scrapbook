import store from "../redux/store";
import { Provider } from "react-redux";
import Modal from "../components/Modal";

import "../styles/globals.css";
import "../styles/Theme.dark.css";
import "../styles/Theme.sunshine.css";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
			<Modal />
		</Provider>
	);
}

export default MyApp;
