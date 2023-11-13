import React, { useEffect } from "react";
import { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./components/NavBar";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faVolleyball,
  faHockeyPuck,
  faFutbol,
  faBasketball,
  faFootball,
  faBaseball,
  faMedal,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faVolleyball,
  faHockeyPuck,
  faFutbol,
  faBasketball,
  faFootball,
  faBaseball,
  faMedal,
  faDumbbell
);
import Login from "./components/Login";
import MyRouter from "./components/Router";
import { LoginContext } from "./utilities/StateProvider";
import { useAuthState } from "./utilities/firebase";

const Main = () => {
  const [loginState] = useAuthState();
  //console.log(loginState);
  //if (!loginState.user && localStorage.getItem("user"))
  //	loginState.user = localStorage.getItem("user");

  return loginState ? (
    <div style={{ background: "whitesmoke" }}>
      <MyRouter />
    </div>
  ) : (
    <Login />
  );
};

const App = () => {
  return <Main />;
};

export default App;
