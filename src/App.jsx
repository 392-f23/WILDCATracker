import React, {useEffect} from "react";
import { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./components/NavBar";
import MyRouter from "./components/Router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faVolleyball,
	faHockeyPuck,
	faFutbol,
	faBasketball,
	faFootball,
	faBaseball,
	faMedal,
} from "@fortawesome/free-solid-svg-icons";
library.add(
	faVolleyball,
	faHockeyPuck,
	faFutbol,
	faBasketball,
	faFootball,
	faBaseball,
	faMedal
);
import Login from "./components/Login";
import {LoginContext} from "./utilities/StateProvider";

const Main = () => {
    const [loginState] = useContext(LoginContext);

	useEffect(() => {

        // Check local storage for user data on component mount
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData != null) {
            loginState.user = JSON.parse(storedUserData)
        }

    }, [loginState.user]); // Empty dependency array ensures this runs only once on mount

 	return ( loginState.user ? 
		<div style={{ background: "whitesmoke" }}>
			<MyRouter>
				<NavBar />
			</MyRouter> 
		</div> : 
		<Login />
	);
};

const App = () => {
    return <Main />;
};

export default App;
