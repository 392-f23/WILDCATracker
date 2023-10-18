import GamesList from "./GamesList";
import "./GamesPage.css";
import NavBar from "./NavBar";
import { useDbData } from "../utilities/firebase";

const GamesPage = () => {
	const [data, error] = useDbData("/events/");
	//console.log(data);

	return !!!error ? (
		!!!data ? (
			<p> loading </p>
		) : (
			<div className='content'>
				<NavBar />
				<GamesList games={data} />
			</div>
		)
	) : (
		<p>{error}</p>
	);
};

export default GamesPage;
