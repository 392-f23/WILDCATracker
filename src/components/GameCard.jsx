import React, { useState } from 'react';
import users_data from '../utilities/users_data';

const addGame = (gameId) => {
    let attendedGames = JSON.parse(localStorage.getItem('games_attended'));
    attendedGames.push(gameId);
    localStorage.setItem('games_attended', JSON.stringify(attendedGames));
}

const removeGame = (gameId) => {
    let attendedGames = JSON.parse(localStorage.getItem('games_attended'));

    if (attendedGames.indexOf(gameId) !== -1) {
        attendedGames.splice(attendedGames.indexOf(gameId), 1);
    }

    localStorage.setItem('games_attended', JSON.stringify(attendedGames));
}

const GameCard = ({ game, gameAdded }) => {
    const [buttonText, setButtonText] = useState(gameAdded ? 'Points Added' : 'Points ' + game.points);
    const [buttonColor, setButtonColor] = useState(gameAdded ? 'btn-success' : 'btn-primary');

    const handleButtonClick = () => {
        if (buttonText === 'Points ' + game.points) {
            setButtonText('Points Added');
            setButtonColor('btn-success');
            addGame(game.id);
            gameAdded = false;
        } else {
            setButtonText('Points ' + game.points);
            setButtonColor('btn-primary');
            removeGame(game.id);
            gameAdded = true;
        }
    };

	return (
		<div className='card m-2 p-2'>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "5px" }}>
                <div>
                    <h5 className='card-title'>{game.sport}</h5>
                    <h6 className='card-subtitle mb-2 text-muted'>
                        Northwestern vs {game.opponent}
                    </h6>
                    <h6 className='card-subtitle mb-2 text-muted'>
                        {new Date(game.date).toDateString()} {game.time}
                    </h6>
                </div>
                <div>
                    <hr></hr>
                    <h6 className='card-subtitle mb-2 text-muted'>{game.location}</h6>
                    <a style={{ width: "100%" }}className={`btn btn-primary btn-block ${buttonColor}`} onClick={handleButtonClick}>
                        {buttonText}
                    </a>
                </div>
        </div>
    </div>
	);
};

export default GameCard;
