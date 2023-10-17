import React, { useState, useEffect } from "react";
import "./HomePage.css";
import mbbGamesData from "../utilities/mbbGames.json";
import NavBar from "./NavBar";
import { ref, get } from "firebase/database";
import { database } from "../utilities/firebase";

const HomePage = () => {
	const [showAllGames, setShowAllGames] = useState(false);
	const [showAttendedGames, setShowAttendedGames] = useState(false);
	const today = new Date().toISOString().split("T")[0];
	const pastGames = mbbGamesData.filter((game) => game.date < today);
	const attendedGames = pastGames.filter((game) => game.attended);
	const uid = localStorage.getItem("uid");

	console.log(`users/${uid}`);
	const userRef = ref(database, `users/${uid}`);

	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [imageURL, setImageURL] = useState("");

	// get user data stored in firebase
	get(userRef)
		.then((snapshot) => {
			if (snapshot.exists()) {
				const userData = snapshot.val();
				console.log(`User data at users/${uid}:`, userData);
				setDisplayName(userData.displayName);
				setEmail(userData.email);
				setImageURL(userData.photoURL);
			} else {
				console.log(`No data found at users/${uid}.`);
			}
		})
		.catch((error) => {
			console.error("Error getting user data:", error);
		});

	return (
		<div className='content'>
			<NavBar />
			<div className='userInfo'>
				<img src={imageURL} alt='User Headshot' className='headshot' />
				<p>Name: {displayName}</p>
				{/* <p>Surname: Smith</p> */}
				<p>Email: {email}</p>
			</div>
			{/* <div className='studentInfo'>
				<p>Year: 3rd Year</p>
				<p>Graduation Date: 2025</p>
			</div> */}
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
