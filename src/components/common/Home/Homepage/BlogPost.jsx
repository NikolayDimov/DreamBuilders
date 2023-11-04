export default function BlogPost() {
    return (
        <div className="container-fluid py-6 px-5">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: 600 }}>
                <h1 className="display-5 text-uppercase mb-4">
                    Latest <span className="text-primary">Articles</span> From Our Blog Post
                </h1>
            </div>
            <div className="row g-5">
                <div className="col-lg-4 col-md-6">
                    <div className="bg-light">
                        <img className="img-fluid" src="img/blog-1.jpg" alt="" />
                        <div className="p-4">
                            <div className="d-flex justify-content-between mb-4">
                                <div className="d-flex align-items-center">
                                    <img
                                        className="rounded-circle me-2"
                                        src="img/user.jpg"
                                        width={35}
                                        height={35}
                                        alt=""
                                    />
                                    <span>John Doe</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="ms-3">
                                        <i className="far fa-calendar-alt text-primary me-2" />
                                        01 Jan, 2045
                                    </span>
                                </div>
                            </div>
                            <h4 className="text-uppercase mb-3">
                                Rebum diam clita lorem erat magna est erat
                            </h4>
                            <a className="text-uppercase fw-bold" href="">
                                Read More <i className="bi bi-arrow-right" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="bg-light">
                        <img className="img-fluid" src="img/blog-2.jpg" alt="" />
                        <div className="p-4">
                            <div className="d-flex justify-content-between mb-4">
                                <div className="d-flex align-items-center">
                                    <img
                                        className="rounded-circle me-2"
                                        src="img/user.jpg"
                                        width={35}
                                        height={35}
                                        alt=""
                                    />
                                    <span>John Doe</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="ms-3">
                                        <i className="far fa-calendar-alt text-primary me-2" />
                                        01 Jan, 2045
                                    </span>
                                </div>
                            </div>
                            <h4 className="text-uppercase mb-3">
                                Rebum diam clita lorem erat magna est erat
                            </h4>
                            <a className="text-uppercase fw-bold" href="">
                                Read More <i className="bi bi-arrow-right" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="bg-light">
                        <img className="img-fluid" src="img/blog-3.jpg" alt="" />
                        <div className="p-4">
                            <div className="d-flex justify-content-between mb-4">
                                <div className="d-flex align-items-center">
                                    <img
                                        className="rounded-circle me-2"
                                        src="img/user.jpg"
                                        width={35}
                                        height={35}
                                        alt=""
                                    />
                                    <span>John Doe</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="ms-3">
                                        <i className="far fa-calendar-alt text-primary me-2" />
                                        01 Jan, 2045
                                    </span>
                                </div>
                            </div>
                            <h4 className="text-uppercase mb-3">
                                Rebum diam clita lorem erat magna est erat
                            </h4>
                            <a className="text-uppercase fw-bold" href="">
                                Read More <i className="bi bi-arrow-right" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}