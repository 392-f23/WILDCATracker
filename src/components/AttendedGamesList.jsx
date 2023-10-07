import AttendedGameCard from "./AttendedGameCard";
import "./PointsPage.css";

const AttendedGamesList = ({ games }) => {
	return (
		<div className='card custom-card'>
			<ul className='list-group list-group-flush'>
				{Object.entries(games).map(([id, game]) => {
					return <AttendedGameCard key={id} game={game} />;
				})}
			</ul>
		</div>
	);
};

export default AttendedGamesList;
