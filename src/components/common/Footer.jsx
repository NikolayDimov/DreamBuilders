import { Link } from 'react-router-dom';

export default function Footer() {


    return (
        <>
            <div className="footer container-fluid position-relative bg-dark bg-light-radial text-white-50 py-6 px-5">
                <div className="row g-5">
                    <div className="col-lg-6 pe-lg-5">
                        <Link to="/" className="navbar-brand">
                            <h1 className="m-0 display-4 text-uppercase text-white">
                                <i className="bi bi-building text-primary me-2" />
                                Dream Build
                            </h1>
                        </Link>
                        <p>
                            Aliquyam sed elitr elitr erat sed diam ipsum eirmod eos lorem nonumy.
                            Tempor sea ipsum diam sed clita dolore eos dolores magna erat dolore
                            sed stet justo et dolor.
                        </p>
                        <p>
                            <i className="fa fa-map-marker-alt me-2" />
                            123 Street, New York, USA
                        </p>
                        <p>
                            <i className="fa fa-phone-alt me-2" />
                            +012 345 67890
                        </p>
                        <p>
                            <i className="fa fa-envelope me-2" />
                            info@example.com
                        </p>
                        <div className="d-flex justify-content-start mt-4">
                            <a
                                className="btn btn-lg btn-primary btn-lg-square rounded-0 me-2"
                                href="#"
                            >
                                <i className="fab fa-twitter" />
                            </a>
                            <a
                                className="btn btn-lg btn-primary btn-lg-square rounded-0 me-2"
                                href="#"
                            >
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a
                                className="btn btn-lg btn-primary btn-lg-square rounded-0 me-2"
                                href="#"
                            >
                                <i className="fab fa-linkedin-in" />
                            </a>
                            <a
                                className="btn btn-lg btn-primary btn-lg-square rounded-0"
                                href="#"
                            >
                                <i className="fab fa-instagram" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-6 ps-lg-5">
                        <div className="row g-5">
                            <div className="col-sm-6">
                                <h4 className="text-white text-uppercase mb-4">Quick Links</h4>
                                <div className="d-flex flex-column justify-content-start">

                                    <Link to="/" className="text-white-50 mb-2">
                                        <i className="fa fa-angle-right me-2" />
                                        Home
                                    </Link>
                                    <Link to="/about" className="text-white-50 mb-2">
                                        <i className="fa fa-angle-right me-2" />
                                        About Us
                                    </Link>
                                    <Link to="/service" className="text-white-50 mb-2">
                                        <i className="fa fa-angle-right me-2" />
                                        Our Service
                                    </Link>

                                    <Link to="/catalog" className="text-white-50 mb-2">
                                        <i className="fa fa-angle-right me-2" />
                                        Catalog
                                    </Link>
                                    <Link to="/contacts" className="text-white-50 mb-2">
                                        <i className="fa fa-angle-right me-2" />
                                        Contact Us
                                    </Link>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark bg-light-radial text-white border-top border-primary px-0">
                <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="py-4 px-5 text-center text-md-start">
                        <p className="mb-0">
                            ©{" "}
                            <a className="text-primary" href="#">
                                Dream Builders
                            </a>
                            . All Rights Reserved.
                        </p>
                    </div>
                    <div className="py-4 px-5 bg-primary footer-shape position-relative text-center text-md-end">
                        <p className="mb-0">
                            Designed by{" "}
                            <a className="text-dark" href="https://htmlcodex.com">
                                Dimov
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}