import PointsPageGames from "./PointsPageGames";

const PointsPage = ({games}) => {
    return(
        <div className= "m-3">
            <PointsPageGames games = {games}/>
        </div>
    );
};

export default PointsPage;