import React, { useState } from 'react';

const GameCard = ({ game }) => {
    const [buttonText, setButtonText] = useState('Points ' + game.points);
    const [buttonColor, setButtonColor] = useState('btn-primary');

    const handleButtonClick = () => {
        if (buttonText === 'Points ' + game.points) {
            setButtonText('Points Added');
            setButtonColor('btn-success');
        } else {
            setButtonText('Points ' + game.points);
            setButtonColor('btn-primary');
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
