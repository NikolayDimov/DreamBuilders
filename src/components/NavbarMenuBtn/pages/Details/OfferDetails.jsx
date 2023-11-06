import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore_db } from '../../../../firebase';


export default function OfferDetails() {
    const { id } = useParams(); // Access the "id" parameter from the URL
    const [projectDetails, setProjectDetails] = useState(null);


    useEffect(() => {
        // Function to fetch project details from Firestore
        const fetchProjectDetails = async () => {
            try {
                const projectRef = doc(firestore_db, 'houses', id); // Assuming 'projects' is your Firestore collection name
                const projectDoc = await getDoc(projectRef);

                if (projectDoc.exists()) {
                    // Document exists, set the project details state
                    setProjectDetails(projectDoc.data());
                } else {
                    // Handle the case where the document doesn't exist
                    console.log("Project not found");
                }
            } catch (error) {
                // Handle any potential errors here
                console.error("Error fetching project details:", error);
            }
        };

        fetchProjectDetails();
    }, [id]);


    console.log(id);
    console.log(projectDetails);

    return (
        <> {projectDetails ? (
            <div>
                {/* Page Header Start */}
                <div className="container-fluid page-header">
                    <h1 className="display-3 text-uppercase text-white mb-3">Project Detail</h1>
                    <div className="d-inline-flex text-white">
                        <h6 className="text-uppercase m-0">
                            <a href="">Home</a>
                        </h6>
                        <h6 className="text-white m-0 px-3">/</h6>
                        <h6 className="text-uppercase text-white m-0">Back</h6>
                    </div>
                </div>
                {/* Page Header Start */}
                {/* Blog Start */}
                <div className="container-fluid py-6 px-5">
                    <div className="row g-5">
                        <div className="col-lg-8">
                            {/* Blog Detail Start */}
                            <div className="mb-5">

                                <img
                                    className="img-fluid w-100 rounded mb-5"
                                    src={projectDetails.img}
                                    alt=""
                                />


                                <h1 className="text-uppercase mb-4">
                                    {projectDetails.projectName}
                                </h1>



                                <p>
                                    Bedrooms:
                                    {projectDetails.bedrooms}
                                </p>
                                <p>
                                    Voluptua est takimata stet invidunt sed rebum nonumy stet, clita
                                    aliquyam dolores vero stet consetetur elitr takimata rebum sanctus.
                                    Sit sed accusam stet sit nonumy kasd diam dolores, sanctus lorem
                                    kasd duo dolor dolor vero sit et. Labore ipsum duo sanctus amet eos
                                    et. Consetetur no sed et aliquyam ipsum justo et, clita lorem sit
                                    vero amet amet est dolor elitr, stet et no diam sit. Dolor erat
                                    justo dolore sit invidunt.
                                </p>
                                <p>
                                    Diam dolor est labore duo invidunt ipsum clita et, sed et lorem
                                    voluptua tempor invidunt at est sanctus sanctus. Clita dolores sit
                                    kasd diam takimata justo diam lorem sed. Magna amet sed rebum eos.
                                    Clita no magna no dolor erat diam tempor rebum consetetur, sanctus
                                    labore sed nonumy diam lorem amet eirmod. No at tempor sea diam
                                    kasd, takimata ea nonumy elitr sadipscing gubergren erat. Gubergren
                                    at lorem invidunt sadipscing rebum sit amet ut ut, voluptua diam
                                    dolores at sadipscing stet. Clita dolor amet dolor ipsum vero ea ea
                                    eos.
                                </p>
                            </div>
                            {/* Blog Detail End */}
                            {/* Comment List Start */}
                            <div className="mb-5">
                                <h3 className="text-uppercase mb-4">3 Comments</h3>
                                <div className="d-flex mb-4">
                                    <img
                                        src="img/user.jpg"
                                        className="img-fluid"
                                        style={{ width: 45, height: 45 }}
                                    />
                                    <div className="ps-3">
                                        <h6>
                                            <a href="">John Doe</a>{" "}
                                            <small>
                                                <i>01 Jan 2045</i>
                                            </small>
                                        </h6>
                                        <p>
                                            Diam amet duo labore stet elitr invidunt ea clita ipsum
                                            voluptua, tempor labore accusam ipsum et no at. Kasd diam tempor
                                            rebum magna dolores sed eirmod
                                        </p>
                                        <button className="btn btn-sm btn-light">Reply</button>
                                    </div>
                                </div>
                                <div className="d-flex mb-4">
                                    <img
                                        src="img/user.jpg"
                                        className="img-fluid"
                                        style={{ width: 45, height: 45 }}
                                    />
                                    <div className="ps-3">
                                        <h6>
                                            <a href="">John Doe</a>{" "}
                                            <small>
                                                <i>01 Jan 2045</i>
                                            </small>
                                        </h6>
                                        <p>
                                            Diam amet duo labore stet elitr invidunt ea clita ipsum
                                            voluptua, tempor labore accusam ipsum et no at. Kasd diam tempor
                                            rebum magna dolores sed eirmod
                                        </p>
                                        <button className="btn btn-sm btn-light">Reply</button>
                                    </div>
                                </div>
                                <div className="d-flex ms-5 mb-4">
                                    <img
                                        src="img/user.jpg"
                                        className="img-fluid"
                                        style={{ width: 45, height: 45 }}
                                    />
                                    <div className="ps-3">
                                        <h6>
                                            <a href="">John Doe</a>{" "}
                                            <small>
                                                <i>01 Jan 2045</i>
                                            </small>
                                        </h6>
                                        <p>
                                            Diam amet duo labore stet elitr invidunt ea clita ipsum
                                            voluptua, tempor labore accusam ipsum et no at. Kasd diam tempor
                                            rebum magna dolores sed eirmod
                                        </p>
                                        <button className="btn btn-sm btn-light">Reply</button>
                                    </div>
                                </div>
                            </div>
                            {/* Comment List End */}
                            {/* Comment Form Start */}
                            <div className="bg-light p-5">
                                <h3 className="text-uppercase mb-4">Leave a comment</h3>
                                <form>
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control bg-white border-0"
                                                placeholder="Your Name"
                                                style={{ height: 55 }}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input
                                                type="email"
                                                className="form-control bg-white border-0"
                                                placeholder="Your Email"
                                                style={{ height: 55 }}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <input
                                                type="text"
                                                className="form-control bg-white border-0"
                                                placeholder="Website"
                                                style={{ height: 55 }}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <textarea
                                                className="form-control bg-white border-0"
                                                rows={5}
                                                placeholder="Comment"
                                                defaultValue={""}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">
                                                Leave Your Comment
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {/* Comment Form End */}
                        </div>
                        {/* Sidebar Start */}
                        <div className="col-lg-4">
                            {/* Search Form Start */}
                            <div className="mb-5">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control p-3"
                                        placeholder="Keyword"
                                    />
                                    <button className="btn btn-primary px-3">
                                        <i className="fa fa-search" />
                                    </button>
                                </div>
                            </div>
                            {/* Search Form End */}
                            {/* Category Start */}
                            <div className="mb-5">
                                <h3 className="text-uppercase mb-4">Categories</h3>
                                <div className="d-flex flex-column justify-content-start bg-light p-4">
                                    <a className="h6 text-uppercase mb-4" href="#">
                                        <i className="fa fa-angle-right me-2" />
                                        Web Design
                                    </a>
                                    <a className="h6 text-uppercase mb-4" href="#">
                                        <i className="fa fa-angle-right me-2" />
                                        Web Development
                                    </a>
                                    <a className="h6 text-uppercase mb-4" href="#">
                                        <i className="fa fa-angle-right me-2" />
                                        Web Development
                                    </a>
                                    <a className="h6 text-uppercase mb-4" href="#">
                                        <i className="fa fa-angle-right me-2" />
                                        Keyword Research
                                    </a>
                                    <a className="h6 text-uppercase mb-0" href="#">
                                        <i className="fa fa-angle-right me-2" />
                                        Email Marketing
                                    </a>
                                </div>
                            </div>
                            {/* Category End */}
                            {/* Recent Post Start */}
                            <div className="mb-5">
                                <h3 className="text-uppercase mb-4">Recent Post</h3>
                                <div className="bg-light p-4">
                                    <div className="d-flex mb-3">
                                        <img
                                            className="img-fluid"
                                            src="img/blog-1.jpg"
                                            style={{ width: 100, height: 100, objectFit: "cover" }}
                                            alt=""
                                        />
                                        <a
                                            href=""
                                            className="h6 d-flex align-items-center bg-white text-uppercase px-3 mb-0"
                                        >
                                            Lorem ipsum dolor sit amet consec adipis
                                        </a>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <img
                                            className="img-fluid"
                                            src="img/blog-2.jpg"
                                            style={{ width: 100, height: 100, objectFit: "cover" }}
                                            alt=""
                                        />
                                        <a
                                            href=""
                                            className="h6 d-flex align-items-center bg-white text-uppercase px-3 mb-0"
                                        >
                                            Lorem ipsum dolor sit amet consec adipis
                                        </a>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <img
                                            className="img-fluid"
                                            src="img/blog-3.jpg"
                                            style={{ width: 100, height: 100, objectFit: "cover" }}
                                            alt=""
                                        />
                                        <a
                                            href=""
                                            className="h6 d-flex align-items-center bg-white text-uppercase px-3 mb-0"
                                        >
                                            Lorem ipsum dolor sit amet consec adipis
                                        </a>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <img
                                            className="img-fluid"
                                            src="img/blog-1.jpg"
                                            style={{ width: 100, height: 100, objectFit: "cover" }}
                                            alt=""
                                        />
                                        <a
                                            href=""
                                            className="h6 d-flex align-items-center bg-white text-uppercase px-3 mb-0"
                                        >
                                            Lorem ipsum dolor sit amet consec adipis
                                        </a>
                                    </div>
                                    <div className="d-flex mb-3">
                                        <img
                                            className="img-fluid"
                                            src="img/blog-2.jpg"
                                            style={{ width: 100, height: 100, objectFit: "cover" }}
                                            alt=""
                                        />
                                        <a
                                            href=""
                                            className="h6 d-flex align-items-center bg-white text-uppercase px-3 mb-0"
                                        >
                                            Lorem ipsum dolor sit amet consec adipis
                                        </a>
                                    </div>
                                    <div className="d-flex">
                                        <img
                                            className="img-fluid"
                                            src="img/blog-3.jpg"
                                            style={{ width: 100, height: 100, objectFit: "cover" }}
                                            alt=""
                                        />
                                        <a
                                            href=""
                                            className="h6 d-flex align-items-center bg-white text-uppercase px-3 mb-0"
                                        >
                                            Lorem ipsum dolor sit amet consec adipis
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {/* Recent Post End */}
                            {/* Image Start */}
                            <div className="mb-5">
                                <img src="img/blog-1.jpg" alt="" className="img-fluid rounded" />
                            </div>
                            {/* Image End */}
                            {/* Tags Start */}
                            <div className="mb-5">
                                <h3 className="text-uppercase mb-4">Tag Cloud</h3>
                                <div className="d-flex flex-wrap m-n1">
                                    <a href="" className="btn btn-outline-dark m-1">
                                        Design
                                    </a>
                                    <a href="" className="btn btn-outline-dark m-1">
                                        Development
                                    </a>
                                    <a href="" className="btn btn-outline-dark m-1">
                                        Marketing
                                    </a>
                                    <a href="" className="btn btn-outline-dark m-1">
                                        SEO
                                    </a>
                                    <a href="" className="btn btn-outline-dark m-1">
                                        Writing
                                    </a>
                                    <a href="" className="btn btn-outline-dark m-1">
                                        Consulting
                                    </a>
                                    <a href="" className="btn btn-outline-dark m-1">
                                        Design
                                    </a>
                                    <a href="" className="btn btn-outline-dark m-1">
                                        Development
                                    </a>
                                    <a href="" className="btn btn-outline-dark m-1">
                                        Marketing
                                    </a>
                                    <a href="" className="btn btn-outline-dark m-1">
                                        SEO
                                    </a>
                                    <a href="" className="btn btn-outline-dark m-1">
                                        Writing
                                    </a>
                                    <a href="" className="btn btn-outline-dark m-1">
                                        Consulting
                                    </a>
                                </div>
                            </div>
                            {/* Tags End */}
                            {/* Plain Text Start */}
                            <div>
                                <h3 className="text-uppercase mb-4">Plain Text</h3>
                                <div className="bg-light rounded text-center" style={{ padding: 30 }}>
                                    <p>
                                        Vero sea et accusam justo dolor accusam lorem consetetur, dolores
                                        sit amet sit dolor clita kasd justo, diam accusam no sea ut tempor
                                        magna takimata, amet sit et diam dolor ipsum amet diam
                                    </p>
                                    <a href="" className="btn btn-primary py-2 px-4">
                                        Read More
                                    </a>
                                </div>
                            </div>
                            {/* Plain Text End */}
                        </div>
                        {/* Sidebar End */}
                    </div>
                </div>
                {/* Blog End */}
            </div>)
            : (
                <p>Loading project details...</p>
            )}
        </>

    );
}