import "./PointsPage.css";
import { get_date } from "../utilities/get_date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const abbrevDict = {
	SOC: "Soccer",
	VB: "Volleyball",
	FB: "Men's Football",
	FHOCKEY: "Men's Field Hockey",
	BB: "Basketball",
	SWIM: "Swim",
	FENC: "Fencing",
};

const getGameTitle = (abbrev) => {
	let result = "";
	if (abbrev[0] !== "F") {
		const gender = abbrev[0];
		if (gender === "M") {
			result += "Men's ";
		} else {
			result += "Women's ";
		}
		result += abbrevDict[abbrev.substring(1)];
	} else {
		result += abbrevDict[abbrev];
	}
	return result;
};

const AttendedGameCard = ({ game }) => {
	return (
		<li id={game.id} className='custom-list'>
			<div className='card-subgroup'>
				<span>
					<img
						src={
							game.imgURL
								? game.imgURL
								: "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/nusports.com/images/logos/Northwestern_university.png"
						}
						width='40px'
						height='40px'
						style={{ position: "relative", bottom: "5px" }}
					></img>
				</span>
				<h5
					className='card-title'
					style={{ marginLeft: "5px", marginRight: "5px" }}
				>
					{getGameTitle(game.eventKey)}
				</h5>
				<h6 className='card-subtitle  text-muted custom-date'>
					{get_date(new Date(game.date))}
				</h6>
			</div>
			<h6 className='card-subtitle mb-1 text-muted'>+ {game.point}</h6>
		</li>
	);
};

export default AttendedGameCard;
