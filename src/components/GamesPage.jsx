import GamesList from "./GamesList"

const GamesPage = ({games}) => {
    return (
      <div>
        <GamesList games={games} />
      </div>
    );
  };  

export default GamesPage;