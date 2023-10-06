import GameCard from './GameCard';
import './GamesList.css';

const GamesList = ({games}) => {
  return( 
  <div className="games-list">  
  {
    Object.entries(games).map(([id, game]) => {
      return( <GameCard game = {game} />)})
  }
  </div>
)
};

export default GamesList;