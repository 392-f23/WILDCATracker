import React from "react";
import "./Login.css";
import { auth } from "../utilities/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import { LoginContext } from "../utilities/StateProvider";
import { loginActions } from "../utilities/reducer";

const Login = () => {
	const [, setLoginState] = useContext(LoginContext);

	const signIn = () => {
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((result) => {
				setLoginState({
					type: loginActions.set_user,
					user: result.user,
				});
				console.log("User logged in successfuly!");
				//
				//set (ref(), result.user.id, games_attende: [])
				localStorage.setItem("user", JSON.stringify(result.user));
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
