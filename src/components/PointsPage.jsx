import { useState } from "react";
import NavBar from "./NavBar";
import AttendedGamesList from "./AttendedGamesList";
import AttendedGamesChart from "../AttendedGamesChart";
import "./PointsPage.css";
import { useDbData } from "../utilities/firebase";
import { useProfile } from "../utilities/profile";

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
	console.log(userData)
	const attendedGamesIds = userData.length > 1 && userData[0] ? userData[0]["games-attended"] : [];
	const [data, error] = useDbData("/events/");
	console.log(attendedGamesIds)
	const attendedGames = attendedGamesIds.map(
		(gameId) => data[gameId]
	);
	const futureGames = attendedGames.filter(
		(game) => new Date() < new Date(game.date)
	);
	futureGames.sort((a, b) => a.date - b.date);
	const pastGames = attendedGames.filter(
		(game) => new Date() >= new Date(game.date)
	);
	pastGames.sort((a, b) => b.date - a.date);

	const points = attendedGames.reduce((sum, game) => sum + parseInt(game.point), 0);
	const [filteredGames, setFilteredGames] = useState(attendedGames);
	const [window, setWindow] = useState("Total");
	const [past, setPast] = useState(true);
	const [collapsed, setCollapsed] = useState(false);

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
				<div className="header">
					<h1 style={{ textAlign: "center", fontSize: "60px", color: "rgb(98, 48, 174)" }}>{points} Points</h1>
					<input data-testid="toggle-chart-button" type="checkbox" className="btn-check" id="btn-check-outlined" defaultChecked={collapsed} onClick={() => setCollapsed(!collapsed)} />
					<label className={
						collapsed
							? "chart-toggle-selected"
							: "chart-toggle-unselected"
					} htmlFor="btn-check-outlined">Toggle Chart</label>
					{/* <button type="checkbox" className="btn-check chart-toggle-button" onClick={() => setCollapsed(!collapsed)}>Toggle Chart</button> */}
				</div>
				{collapsed && <div style={{ borderBottom: "2px solid lightgray", padding: "20px" }}>
					<div data-testid="chart">
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
					</div>
				</div>}
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
									className='btn-check custom-button'
									name='btnradio'
									id={option.label}
									autoComplete='off'
									defaultChecked={past == option.val}
									onClick={() => setPast(option.val)}
								/>
								<label
									className={
										option.val === past
											? "past-future-selected"
											: "past-future-unselected "
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
						<AttendedGamesList games={pastGames} />
					) : (
						<AttendedGamesList games={futureGames} />
					)}
				</div>
			</div>)
			: <div>Loading...</div>
	);
};

export default PointsPage;
