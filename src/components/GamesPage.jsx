import GamesList from "./GamesList";
import "./GamesPage.css";
import NavBar from "./NavBar";

const GamesPage = ({games}) => {

	console.log(games);

	//console.log(!!error, error);
	//console.log(games);
	return (!(!!games[1]) ?
		<div className='content'>
			<NavBar />
			<GamesList games={games[0]} />
		</div>  :
		<p>{games[1]}</p>
	);
};

export default GamesPage;
