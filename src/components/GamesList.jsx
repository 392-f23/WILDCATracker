import React, { useState, useEffect } from "react";
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

	useEffect(() => {
        handleCombinedFilter();
    }, [sportFilter, genderFilter, timeFilter]);

    const handleCombinedFilter = () => {
        let filtered = [...games];

        if (sportFilter !== "Sport" && sportFilter !== "Show All") {
            filtered = filtered.filter(game => 
                game.sport.includes(sportFilter === "Hockey" ? "Field Hockey" : sportFilter));
        }

        if (genderFilter !== "Gender" && genderFilter !== "Show All") {
            filtered = filtered.filter(game => game.sport.includes(genderFilter));
        }

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (timeFilter !== "Time" && timeFilter !== "Show All") {
            if (timeFilter === "Today") {
                filtered = filtered.filter(game => {
                    const gameDate = new Date(game.date);
                    gameDate.setHours(0, 0, 0, 0);
                    return gameDate.getTime() === currentDate.getTime();
                });
            } else if (timeFilter === "Future") {
                filtered = filtered.filter(game => new Date(game.date).getTime() > currentDate.getTime());
            } else if (timeFilter === "Past") {
                filtered = filtered.filter(game => new Date(game.date).getTime() < currentDate.getTime());
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
	
	
	return (
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
						<Dropdown.Item onClick={() => handleSportFilterChange("Volleyball")}>
							Volleyball
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleSportFilterChange("Soccer")}>
							Soccer
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleSportFilterChange("Field Hockey")}>
							Hockey
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
						<Dropdown.Item onClick={() => handleGenderFilterChange("Women")}>
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
