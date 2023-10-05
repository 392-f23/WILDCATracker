import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import NavBar from "./NavBar"

const MyRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element = {
					<NavBar></NavBar>
				}></Route>
				<Route path='/games'></Route>
				<Route path='/points'></Route>
				<Route path='/home'></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default MyRouter;
