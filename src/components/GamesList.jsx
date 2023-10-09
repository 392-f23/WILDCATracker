import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import GameCard from "./GameCard";
import users_data from "../utilities/users_data";
import "./GamesList.css";

const GamesList = ({ games }) => {
	if (!localStorage.getItem("games_attended")) {
		localStorage.setItem(
			"games_attended",
			JSON.stringify(users_data[0].attended_games)
		);
	}
	
	const attendedGames = JSON.parse(localStorage.getItem("games_attended"));

	const [filteredGames, setFilteredGames] = useState(games);

	const [sportFilter, setSportFilter] = useState("Sport");
	const [genderFilter, setGenderFilter] = useState("Gender");
	const [timeFilter, setTimeFilter] = useState("Time");

	const handleFilter = (sport) => {
		if (sport === "all") {
			setFilteredGames(games);
			setSportFilter("Sport");
		} else {
			const filtered = Object.entries(games).filter(([id, game]) =>
				game.sport.includes(sport)
			);
			setFilteredGames(Object.fromEntries(filtered));
			setSportFilter(sport === "Field Hockey" ? "Hockey" : sport);
		}
	};

	const handleFilterGender = (gender) => {
		if (gender === "all") {
			setFilteredGames(games);
			setGenderFilter("Gender");
		} else {
			const filtered = Object.entries(games).filter(([id, game]) =>
				game.sport.includes(gender)
			);
			setFilteredGames(Object.fromEntries(filtered));
			setGenderFilter(gender);
		}
	};

	const handleFilterTime = (time) => {
		if (time === "all") {
			setFilteredGames(games);
			setTimeFilter("Time");
		} else {
			const filtered = Object.entries(time).filter(([id, game]) =>
				game.sport.includes(time)
			);
			setFilteredGames(Object.fromEntries(filtered));
			setTimeFilter(time);
		}
	};

	return (
		<>
			<div className='dropdown-wrapper'>
				<Dropdown>
					<Dropdown.Menu>
						<Dropdown.Item onClick={() => handleFilter("all")}>
							Show All
						</Dropdown.Item>
						<Dropdown.Divider></Dropdown.Divider>
						<Dropdown.Item onClick={() => handleFilter("Football")}>
							Football
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleFilter("Volleyball")}>
							Volleyball
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleFilter("Soccer")}>
							Soccer
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleFilter("Field Hockey")}>
							Hockey
						</Dropdown.Item>
					</Dropdown.Menu>
					<Dropdown.Toggle id='filter-dropdown'>{sportFilter}</Dropdown.Toggle>
				</Dropdown>

				<Dropdown>
					<Dropdown.Toggle id='filter-dropdown'>{genderFilter}</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => handleFilterGender("all")}>
							Show All
						</Dropdown.Item>
						<Dropdown.Divider></Dropdown.Divider>
						<Dropdown.Item onClick={() => handleFilterGender("Men")}>
							Men
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleFilterGender("Women")}>
							Women
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>

				<Dropdown>
					<Dropdown.Toggle id='filter-dropdown'>{timeFilter}</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item onClick={() => handleFilterTime("all")}>
							Show All
						</Dropdown.Item>
						<Dropdown.Divider></Dropdown.Divider>
						<Dropdown.Item onClick={() => handleFilterTime("")}>
							Future
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleFilterTime("")}>
							Past
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>

			<div className='games-list'>
				{Object.entries(filteredGames).map(([id, game]) =>
					attendedGames.includes(game.id) ? (
						<GameCard key={id} game={game} gameAdded={true} />
					) : (
						<GameCard key={id} game={game} gameAdded={false} />
					)
				)}
			</div>
		</>
	);
};

export default GamesList;
