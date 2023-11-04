import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';


export default function Navbar() {
	const { user } = useAuth();
	const { isLoggedIn } = useAuth();


	return (
		<div className="container-fluid sticky-top bg-dark bg-light-radial shadow-sm px-5 pe-lg-0">

			<nav className="navbar navbar-expand-lg bg-dark bg-light-radial navbar-dark py-3 py-lg-0">
				<Link to="/" className="navbar-brand">
					<h1 className="m-0 display-4 text-uppercase text-white">
						<i className="bi bi-building text-primary me-2" />WEBUILD
					</h1>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarCollapse"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarCollapse">
					<div className="navbar-nav ms-auto py-0">
						<Link to="/" className="nav-item nav-link active">
							Home
						</Link>
						<Link to="/about" className="nav-item nav-link">
							About
						</Link>
						<Link to="/service" className="nav-item nav-link">
							Service
						</Link>
						<div className="nav-item dropdown">
							<a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
								Our Offers
							</a>
							<div className="dropdown-menu m-0">
								<Link to="/catalog" className="dropdown-item">
									Catalog
								</Link>
								<Link to="/offer-details" className="dropdown-item">
									Offer Details
								</Link>
							</div>
						</div>
						<Link to="/contacts" className="nav-item nav-link">
							Contact
						</Link>

						{isLoggedIn &&
							<Link to="/myProjects" className="nav-item nav-link bg-primary text-white ms-3 d-none d-lg-block">
								{(user.email.split('@'))[0]} &apos;s Projects<i className="bi bi-arrow-right" />
							</Link>
						}

						{!isLoggedIn &&
							<Link to="/login" className="nav-item nav-link bg-primary text-white px-5 ms-3 d-none d-lg-block">
								Login <i className="bi bi-arrow-right" />
							</Link>
						}

						{/* <Link to="/login1" className="nav-item nav-link bg-primary text-white px-5 ms-3 d-none d-lg-block">
							Login <i className="bi bi-arrow-right" />
						</Link> */}

					</div>
				</div>
			</nav>
		</div>
	);
}