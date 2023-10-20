import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { get_date } from "./utilities/get_date";
import { historyLookback } from "./components/PointsPage";

const formatDateToMDY = (date) => {
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();

	return `${month}/${day}/${year}`;
};

const generateEquallySpreadDates = (startDate, endDate, n) => {
	const dateList = [];
	const interval = (endDate - startDate) / (n - 1);

	for (let i = 0; i < n; i++) {
		const newDate = new Date(startDate.getTime() + interval * i);
		dateList.push(newDate);
	}
	return dateList;
};

const getFirstDate = (games, window) => {
	if (games.length > 0) {
		window == "Total"
			? new Date(
				games.reduce((a, b) =>
					new Date(a.date) < new Date(b.date) ? a : b
				).date
			)
			: historyLookback[window];
		if (window === "Total") {
			const date = new Date(
				games.reduce((a, b) => (new Date(a.date) < new Date(b.date) ? a : b)).date
			);
			return new Date(date.setDate(date.getDate() - 1));
		}
	}

	return historyLookback[window];
};

const AttendedGamesChart = ({ games, window }) => {
	const chartRef = useRef(null);

	games = games.map((game) => {
		return {
			...game,
			date: get_date(new Date(game.date)),
		};
	});

	const firstDate = getFirstDate(games, window);

	const dateLabels = generateEquallySpreadDates(firstDate, new Date(), 7);
	const points = [
		games
			.filter((game) => new Date(game.date) <= firstDate)
			.reduce((sum, game) => sum + parseInt(game.point), 0),
	];
	var lastPoints = points[0];
	for (let i = 1; i < dateLabels.length; i++) {
		const filtered = games.filter(
			(game) =>
				dateLabels[i - 1] < new Date(game.date) &&
				new Date(game.date) <= dateLabels[i]
		)
		const newPoints = filtered.length > 0 ? filtered.reduce((sum, game) => sum + parseInt(game.point), lastPoints) : lastPoints;
		lastPoints = newPoints;
		points.push(newPoints);
	}
	useEffect(() => {
		const context = chartRef.current.getContext("2d");
		const chart = new Chart(context, {
			type: "line",
			data: {
				labels: dateLabels.map((date) => formatDateToMDY(date)),
				datasets: [
					{
						data: points,
						borderColor: "#4E2A84",
						backgroundColor: "#4E2A84",
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
				plugins: {
					legend: {
						display: false, // Hide the legend
					},
				},
			},
		});
		return () => chart.destroy();
	}, [window]);

	return <canvas ref={chartRef}></canvas>;
};

export default AttendedGamesChart;
