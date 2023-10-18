import React, { useState, useEffect, useContext } from "react";
//import users_data from "../utilities/users_data";
import "./GameCard.css";
import { Link } from "react-router-dom";
import { useProfile } from "../utilities/profile";
import { useDbData, useDbUpdate } from "../utilities/firebase";
import { LoginContext } from "../utilities/StateProvider";

const GameCard = ({ id, game, gameAdded, user }) => {
	const abbrevDict = {
		SOC: "Soccer",
		VB: "Volleyball",
		FB: "Men's Football",
		FHOCKEY: "Men's Field Hockey",
		BB: "Basketball",
		SWIM: "Swim",
		FENC: "Fencing",
	};
	const [profile, profileLoading, profileError] = useProfile();
	if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
	if (profileLoading) return <h1>Loading user profile</h1>;
	if (!profile) return <h1>No profile data</h1>;

	// const [userState] = useContext(LoginContext);
	const [update, result] = useDbUpdate(`/users/${profile?.user?.uid}`);

	//const [attended, setAttended] = useState(gameAdded);
	const [buttonText, setButtonText] = useState(
		gameAdded ? "Points Added " : "Points " + game.point
	);
	const [buttonStyle, setButtonStyle] = useState(
		gameAdded ? "selected" : "unselected"
	);

	const getGameTitle = (abbrev) => {
		let result = "";
		if (abbrev[0] !== "F") {
			const gender = abbrev[0];
			if (gender === "M") {
				result += "Men's ";
			} else {
				result += "Women's ";
			}
			result += abbrevDict[abbrev.substring(1)];
		} else {
			result += abbrevDict[abbrev];
		}
		return result;
	};

	const handleButtonClick = () => {
		if (buttonText === "Points " + game.point) {
			setButtonText("Points Added");
			setButtonStyle("selected");
			if (!!!user?.["games-attended"]) {
				update({ ...user, "games-attended": [id] });
			} else if (!user["games-attended"].includes(id)) {
				let gamesAttended = user["games-attended"];
				gamesAttended.push(id);
				update({ ...user, "games-attended": gamesAttended });
			}
			let points = user["points"] + game.point;
			update({ ...user, points: points });
		} else {
			setButtonText("Points " + game.point);
			setButtonStyle("unselected");
			if (!!!user?.["games-attended"]) {
				console.error("User has not added a game yet");
			} else if (user["games-attended"].includes(id)) {
				let gamesAttended = user["games-attended"];
				gamesAttended.splice(gamesAttended.indexOf(id), 1);
				update({ ...user, "games-attended": gamesAttended });
			}
			let points = user["points"] - game.point;
			update({ ...user, points: points });
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
						{getGameTitle(game.eventKey)}
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
					<h6 className='card-subtitle mb-2 text-muted'>Northwestern</h6>
					<h5
						className='card-subtitle mb-2'
						style={{
							// position: "absolute",
							// right: "50px",
							// top: "58px",
							fontWeight: "bold",
						}}
					>
						{" "}
						vs{" "}
					</h5>
					<span>
						<h6 className='card-subtitle mb-2 text-muted'>{game.opponent}</h6>
						<img
							src={
								game.imgURL
									? game.imgURL
									: "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nusports.com/images/logos/Northwestern_university.png"
							}
							width='50px'
							height='50px'
							className='university-logo'
						></img>
					</span>

					<h6
						className='card-subtitle mb-2 text-muted'
						style={{ marginTop: "20px" }}
					>
						{new Date(game.date).toDateString()} {game.time}
					</h6>
				</div>
				<hr style={{ border: "1px solid rgb(78, 42, 132)" }}></hr>
				<div>
					<div className='card-location mb-2 text-muted'>
						<a className='card-location text-muted' href={game.locationURL}>
							{game.location}
						</a>
					</div>
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
