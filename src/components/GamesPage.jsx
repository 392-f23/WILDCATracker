import GamesList from "./GamesList";
import "./GamesPage.css";
import NavBar from "./NavBar";

const GamesPage = ({ games }) => {
	return (
		<div className='content'>
			<NavBar />
			<GamesList games={games} />
		</div>
	);
};

export default GamesPage;
