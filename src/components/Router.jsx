import React from "react";
import { BrowserRouter, Router, Routes, useParams } from "react-router-dom";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/'></Route>
				<Route path='/games'></Route>
				<Route path='/points'></Route>
				<Route path='/home'></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
