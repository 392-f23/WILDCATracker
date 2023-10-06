import NavBar from "./NavBar";
import attendedGames from "../utilities/dummyAttendedGames";
import AttendedGamesList from "./AttendedGamesList";
import AttendedGamesChart from "../AttendedGamesChart";
import { useState } from 'react';
import "./PointsPage.css";

const historyWindows = ['Total', 'Week', 'Month'];

const today = new Date();
export const historyLookback = {
    "Total": new Date(0),
    "Week": new Date(today).setDate(today.getDate() - 7),
    "Month": new Date(today).setDate(today.getDate() - 30),
}

const PointsPage = () => {
    const points = attendedGames.reduce((sum, game) => sum + game.points, 0);
    const [filteredGames, setFilteredGames] = useState(attendedGames);
    const [window, setWindow] = useState('Total');

    const filterGames = (filter) => {
        setWindow(filter);
        setFilteredGames(attendedGames.filter((game) => new Date(game.date) > historyLookback[filter]));
    }
    return (
        <div className="content">
            <NavBar></NavBar>
            <h1 style={{ textAlign: "center" }}>{points} Points</h1>
            <div className="button-group" style={{ display: "flex", alignItems: "center" }}>
                {historyWindows.map((option) => {
                    return (
                        <div key={option} style={{ margin: "auto" }}>
                            <input type="radio" className="btn-check" name="btnradio" id={option}
                                autoComplete="off" defaultChecked={window == option} onClick={() => filterGames(option)}
                            />
                            <label className="btn btn-outline-primary custom-button" htmlFor={option}>{option}</label>
                        </div>
                    )
                })}
            </div>
            <AttendedGamesChart games={filteredGames} window={window} />
            <AttendedGamesList games={filteredGames} />
        </div>
    )
}

export default PointsPage;