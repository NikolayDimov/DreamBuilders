


export default function ProjectItem({item}) {

    return (
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
                                {item.category}
                            </span>
                        </div>
                        <p>{item.pool}</p>
                    </div>
                    <h4 className="text-uppercase mb-3">
                        {item.projectName}
                    </h4>
                    <a className="text-uppercase fw-bold">
                        Read More {item.garage} <i className="bi bi-arrow-right" />
                    </a>
                </div>
            </div>
            <p>{item.bedrooms}</p>
        </div>






        // <div>PPPPPPPP
        //     <p> {item.garage}</p>
           
        //    <p>{item.projectName}</p>
        //    <p>{item.pool}</p>
        //    <p>{item.bedrooms}</p>
        //    <p>{item.bathrooms}</p>
        //    <p>{item.category}</p>
            
        // </div>
    );
}
