import React, { useState, useEffect } from "react";
import users_data from "../utilities/users_data";
import "./GameCard.css";
import { Link } from "react-router-dom";
import { useProfile } from "../utilities/profile";
import { useDbData } from "../utilities/firebase";

const addGame = (gameId, userId) => {

	const updates = {};
	updates['users/' + userId + '/' + "attended-games"];
};

const removeGame = (gameId, userId) => {
	let attendedGames = JSON.parse(localStorage.getItem("games_attended"));

	if (attendedGames.indexOf(gameId) !== -1) {
		attendedGames.splice(attendedGames.indexOf(gameId), 1);
	}

	localStorage.setItem("games_attended", JSON.stringify(attendedGames));
};

const GameCard = ({ id, game, gameAdded }) => {
	const [profile, profileLoading, profileError] = useProfile();
	if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
	if (profileLoading) return <h1>Loading user profile</h1>;
	if (!profile) return <h1>No profile data</h1>;

	
	//const [attended, setAttended] = useState(gameAdded);
	const [buttonText, setButtonText] = useState(
		gameAdded ? "Points Added " : "Points " + game.point
	);
	const [buttonStyle, setButtonStyle] = useState(
		gameAdded ? "selected" : "unselected"
	);

	const handleButtonClick = () => {
		if (buttonText === "Points " + game.point) {
			setButtonText("Points Added");
			setButtonStyle("selected");
			addGame(game.id);
		} else {
			setButtonText("Points " + game.point);
			setButtonStyle("unselected");
			removeGame(game.id);
		}
		// setAttended((prev) => !prev);
		// setButtonText(attended ? "Points Added" : "Points " + game.points);
		// setButtonStyle(attended ? "selected" : "unselected");
	};

	const url = "/games/" + id + "/edit";

	return (
		<div className='card m-2 p-2'>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					height: "100%",
					padding: "5px",
				}}
			>
				<div>
					<div className='card-title'>
						{game.eventKey}
						{profile?.isAdmin && (
							<div className='card-edit-button'>
								<Link to={url}>
									<button
										style={{ background: "transparent", border: "transparent" }}
									>
										<i className='bi-pencil-square' id='edit-button-icon' />
									</button>
								</Link>
							</div>
						)}
					</div>
					<h6 className='card-subtitle mb-2 text-muted'>
						Northwestern vs {game.opponent}
					</h6>
					<h6 className='card-subtitle mb-2 text-muted'>
						{new Date(game.date).toDateString()} {game.time}
					</h6>
				</div>
				<div>
					<hr></hr>
					<div className='card-location mb-2 text-muted'>{game.location}</div>
					<button
						className={`game-card-button-${buttonStyle}`}
						onClick={handleButtonClick}
					>
						{buttonText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default GameCard;