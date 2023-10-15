import React, { useContext } from "react";
import "./Login.css";
import { auth, database } from "../utilities/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { LoginContext } from "../utilities/StateProvider";
import { loginActions } from "../utilities/reducer";
import { ref, child, get, set } from "firebase/database";

const Login = () => {
	const [, setLoginState] = useContext(LoginContext);

	const handleUserLogin = (user) => {
		// console.log(user);
		const uid = user.uid;
		const usersRef = child(ref(database), "users");
		get(usersRef)
			.then((snapshot) => {
				if (snapshot.exists() && snapshot.hasChild(uid)) {
					console.log(`User with user_id ${uid} exists in /users.`);
				} else {
					// new user login
					console.log(`User with user_id ${uid} does not exist in /users.`);

					const userData = {
						email: user.email,
						displayName: user.displayName,
						photoURL: user.photoURL,
						attendedGames: [],
						points: 0,
					};

					const newUserRef = ref(database, `users/${uid}`);
					set(newUserRef, userData)
						.then(() => {
							console.log(`User with user_id ${uid} added to db`);
						})
						.catch((err) => {
							console.error("Error adding user data: ", err);
						});
				}
			})
			.catch((error) => {
				console.error("Error checking for user:", error);
			});
	};

	const signIn = () => {
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((result) => {
				setLoginState({
					type: loginActions.set_user,
					user: result.user,
				});
				console.log("User logged in successfuly!");
				localStorage.setItem("user", JSON.stringify(result.user));
				handleUserLogin(result.user);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className='login'>
			<div className='login-logo'>
				<img src='https://upload.wikimedia.org/wikipedia/commons/d/d4/Northwestern_wildcats_CMKY_80_100_0_0.svg' />
				<h1> WildcaTracker </h1>
				<button type='submit' onClick={signIn}>
					{" "}
					Sign In{" "}
				</button>
			</div>
		</div>
	);
};

export default Login;
