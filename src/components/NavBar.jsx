import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
	const navigate = useNavigate();
	const navigate_to = (path) => {
		navigate(path);
	};

	return (
		<nav>
			<div className='navbar'>
				<span id='navbar-nav'>
					<div
						className='navbar-link'
						aria-current='page'
						href='#'
						onClick={() => navigate_to("/games")}
					>
						Games
					</div>

					<div
						className='navbar-link'
						href='#'
						onClick={() => navigate_to("/points")}
					>
						Points
					</div>

					<div
						className='navbar-link'
						href='#'
						onClick={() => navigate_to("/home")}
					>
						Home
					</div>
					{/* <li class='nav-item'>
							<a
								class='nav-link disabled'
								href='#'
								tabindex='-1'
								aria-disabled='true'
							>
								Signout
							</a>
						</li> */}
				</span>
			</div>
		</nav>
	);
};
export default NavBar;
