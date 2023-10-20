import { useDbData, useDbUpdate } from "./firebase.js";
import { ref, get, set } from "firebase/database";
import { database } from "./firebase.js";

export const updatePoints = async () => {
	const sport2points = {
		WBB: 5,
		MBB: 3,
		FB: 3,
	};

	const eventsRef = ref(database, `events`);

	get(eventsRef)
		.then((snapshot) => {
			if (snapshot.exists()) {
				const eventsData = snapshot.val();
				Object.entries(eventsData).map(([key, value]) => {
					let eventKey = value.eventKey;
					let newPoints = 4;
					if (eventKey in sport2points) {
						newPoints = sport2points[eventKey];
					}
					console.log(eventKey, newPoints);

					const eventRef = ref(database, `events/${key}/point`);
					set(eventRef, newPoints);
				});
			}
		})
		.catch((error) => {
			console.error("Error getting events data:", error);
		});
};

updatePoints();
