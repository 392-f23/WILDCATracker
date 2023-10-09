import { useState } from "react";
import NavBar from "./NavBar";
import AttendedGamesList from "./AttendedGamesList";
import AttendedGamesChart from "../AttendedGamesChart";
import games_data from "../utilities/data";
import "./PointsPage.css";

const historyWindows = ["Total", "Week", "Month"];

const today = new Date();
export const historyLookback = {
	Total: new Date(0),
	Week: new Date(new Date(today).setDate(today.getDate() - 7)),
	Month: new Date(new Date(today).setDate(today.getDate() - 30)),
};

const PointsPage = () => {
	if (!localStorage.getItem("games_attended")) {
		localStorage.setItem(
			"games_attended",
			JSON.stringify(users_data[0].attended_games)
		);
	}

	const attendedGameIds = JSON.parse(localStorage.getItem("games_attended")).filter((game) => game != null);
	const attendedGames = games_data.filter((game) =>
		attendedGameIds.includes(game.id) && new Date() >= new Date(game.date)
	);
	const futureGames = games_data.filter((game) =>
		attendedGameIds.includes(game.id) && new Date() < new Date(game.date)
	);
	const points = attendedGames.reduce((sum, game) => sum + game.points, 0);
	const [filteredGames, setFilteredGames] = useState(attendedGames);
	const [window, setWindow] = useState("Total");
	const [past, setPast] = useState(true);

	const filterGames = (filter) => {
		setWindow(filter);
		setFilteredGames(
			attendedGames.filter(
				(game) => new Date(game.date) > historyLookback[filter]
			)
		);
	};
	console.log(past);
	return (
		<div className='content'>
			<NavBar></NavBar>
			<h1 style={{ textAlign: "center" }}>{points} Points</h1>
			<div
				className='button-group'
				style={{ display: "flex", alignItems: "center" }}
			>
				{historyWindows.map((option) => (
					<div key={option} style={{ margin: "auto" }}>
						<input
							type='radio'
							className='btn-check'
							name='btnradio'
							id={option}
							autoComplete='off'
							defaultChecked={window == option}
							onClick={() => filterGames(option)}
						/>
						<label
							className={
								option === window
									? "time-chart-label-selected"
									: "time-chart-label-unselected"
							}
							id={option}
							htmlFor={option}
						>
							{option}
						</label>
					</div>
				))}
			</div>
			<AttendedGamesChart games={attendedGames} window={window} />
			<div
				className='button-group'
				style={{ display: "flex", alignItems: "center" }}
			>
				{[{ label: "Past", val: true }, { label: "Future", val: false }].map((option) => (
					<div key={option.label} style={{ margin: "auto" }}>
						<input
							type='radio'
							className='btn-check'
							name='btnradio'
							id={option.label}
							autoComplete='off'
							defaultChecked={past == option.val}
							onClick={() => setPast(option.val)}
						/>
						<label
							className={
								option.val === past
									? "time-chart-label-selected"
									: "time-chart-label-unselected"
							}
							id={option.label}
							htmlFor={option.label}
						>
							{option.label}
						</label>
					</div>
				))}
			</div>
			{past ? <AttendedGamesList games={filteredGames} /> : <AttendedGamesList games={futureGames} />}
		</div>
	);
};

export default PointsPage;
