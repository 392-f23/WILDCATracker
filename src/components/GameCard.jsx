import React, { useState, useEffect, useContext } from "react";
//import users_data from "../utilities/users_data";
import "./GameCard.css";
import { Link } from "react-router-dom";
import { useProfile } from "../utilities/profile";
import { useDbData, useDbUpdate } from "../utilities/firebase";
import { LoginContext } from "../utilities/StateProvider";

const GameCard = ({ id, game, gameAdded, user }) => {
	const [profile, profileLoading, profileError] = useProfile();
	if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
	if (profileLoading) return <h1>Loading user profile</h1>;
	if (!profile) return <h1>No profile data</h1>;
	
	const [userState] = useContext(LoginContext);
	const [update, result] = useDbUpdate(`/users/${userState.user.uid}`);
	
	//const [attended, setAttended] = useState(gameAdded);
	const [buttonText, setButtonText] = useState(
		gameAdded  ? "Points Added " : "Points " + game.point
	);
	const [buttonStyle, setButtonStyle] = useState(
		gameAdded ? "selected" : "unselected"
	);
	
	const handleButtonClick =  () => {
		if (buttonText === "Points " + game.point) {
			setButtonText("Points Added");
			setButtonStyle("selected");
			if(!(!!user?.['games-attended'])){
				update({...user, "games-attended": [id]});
			}else if(!user['games-attended'].includes(id)){
				let gamesAttended = user['games-attended'];
				gamesAttended.push(id);
				update({...user, "games-attended": gamesAttended })
			}
		} else {
			setButtonText("Points " + game.point);
			setButtonStyle("unselected");
			if(!(!!user?.['games-attended'])){
				console.error("User has not added a game yet")
			}else if(user['games-attended'].includes(id)){
				let gamesAttended = user['games-attended'];
				gamesAttended.splice(gamesAttended.indexOf(id), 1);
				update({...user, "games-attended": gamesAttended })
			}
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