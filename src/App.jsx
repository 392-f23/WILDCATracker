import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import games_data from "./utilities/data.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./components/NavBar";
import MyRouter from "./components/Router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faVolleyball, faHockeyPuck, faFutbol, faBasketball, faFootball, faBaseball, faMedal } from "@fortawesome/free-solid-svg-icons";
library.add( faVolleyball, faHockeyPuck, faFutbol, faBasketball, faFootball, faBaseball, faMedal);

const Main = () => {
	console.log(games_data);

	return (
		<div style={{background:'whitesmoke'}}>
			<MyRouter>
			</MyRouter>
		</div>

	);
};

const App = () => {
	return <Main></Main>;
};

export default App;
