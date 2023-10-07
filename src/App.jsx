import React from "react";
import { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import games_data from "./utilities/data.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./components/NavBar";
import MyRouter from "./components/Router";
import Login from "./components/Login";
import {LoginContext} from "./utilities/StateProvider";

const Main = () => {
    const [loginState] = useContext(LoginContext);
    console.log(games_data);
    console.log(loginState);
 	return ( loginState.user ? 
		<div style={{ background: "whitesmoke" }}>
			<MyRouter></MyRouter> 
		</div> : 
		<Login />
	);
};

const App = () => {
    return <Main />;
};

export default App;
