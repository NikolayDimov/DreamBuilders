
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, getDocs, deleteDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore_db } from '../../../../firebase';
import { useAuth } from '../../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import DeleteModal from '../Delete/Delete';
import { addCommentHandler } from './ProjectComments/commentService';
import { formatTimestamp } from '../../../../utils/formatTimeStamp';
import { useCommentsFormError } from './ProjectComments/CommentsErrorHandler';

// Not to be in context - To be in service
// import { useProjectDetails } from '../../../../contexts/ProjectDetailsContext';

import * as commentService from './ProjectComments/commentService';

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
    const [commentFormValues, setCommentFormValues] = useState({
        name: '',
        email: '',
        commentText: '',
    });

    // Comments state - read comments from firestore
    const [comments, setComments] = useState([]);

    // Error Validator
    const {
        formErrors,
        validateCommentName,
        validateCommentEmail,
        validateCommentText,
        getBlurHandlers,
    } = useCommentsFormError();


    const {
        handleCommentNameBlur,
        handleCommentEmailBlur,
        handleCommentTextBlur
    } = getBlurHandlers(commentFormValues);


    // Fetch data for Details page
    // to export 
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
        fetchProjectDetails();  // to add id in fetchProjectDetails({id});
    }, [id, user.uid]);


    // console.log(user.uid)
    // console.log(id);
    // console.log(projectDetails.owner_uid);



    // Comments functionality
    const resetCommentForm = () => {
        // Reset the form fields
        setCommentFormValues({
            name: '',
            email: '',
            commentText: '',
        });
    };

    const addCommentHandlerWrapper = async (event) => {
        event.preventDefault();
        try {
            let isCommentNameValid = validateCommentName(commentFormValues.name);
            let isEmailValid = validateCommentEmail(commentFormValues.email);
            let isCommentTextValid = validateCommentText(commentFormValues.commentText);

            if (!isCommentNameValid || !isEmailValid || !isCommentTextValid) {
                console.log(`Values can no be empty strings`);
            } else {

                // Pass the required parameters to the addCommentHandler function
                await addCommentHandler(id, commentFormValues, fetchProjectDetails, resetCommentForm);
            }
        } catch (error) {
            console.error(error);
        }


    };

    // console.log('commentFormValues', commentFormValues);
    // console.log('comments', comments);


    return (
        <> {projectDetails ? (
            <div>
                {/* <ProjectDescription project={project} /> (title, image, description)
                <ProjectDetails /> (details, edit, delete)
                <ProjectComments comments={comments} addComment={addCommentHandler}></>*/}


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
                                <form onSubmit={addCommentHandlerWrapper} noValidate>
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <input
                                                className="form-control bg-white border-0"
                                                style={{ height: 55 }}
                                                type="text"
                                                name="name"
                                                placeholder="Your Name"
                                                value={commentFormValues.name}
                                                onChange={(e) => setCommentFormValues({ ...commentFormValues, name: e.target.value })}
                                                onBlur={handleCommentNameBlur}
                                            />
                                            {formErrors.name && <p className='error'>{formErrors.name}</p>}
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input
                                                className="form-control bg-white border-0"
                                                style={{ height: 55 }}
                                                type="email"
                                                name="email"
                                                placeholder="Your Email"
                                                value={commentFormValues.email}
                                                onChange={(e) => setCommentFormValues({ ...commentFormValues, email: e.target.value })}
                                                onBlur={handleCommentEmailBlur}
                                            />
                                            {formErrors.email && <p className='error'>{formErrors.email}</p>}
                                        </div>
                                        <div className="col-12">
                                            <textarea
                                                className="form-control bg-white border-0"
                                                rows={3}
                                                style={{ height: 'auto' }}
                                                name="commentText"
                                                placeholder="Comment"
                                                value={commentFormValues.commentText}
                                                onChange={(e) => setCommentFormValues({ ...commentFormValues, commentText: e.target.value })}
                                                onBlur={handleCommentTextBlur}
                                            />
                                            {formErrors.commentText && <p className='error'>{formErrors.commentText}</p>}
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