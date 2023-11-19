/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { firestore_db } from '../../../../firebase';
import { useAuth } from '../../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../Delete/Delete';
// import { useProjectDetails } from '../../../../contexts/ProjectDetailsContext';

import './Details.css';

export default function Details() {
    const { user } = useAuth();
    const nav = useNavigate();
    const { id } = useParams(); // Access the "id" parameter from the URL

    const [projectDetails, setProjectDetails] = useState(null);
    const [isOwner, setIsOwner] = useState(false);

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [itemToDeleteId, setItemToDeleteId] = useState(null);

    // const { projectEditDetails, setProjectEditDetails } = useProjectDetails();



    const fetchProjectDetails = async () => {
        try {
            const projectRef = doc(firestore_db, 'houses', id);
            const projectDoc = await getDoc(projectRef);

            if (projectDoc.exists()) {
                const projectData = projectDoc.data();
                setProjectDetails(projectData);

                if (projectData) {
                    setIsOwner(user.uid && user.uid === projectData.owner_uid);
                } else {
                    console.log("Project data is null");
                }

            } else {
                console.log("Project not found");
            }
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
    };



    const handleEditClick = async () => {
        try {
            // Fetch project details and wait for it to complete
            await fetchProjectDetails();

            // Now projectDetails should be updated, and you can navigate
            // console.log('State to pass:', { projectDetails });
            nav(`/catalog/${id}/edit`, { state: { projectDetails } });
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };



    const handleDeleteClick = (id) => {
        setItemToDeleteId(id);
        setIsDeleteModalVisible(true);
    };

    const handleDeleteConfirm = async (itemId) => {
        try {
            const itemRef = doc(firestore_db, 'houses', itemId);
            await deleteDoc(itemRef);
            console.log(`Item with ID ${itemId} deleted!`);
            setIsDeleteModalVisible(false);
            setItemToDeleteId(null);
            nav('/catalog');
        } catch (error) {
            console.error('Error deleting item:', error);
            setIsDeleteModalVisible(false);
            setItemToDeleteId(null);
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
        setItemToDeleteId(null);
    };




    useEffect(() => {
        fetchProjectDetails();
    }, [id, user.uid, fetchProjectDetails]);


    // console.log(user.uid)
    // console.log(id);
    // console.log(projectDetails.owner_uid);


    return (
        <> {projectDetails ? (
            <div>
                {/* Page Header Start */}
                <div className="container-fluid page-header">
                    <h1 className="display-3 text-uppercase text-white mb-3">Project Detail</h1>
                    <div className="d-inline-flex text-white">
                        <h6 className="text-uppercase m-0">
                            <Link to="/">Home</Link>
                        </h6>
                        <h6 className="text-white m-0 px-3">/</h6>
                        <h6 className="text-uppercase text-white m-0"><Link to="/catalog">Catalog</Link></h6>
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
                                    className="img-fluid w-100 rounded mb-5 details-picture"
                                    src={projectDetails.img}
                                    alt="project image"
                                />

                                <h1 className="text-uppercase mb-4">
                                    {projectDetails.projectName}
                                </h1>

                                <p>
                                    Voluptua est takimata stet invidunt sed rebum nonumy stet, clita
                                    aliquyam dolores vero stet consetetur elitr takimata rebum sanctus.
                                    Sit sed accusam stet sit nonumy kasd diam dolores, sanctus lorem
                                    kasd duo dolor dolor vero sit et. Labore ipsum duo sanctus amet eos
                                    et. Consetetur no sed et aliquyam ipsum justo et, clita lorem sit
                                    vero amet amet est dolor elitr, stet et no diam sit. Dolor erat
                                    justo dolore sit invidunt.
                                </p>

                            </div>
                            {/* Blog Detail End */}

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

                            {/* Category Start */}
                            <div className="mb-5">
                                <h3 className="text-uppercase mb-4">Project Details</h3>
                                <section className="d-flex flex-column justify-content-start bg-light p-4">
                                    <p className="h6 text-uppercase mb-4 default-orange-color">
                                        <img className="details-icons" src="../../../../public/img/icon-floors.svg" alt="icon-floors" />
                                        Category - {projectDetails.category}
                                    </p>
                                    <p className="h6 text-uppercase mb-4 default-orange-color">
                                        <img className="details-icons" src="../../../../public/img/icon-beds.svg" alt="icon-beds" />
                                        Bedrooms - {projectDetails.bedrooms}
                                    </p>
                                    <p className="h6 text-uppercase mb-4 default-orange-color">
                                        <img className="details-icons" src="../../../../public/img/icon-baths.svg" alt="icon-baths" />
                                        Bathrooms - {projectDetails.bathrooms}
                                    </p>
                                    <p className="h6 text-uppercase mb-4 default-orange-color">
                                        <img className="details-icons" src="../../../../public/img/icon-garages.svg" alt="icon-garage" />
                                        Garage - {projectDetails.garage}
                                    </p>
                                    <p className="h6 text-uppercase mb-4 default-orange-color">
                                        <img className="details-icons" src="../../../../public/img/icon-pool.png" alt="icon-pool" />
                                        Pool - {projectDetails.pool}
                                    </p>
                                </section>
                            </div>
                            {/* Category End */}

                            {isOwner && (
                                <div className="mb-5">
                                    <h3 className="text-uppercase mb-4">Your Options</h3>
                                    <div key={id} className="d-flex flex-wrap m-n1">

                                        <Link to={`/catalog/${id}/edit`} className="btn btn-outline-dark m-1" onClick={handleEditClick}>Edit</Link>

                                        <button className="btn btn-outline-dark m-1" onClick={() => handleDeleteClick(id)}>
                                            Delete
                                        </button>
                                        {/* Render the DeleteModal if isVisible state is true */}
                                        {isDeleteModalVisible && (
                                            <DeleteModal
                                                itemToDelete={itemToDeleteId}
                                                onDelete={handleDeleteConfirm}
                                                onCancel={handleDeleteCancel} />
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Tags Start */}
                            <div className="mb-5">
                                <h3 className="text-uppercase mb-4">Tag Cloud</h3>
                                <div className="d-flex flex-wrap m-n1">
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