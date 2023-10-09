import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { get_date } from "./utilities/get_date";
import { historyLookback } from "./components/PointsPage";

const AttendedGamesChart = ({ games, window }) => {
	const chartRef = useRef(null);

	games = games.map((game) => {
		return {
			...game,
			date: get_date(new Date(game.date)),
		};
	});

	useEffect(() => {
		const context = chartRef.current.getContext("2d");
		const chart = new Chart(context, {
			type: "line",
			data: {
				labels: games.map((game) => game.date),
				datasets: [
					{
						data: games.map((game) => game.points),
						borderColor: "#4E2A84",
						backgroundColor: "#4E2A84",
					},
				],
			},
		});
		return () => chart.destroy();
	}, []);

	return <canvas ref={chartRef}></canvas>;
};

export default AttendedGamesChart;
