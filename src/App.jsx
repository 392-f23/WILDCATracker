import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import games_data from "./utilities/data.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./components/NavBar";
import MyRouter from "./components/Router";

const Main = () => {
	console.log(games_data);

	return (
		<MyRouter>
			<NavBar>
			</NavBar>
		</MyRouter>

	);
};

const App = () => {
	return <Main></Main>;
};

export default App;
