import React, { useState, useEffect } from "react";
import "./Homepage.css";
import mbbGamesData from "../utilities/mbbGames.json";
import NavBar from "./NavBar";

const HomePage = () => {
	const [showAllGames, setShowAllGames] = useState(false);
	const [showAttendedGames, setShowAttendedGames] = useState(false);
	const today = new Date().toISOString().split("T")[0];
	const pastGames = mbbGamesData.filter((game) => game.date < today);
	const attendedGames = pastGames.filter((game) => game.attended);

	return (
		<div className='content'>
			<NavBar />
			<div className='userInfo'>
				<img
					src='path_to_headshot.jpg'
					alt='User Headshot'
					className='headshot'
				/>
				<p>Name: John Doe</p>
				<p>Surname: Smith</p>
				<p>Email: johnsmith@email.com</p>
			</div>
			<div className='studentInfo'>
				<p>Year: 3rd Year</p>
				<p>Graduation Date: 2025</p>
			</div>
			<button
				style={{
					background: "rgb(57, 35, 89)",
					borderRadius: "5px",
					marginInline: "5px",
				}}
				onClick={() => setShowAllGames(!showAllGames)}
			>
				Past MBB Games
			</button>
			{showAllGames && (
				<ul>
					{pastGames.map((game) => (
						<li key={game.id}>
							{game.name} - {game.date}
						</li>
					))}
				</ul>
			)}
			<button
				style={{
					background: "rgb(57, 35, 89)",
					borderRadius: "5px",
					marginInline: "5px",
				}}
				onClick={() => setShowAttendedGames(!showAttendedGames)}
			>
				Attended MBB Games
			</button>
			{showAttendedGames && (
				<ul>
					{attendedGames.map((game) => (
						<li key={game.id}>
							{game.name} - {game.date}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default HomePage;
