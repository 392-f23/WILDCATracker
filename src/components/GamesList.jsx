import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import GameCard from "./GameCard";
import users_data from '../utilities/users_data';
import "./GamesList.css";

const GamesList = ({ games }) => {
    const [filteredGames, setFilteredGames] = useState(games);

    const handleFilter = (sport) => {
        if (sport === 'all') {
            setFilteredGames(games);
        } else {
			const filtered = Object.entries(games).filter(([id, game]) => game.sport.includes(sport));
            setFilteredGames(Object.fromEntries(filtered));
        }
    };

	const handleFilterGender = (sport) => {
        if (sport === 'all') {
            setFilteredGames(games);
        } else {
			const filtered = Object.entries(games).filter(([id, game]) => game.sport.includes(sport));
            setFilteredGames(Object.fromEntries(filtered));
        }
    };

	const handleFilterTime = (sport) => {
        if (sport === 'all') {
            setFilteredGames(games);
        } else {
			const filtered = Object.entries(games).filter(([id, game]) => game.sport.includes(sport));
            setFilteredGames(Object.fromEntries(filtered));
        }
    };

    return (
        <>
		<div style={{display: "flex", justifyContent: "space-between"}}>
			<Dropdown>
        	        <Dropdown.Toggle variant="success" id="dropdown-basic">
        	            Sport
        	        </Dropdown.Toggle>

        	        <Dropdown.Menu>
						<Dropdown.Item onClick={() => handleFilter('all')}>Show All</Dropdown.Item>
        	            <Dropdown.Item onClick={() => handleFilter('Football')}>Football</Dropdown.Item>
        	            <Dropdown.Item onClick={() => handleFilter('Volleyball')}>Volleyball</Dropdown.Item>
        	            <Dropdown.Item onClick={() => handleFilter('Soccer')}>Soccer</Dropdown.Item>
        	            <Dropdown.Item onClick={() => handleFilter('Field Hockey')}>Field Hockey</Dropdown.Item>
        	        </Dropdown.Menu>
        	    </Dropdown>

				<Dropdown>
        	        <Dropdown.Toggle variant="success" id="dropdown-basic">
        	            Gender
        	        </Dropdown.Toggle>

        	        <Dropdown.Menu>
						<Dropdown.Item onClick={() => handleFilterGender('all')}>Show All</Dropdown.Item>
        	            <Dropdown.Item onClick={() => handleFilterGender('Men')}>Men</Dropdown.Item>
        	            <Dropdown.Item onClick={() => handleFilterGender('Women')}>Women</Dropdown.Item>
        	        </Dropdown.Menu>
        	    </Dropdown>

				<Dropdown>
        	        <Dropdown.Toggle variant="success" id="dropdown-basic">
        	            Time
        	        </Dropdown.Toggle>

        	        <Dropdown.Menu>
						<Dropdown.Item onClick={() => handleFilterTime('all')}>Show All</Dropdown.Item>
        	            <Dropdown.Item onClick={() => handleFilterTime('')}>Future</Dropdown.Item>
        	            <Dropdown.Item onClick={() => handleFilterTime('')}>Past</Dropdown.Item>
        	        </Dropdown.Menu>
        	    </Dropdown>
		</div>
            
            <div className='games-list'>
                {Object.entries(filteredGames).map(([id, game]) => (
                    users_data[0].attended_games.includes(game.id) ? 
						<GameCard key={id} game={game} gameAdded={true}/> :
						<GameCard key={id} game={game} gameAdded={false}/> 
                ))}
            </div>
        </>
    );
};

export default GamesList;
