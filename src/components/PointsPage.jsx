import { useState } from "react";
import NavBar from "./NavBar";
import AttendedGamesList from "./AttendedGamesList";
import AttendedGamesChart from "../AttendedGamesChart";
import "./PointsPage.css";
import { useProfile } from "../utilities/profile";
import { useDbData } from "../utilities/firebase";

const historyWindows = ["Total", "Week", "Month"];

const today = new Date();
export const historyLookback = {
	Total: new Date(0),
	Week: new Date(new Date(today).setDate(today.getDate() - 7)),
	Month: new Date(new Date(today).setDate(today.getDate() - 30)),
};

const PointsPage = () => {
	const [profile, profileLoading, profileError] = useProfile();
	const userData = useDbData(`/users/${profile?.user?.uid}`);
	const attendedGamesIds = userData.length > 1 && userData[0] ? userData[0]["games-attended"] : [];
	const [data, error] = useDbData("/events/");
	const attendedGames = attendedGamesIds.map(
		(gameId) => data[gameId]
	);
	const futureGames = attendedGames.filter(
		(game) => Date() < new Date(game.date)
	);
	futureGames.sort((a, b) => a.date + b.date);
	// const pastGames = attendedGames.filter(
	// 	(game) => Date() > new Date(game.date)
	// );

	const points = attendedGames.reduce((sum, game) => sum + game.point, 0);
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

	return (
		profile.user !== undefined && data !== undefined ? (
			<div className='content'>
				<NavBar></NavBar>
				<h1 style={{ textAlign: "center" }}>{points} Points</h1>
				<div className='button-group'>
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
				<div className="bottom-half">
					<div
						className='button-group'
						style={{ display: "flex", alignItems: "center" }}
					>
						{[
							{ label: "Attended", val: true },
							{ label: "Upcoming", val: false },
						].map((option) => (
							<div key={option.label} style={{ margin: "auto" }}>
								<input
									type='radio'
									className='btn-check '
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
					{past ? (
						<AttendedGamesList games={attendedGames.filter(
							(game) => new Date() > new Date(game.date)
						)} />
					) : (
						<AttendedGamesList games={futureGames} />
					)}
				</div>
			</div>)
			: <div>Loading...</div>
	);
};

export default PointsPage;
