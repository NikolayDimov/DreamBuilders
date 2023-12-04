
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getDocs, deleteDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore_db } from '../../../../firebase';
import { useAuth } from '../../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../Delete/Delete';
// import { useProjectDetails } from '../../../../contexts/ProjectDetailsContext';

import * as commentService from '../../../../services/commentService';

import './Details.css';

export default function Details() {
    const { user } = useAuth();
    const nav = useNavigate();
    const { id } = useParams(); // Access the id parameter from the URL

    // Details state
    const [projectDetails, setProjectDetails] = useState(null);
    // isOwner state
    const [isOwner, setIsOwner] = useState(false);

    // Delete state
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [itemToDeleteId, setItemToDeleteId] = useState(null);


    // Comments state - write comments to firestore
    const [commentForm, setCommentForm] = useState({
        name: '',
        email: '',
        comment: '',
    });

    // Comments state - read comments from firestore
    const [comments, setComments] = useState([]);




    // Fetch data for Details page
    const fetchProjectDetails = async () => {
        try {
            const projectRef = doc(firestore_db, 'houses', id);
            const projectDoc = await getDoc(projectRef);

            if (projectDoc.exists()) {
                const projectData = projectDoc.data();
                setProjectDetails(projectData);

                if (projectData) {
                    setIsOwner(user.uid && user.uid === projectData.owner_uid);

                    // Fetch comments
                    const commentsCollection = collection(firestore_db, 'houses', id, 'comments');
                    const commentsSnapshot = await getDocs(commentsCollection);
                    const commentsData = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setComments(commentsData);

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



    // Edit function
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



    // Delete function
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



    // Display details data to Details page
    useEffect(() => {
        fetchProjectDetails();
    }, [id, user.uid]);


    // console.log(user.uid)
    // console.log(id);
    // console.log(projectDetails.owner_uid);



    // Comments -----------------------
    const addCommentHandler = async (event) => {
        event.preventDefault();

        const { name, email, commentText } = commentForm;
        // console.log(commentForm)

        // Validate form values
        if (!name || !email || !commentText) {
            // Handle form validation error (you can display an error message)
            return;
        }

        try {
            // Add the comment to Firestore
            const commentsCollection = collection(firestore_db, 'houses', id, 'comments');
            await addDoc(commentsCollection, {
                name,
                email,
                commentText,
                timestamp: serverTimestamp(),
            });

            // Reset the form fields
            setCommentForm({
                name: '',
                email: '',
                commentText: '',
            });

            // Fetch project details to refresh the comments list if needed
            await fetchProjectDetails();

        } catch (error) {
            console.error('Error adding comment:', error);
            console.log('Log Error adding comment:', error);
        }

    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
        return date.toLocaleString(); // Customize this based on your preferred date/time format
    };


    console.log('commentForm', commentForm);
    console.log('comments', comments);


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

                                <h1 className="text-uppercase mb-4">
                                    {projectDetails.projectName}
                                </h1>

                                <img className="img-fluid w-100 rounded mb-5 details-picture"
                                    src={projectDetails.img}
                                    alt="project image" />

                                <h3>Description of the project</h3>
                                <p>
                                    {projectDetails.description}
                                </p>

                            </div>
                            {/* Blog Detail End */}

                            {/* Comment List Start */}
                            <div className="mb-5">
                                <h3 className="text-uppercase mb-4">Comments</h3>
                                {comments.map(comment => (
                                    <div key={comment.id} className="d-flex mb-4">
                                        {/* You can customize the comment display as per your UI */}
                                        <div className="ps-3">
                                            <h6>{comment.name}</h6>
                                            <p>{comment.commentText}</p>
                                            <p>{formatTimestamp(comment.timestamp)}</p>
                                            {/* <p>{comment.timestamp}</p> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Comment List End */}


                            {/* Comment Form Start */}
                            <div className="bg-light p-5">
                                <h3 className="text-uppercase mb-4">Leave a comment</h3>
                                <form onSubmit={addCommentHandler}>
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <input
                                                className="form-control bg-white border-0"
                                                style={{ height: 55 }}
                                                type="text"
                                                name="name"
                                                placeholder="Your Name"
                                                value={commentForm.name}
                                                onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input
                                                className="form-control bg-white border-0"
                                                style={{ height: 55 }}
                                                type="email"
                                                name="email"
                                                placeholder="Your Email"
                                                value={commentForm.email}
                                                onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <textarea
                                                className="form-control bg-white border-0"
                                                rows={3}
                                                style={{ height: 'auto' }}
                                                name="comment"
                                                placeholder="Comment"
                                                value={commentForm.commentText}
                                                onChange={(e) => setCommentForm({ ...commentForm, commentText: e.target.value })}
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
                                <h3 className="text-uppercase mb-4">All of my projects</h3>
                                <div className="d-flex flex-wrap m-n1">
                                    <a href="" className="btn btn-outline-dark m-1">
                                        Check it
                                    </a>

                                </div>
                            </div>
                            {/* Tags End */}
                            {/* Plain Text Start */}
                            <div>
                                <h3 className="text-uppercase mb-4">Like this project?</h3>
                                <div className="bg-light rounded text-center" style={{ padding: 30 }}>
                                    <p>
                                        If you like this project and find it really cool, you're welcome to use it for a project at your future home.
                                        Just get in touch with us, and we'll provide you with details about the project and pricing.
                                    </p>
                                    <Link to="/contacts" className="btn btn-primary py-2 px-4">
                                        Contact Us
                                    </Link>
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
                <div className="text-center loading-text">
                    <span className="loader"></span>
                </div>
            )}
        </>

    );
}