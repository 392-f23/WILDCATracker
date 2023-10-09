import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoginStateProvider from "./utilities/StateProvider";
import { initialLoginState, reducer } from "./utilities/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<LoginStateProvider reducer={reducer} initialLoginState={initialLoginState}>
			<App />
		</LoginStateProvider>
	</React.StrictMode>
);
