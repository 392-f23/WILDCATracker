import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ImageMapping = ({game}) => {
    const category = game.sport;
    if(category === "Women’s Soccer" || category === "Men’s Soccer")
        return "futbol";
    else if(category === "Men's Football")
        return "football";
    else if(category === "Women’s Volleyball")
        return "volleyball";
    else if(category === "Women’s Field Hockey")
        return "hockey-puck";
    else if(category === "Men's Basketball" || category === "Women's Basketball" )
        return "basketball";
    else if(category === "Men's Baseball" || category === "Women's Softball" )
        return "baseball";
    else return "medal";
};

const PointsPageGames = ({games}) => {
    return(
        <div className="card m-1">
            <ul className="list-group list-group-flush">
                {
                    Object.entries(games).map(([id, game]) => {
                        var sport = game.sport;
                        var points = game.points;
                        console.log(points)
                        var icon_name = ImageMapping(game={game});
                        console.log(icon_name)
                        return( 
                            <li className="list-group-item">
                                <FontAwesomeIcon icon={`${icon_name}`}/>
                                &nbsp; {sport} +{points}
                            </li>)
                 }) 
             }
            </ul>
        </div>
    );
};

export default PointsPageGames;