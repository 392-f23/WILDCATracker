import {useNavigate} from 'react-router-dom';



const NavBar = () => {
	const navigate = useNavigate();
	const navigate_to = (path) => {
		navigate(path);
	};

	return (
		<nav class='navbar navbar-expand-lg navbar-light bg-light'>
			<div class='container-fluid'>
				<button
					class='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span class='navbar-toggler-icon'></span>
				</button>
				<div class='collapse navbar-collapse' id='navbarNav'>
					<ul class='navbar-nav'>
						<li class='nav-item'>
							<a class='nav-link active' aria-current='page' href='#' onClick={() => navigate_to("/games")}>
								Games
							</a>
						</li>
						<li class='nav-item'>
							<a class='nav-link' href='#'>
								Points
							</a>
						</li>
						<li class='nav-item'>
							<a class='nav-link' href='#'>
								Home
							</a>
						</li>
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
					</ul>
				</div>
			</div>
		</nav>
	);
};
export default NavBar;
