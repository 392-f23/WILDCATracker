import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import GamesPage from "./GamesPage";
import games_data from "../utilities/data.js";

const MyRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {
                    <NavBar></NavBar>
                }></Route>
                <Route path='/games' element = {
                    <div>
                        <NavBar></NavBar>
                        <GamesPage games={games_data}></GamesPage>
                    </div>
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
