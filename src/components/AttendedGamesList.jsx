import AttendedGameCard from "./AttendedGameCard";
import "./AttendedGameList.css";

const AttendedGamesList = ({ games }) => {
	return (
		<div className='attended-game-card'>
			<ul className='list-group list-group-flush'>
				{Object.entries(games).map(([id, game]) => {
					return <AttendedGameCard key={id} game={game} />;
				})}
			</ul>
		</div>
	);
};

export default AttendedGamesList;
