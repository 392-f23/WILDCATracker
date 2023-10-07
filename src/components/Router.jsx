import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import GamesPage from "./GamesPage";
import PointsPage from "./PointsPage";
import HomePage from "./HomePage";
import games_data from "../utilities/data.js";
import users_data from "../utilities/users_data";

const MyRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<NavBar></NavBar>}></Route>
				<Route path='/games' element={<GamesPage games={games_data} />}></Route>
				<Route
					path='/points'
					element={<PointsPage user={users_data[0]} />}
				></Route>
				<Route path='/home' element={<HomePage />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default MyRouter;
