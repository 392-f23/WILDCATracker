import "./PointsPage.css";
import { get_date } from "../utilities/get_date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageMapping = (category) => {
	if (category === "Women’s Soccer" || category === "Men’s Soccer")
		return "futbol";
	else if (category === "Men’s Football") return "football";
	else if (category === "Women’s Volleyball") return "volleyball";
	else if (category === "Women’s Field Hockey") return "hockey-puck";
	else if (category === "Men’s Basketball" || category === "Women’s Basketball")
		return "basketball";
	else if (category === "Men’s Baseball" || category === "Women’s Softball")
		return "baseball";
	else if (category === "Men’s Wrestling" || category === "Women’s Softball")
		return "dumbbell";
	else return "medal";
};

const AttendedGameCard = ({ game }) => {
	const date = new Date(game.date);
	return (
		<li id={game.id} className='custom-list'>
			<div className='card-subgroup'>
				<FontAwesomeIcon icon={`${ImageMapping(game.sport)}`} />
				<h5
					className='card-title'
					style={{ marginLeft: "5px", marginRight: "5px" }}
				>
					{game.sport}
				</h5>
				<h6 className='card-subtitle  text-muted custom-date'>
					{get_date(new Date(game.date))}
				</h6>
			</div>
			<h6 className='card-subtitle mb-1 text-muted'>+ {game.points}</h6>
		</li>
	);
};

export default AttendedGameCard;
