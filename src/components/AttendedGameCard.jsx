import './PointsPage.css'
import { get_date } from '../utilities/get_date';

const AttendedGameCard = ({ game }) => {
    const date = new Date(game.date);
    return (
        <li className="list-group-item custom-list">
            <div className="card-subgroup">
                <h5 className="card-title" style={{ marginRight: "5px" }}>{game.sport}</h5>
                <h6 className="card-subtitle  text-muted custom-date" >{get_date(date)}</h6>
            </div>
            <h6 className="card-subtitle mb-1 text-muted" >+ {game.points}</h6>
        </li>)
    // <div className="card custom-card">
    //     <div className="card-body">
    //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    //             <h5 className="card-title">{game.sport}</h5>
    //             <h6 className="card-subtitle mb-2 text-muted" >+ {game.points}</h6>

    //         </div>

    //     </div>
    // </div>

}

export default AttendedGameCard;