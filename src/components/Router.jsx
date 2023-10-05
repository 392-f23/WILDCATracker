import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import NavBar from "./NavBar"
import GameCard from "./GameCard"
import games_data from "../utilities/data.js";

const MyRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element = {
					<div>
						<NavBar></NavBar>
						<GameCard Game={games_data["1"]}></GameCard>
					</div>
				}></Route>
				<Route path='/games' element = {
					<NavBar></NavBar>
				}></Route>
				<Route path='/points' element = {
					<NavBar></NavBar>
				}></Route>
				<Route path='/home' element = {
					<NavBar></NavBar>
				}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default MyRouter;
