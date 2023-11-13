import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';



export default function FontHomepage() {
    const { isLoggedIn } = useAuth();

    return (
        <div className="container-fluid p-0">
            <div
                id="header-carousel"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div className="p-3" style={{ maxWidth: 900 }}>
                                <i className="fa fa-home fa-4x text-primary mb-4 d-none d-sm-block" />
                                <h1 className="display-2 text-uppercase text-white mb-md-4">
                                    Build Your Dream House With Us
                                </h1>
                                
                                {isLoggedIn 
                                    ? ''
                                    : <Link to="/register" className="btn btn-primary py-md-3 px-md-5 mt-2">Register</Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div className="p-3" style={{ maxWidth: 900 }}>
                                <i className="fa fa-tools fa-4x text-primary mb-4 d-none d-sm-block" />
                                <h1 className="display-2 text-uppercase text-white mb-md-4">
                                    We Are Trusted For Your Project
                                </h1>
                                <a href="" className="btn btn-primary py-md-3 px-md-5 mt-2">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#header-carousel"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#header-carousel"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}