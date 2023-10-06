import { useNavigate } from 'react-router-dom';



const NavBar = () => {
	const navigate = useNavigate();
	const navigate_to = (path) => {
		navigate(path);
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<a className='nav-link active' aria-current='page' href='#' onClick={() => navigate_to("/games")}>
								Games
							</a>
						</li>
						<li className='nav-item'>
							<a className='nav-link' href='#' onClick={() => navigate_to("/points")}>
								Points
							</a>
						</li>
						<li className='nav-item'>
							<a className='nav-link' href='#' onClick={() => navigate_to("/home")}>
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
