import React, { useState, useEffect, useContext } from "react";
import { Dropdown } from "react-bootstrap";
import GameCard from "./GameCard";
import "./GamesList.css";
import { useDbData } from "../utilities/firebase";
import { LoginContext } from "../utilities/StateProvider";
import { useProfile } from "../utilities/profile";

const GamesList = ({ games }) => {
	const [profile, profileLoading, profileError] = useProfile();
	const [user, error] = useDbData(`/users/${profile?.user?.uid}`);
	console.log(user)
	const attendedGames = !!user ? user?.["games-attended"] : [];

	const [filteredGames, setFilteredGames] = useState(games);

	const [sportFilter, setSportFilter] = useState("Sport");
	const [genderFilter, setGenderFilter] = useState("Gender");
	const [timeFilter, setTimeFilter] = useState("Time");

	const sportToAbbrev = {
		"Soccer": ["WSOC", "MSOC"],
		"Football": ["FB"],
		"Hockey": ["FHOCKEY"],
		"Volleyball": ["WVB"],
		"Swimming": ["MSWIM"],
		"Basketball": ["MBB", "WBB"]
	};

	useEffect(() => {
		handleCombinedFilter();
	}, [sportFilter, genderFilter, timeFilter]);

	const handleCombinedFilter = () => {
		let filtered = { ...games };

		if (sportFilter !== "Sport" && sportFilter !== "Show All") {
			const sportAbbreviations = sportToAbbrev[sportFilter];

			if (sportAbbreviations) {
				filtered = Object.fromEntries(
					Object.entries(filtered).filter(([key, game]) => {
						return sportAbbreviations.some(abbrev => game.eventKey.includes(abbrev));
					})
				);
			}
		}

		const newFiltered = Object.fromEntries(
			Object.entries(filtered).filter(([key, game]) => {
				if (genderFilter === "Gender") return true;
				if (genderFilter === "Men" && game.eventKey === "FB") return true;
        		if (genderFilter === "Men" && game.eventKey === "FHOCKEY") return true;
				const matches = game.eventKey && game.eventKey[0] === genderFilter[0];
				if (!matches) {
				}
				return matches;
			})
		);

		filtered = newFiltered;

		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);

		if (timeFilter !== "Time" && timeFilter !== "Show All") {
			if (timeFilter === "Today") {
				filtered = Object.fromEntries(
					Object.entries(filtered).filter(([key, game]) => {
						const gameDate = new Date(game.date);
						gameDate.setHours(0, 0, 0, 0);
						return gameDate.getTime() === currentDate.getTime();
					})
				);
			} else if (timeFilter === "Future") {
				filtered = Object.fromEntries(
					Object.entries(filtered).filter(([key, game]) =>
						new Date(game.date).getTime() > currentDate.getTime()
					)
				);
			} else if (timeFilter === "Past") {
				filtered = Object.fromEntries(
					Object.entries(filtered).filter(([key, game]) =>
						new Date(game.date).getTime() < currentDate.getTime()
					)
				);
			}
		}


		setFilteredGames(filtered);
	};

	const handleSportFilterChange = (sport) => {
		if (sport === "Show All") {
			setSportFilter("Sport");
		} else {
			setSportFilter(sport === "Field Hockey" ? "Hockey" : sport);
		}
	};

	const handleGenderFilterChange = (gender) => {
		if (gender === "Show All") {
			setGenderFilter("Gender");
		} else {
			setGenderFilter(gender);
		}
	};

	const handleTimeFilterChange = (filterType) => {
		setTimeFilter(filterType);
	};
	
	return !!user ? (
		<>
			<div className='dropdown-wrapper'>
				<Dropdown>
					<Dropdown.Menu>
						<Dropdown.Item onClick={() => handleSportFilterChange("Show All")}>
							Show All
						</Dropdown.Item>
						<Dropdown.Divider></Dropdown.Divider>
						<Dropdown.Item onClick={() => handleSportFilterChange("Football")}>
							Football
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() => handleSportFilterChange("Volleyball")}
						>
							Volleyball
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleSportFilterChange("Soccer")}>
							Soccer
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() => handleSportFilterChange("Field Hockey")}
						>
							Field Hockey
						</Dropdown.Item>
						<Dropdown.Item
							onClick={() => handleSportFilterChange("Basketball")}
						>
							Basketball
						</Dropdown.Item>
					</Dropdown.Menu>
					<Dropdown.Toggle id='filter-dropdown'>{sportFilter}</Dropdown.Toggle>
				</Dropdown>

				<Dropdown>
					<Dropdown.Toggle id='filter-dropdown'>{genderFilter}</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => handleGenderFilterChange("Show All")}>
							Show All
						</Dropdown.Item>
						<Dropdown.Divider></Dropdown.Divider>
						<Dropdown.Item onClick={() => handleGenderFilterChange("Men")}>
							Men
						</Dropdown.Item>
						<Dropdown.Item data-testid="women-dropdown-item" onClick={() => handleGenderFilterChange("Women")}>
							Women
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<Dropdown>
					<Dropdown.Toggle id='filter-dropdown'>{timeFilter}</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => handleTimeFilterChange("Show All")}>
							Show All
						</Dropdown.Item>
						<Dropdown.Divider></Dropdown.Divider>
						<Dropdown.Item onClick={() => handleTimeFilterChange("Past")}>
							Past
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleTimeFilterChange("Today")}>
							Today
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleTimeFilterChange("Future")}>
							Future
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>

			<div className='games-list'>
				{Object.entries(filteredGames).map(([id, game]) =>
					attendedGames?.includes(id) ? (
						<GameCard key={id} id={id} game={game} gameAdded={true} user={user} data-testid="game-card"/>
					) : (
						<GameCard key={id} id={id} game={game} gameAdded={false} user={user} data-testid="game-card" />
					)
				)}
			</div>
			{/* <div className='games-list'>
				{games && Object.entries(games).map(([id, game]) => <GameCard key={id} id={id} game={game} />)}
			</div> */}
		</>
	) : (
		<p>Loading..</p>
	);
};

export default GamesList;
