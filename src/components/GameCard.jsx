const GameCard = ({ Game }) => {
    return (
        <div className="card" style={{width : "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">{Game.sport}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Northwestern vs {Game.opponent}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{Game.date.toString()} {Game.time}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{Game.location}</h6>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Points {Game.points}</a>
          </div>
        </div>
    )
}

export default GameCard;