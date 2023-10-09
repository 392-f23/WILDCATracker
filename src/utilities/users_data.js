const users_data = [
	{
		user_id: 1,
		user_name: "guest",
		email: "guestemail@gmail.com",
		password: "guestpassword",
		attended_games: [1, 3, 7, 14, 19], //using a set here can imporve the search process
	},
	{
		user_id: 2,
		user_name: "test",
		email: "testemail@gmail.com",
		password: "testpassword",
		attended_games: [2, 4, 13, 23],
	},
];

export default users_data;
