import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import GamesPage from "./GamesPage";
import PointsPage from "./PointsPage";
import HomePage from "./HomePage";
import games_data from "../utilities/data.js";
import users_data from "../utilities/users_data";
import GameEditor from "./GameEditor";
import { useDbData } from "../utilities/firebase";
import {get, ref} from "firebase/database"

const GameFormForUrl = ({games}) => {
    const { id } = useParams();
    return <div className = "container"><GameEditor id={id} game={games[id]} /></div>;
};




const MyRouter = () => {
	// let data = null
	// get(ref(database, `events/`)).then(snapshot =>
	// 	{if(snapshot.exists())
	// 		data = snapshot;}
	// )
	// console.log(data);

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<GamesPage games={useDbData('/events/')} />}></Route>
				<Route path='/games' element={<GamesPage games={useDbData('/events/')} />}></Route>
				<Route path="/games/:id/edit" element={
         			<GameFormForUrl games={games_data} />
				}/>
				<Route path='/points' element={<PointsPage />}></Route>
				<Route path='/home' element={<HomePage />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default MyRouter;
