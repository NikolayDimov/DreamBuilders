import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEditFormError } from './EditErrorHadnler'

import { firestore_db } from '../../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

import './Edit.css';


export default function Edit() {

    const location = useLocation();
    const nav = useNavigate();
    const { id } = useParams();

    const [projectDetails, setProjectDetails] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            if (location.state && location.state?.projectDetails) {
                const valuesComingFromLocationState = location.state?.projectDetails;
                setProjectDetails(valuesComingFromLocationState);
            } else {
                console.error('No project details found in location.state');
            }
        };

        fetchData();
    }, [location.state], id);

    // console.log(projectDetails);
    // console.log(id);

    const {
        formErrors,
        validateProjectName,
        validateCategory,
        validateBedrooms,
        validateBathrooms,
        validateImage,
        getBlurHandlers
    } = useEditFormError();

    const {
        handleProjectNameBlur,
        handleCategoryBlur,
        handleBedroomsBlur,
        handleBathroomsBlur,
        handleImageBlur,
    } = getBlurHandlers(projectDetails);


    const changeHandler = (e) => {
        setProjectDetails(projectDetails => ({ ...projectDetails, [e.target.name]: e.target.value }));

    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            if (projectDetails) {
                const projectDetailsRef = doc(firestore_db, 'houses', id);

                let isProjectNameValid = validateProjectName(projectDetails.projectName);
                let isCategoryValid = validateCategory(projectDetails.category);
                let isBedroomsValid = validateBedrooms(projectDetails.bedrooms);
                let isBathroomsValid = validateBathrooms(projectDetails.bathrooms);
                let isImageValid = validateImage(projectDetails.img);

                if (!isProjectNameValid || !isCategoryValid || !isBedroomsValid || !isBathroomsValid || !isImageValid) {
                    console.log(`Values can no be empty strings`);
                } else {
                    await updateDoc(projectDetailsRef, {
                        projectName: projectDetails.projectName,
                        category: projectDetails.category,
                        bedrooms: projectDetails.bedrooms,
                        bathrooms: projectDetails.bathrooms,
                        garage: projectDetails.garage,
                        pool: projectDetails.pool,
                        img: projectDetails.img,
                        description: projectDetails.description,
                    });

                    console.log('Project details updated successfully');
                    nav(`/catalog/${id}`);
                }


            } else {
                console.error('No project details found to update');
            }
        } catch (error) {
            console.error('Error updating project details:', error);
        }
    };


    if (!projectDetails) {
        return <p>Loading project details...</p>;
    }


    return (

        <div className="container-create">
            <div className="row align-items-center justify-content-center">

                <div className="form-block-create mx-auto">
                    <div className="title">
                        <h3>Edit you own house {(projectDetails.owner_email.split('@'))[0] || ''} </h3>
                    </div>
                    <form onSubmit={handleEditSubmit} noValidate>

                        <section className='inputs-fields'>

                            <div className="form-group">
                                <label htmlFor="username">Project Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter name"
                                    id="projectName"
                                    name="projectName"
                                    value={projectDetails.projectName}
                                    onChange={(e) => changeHandler(e)}
                                    onBlur={handleProjectNameBlur}
                                />
                                {formErrors.projectName && <p className='error'>{formErrors.projectName}</p>}
                            </div>

                            <div className="form-group">
                                <p>
                                    <label htmlFor="category">Category</label>
                                </p>
                                <select
                                    className="form-control"
                                    name="category"
                                    id="category"
                                    value={projectDetails.category}
                                    onChange={(e) => changeHandler(e)}
                                    onBlur={handleCategoryBlur}
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="oneStoryHouse">One-Story House</option>
                                    <option value="twoStoryHouse">Two-Story House</option>
                                    <option value="threeStoryHouse">Three-Story House</option>
                                    <option value="townHouse">Town House</option>
                                    <option value="mansion">Mansion</option>
                                </select>
                                {formErrors.category && <p className='error'>{formErrors.category}</p>}
                            </div>

                            <div className="form-group">
                                <p>
                                    <label htmlFor="bedrooms">Bedrooms</label>
                                </p>
                                <select
                                    className="form-control"
                                    name="bedrooms"
                                    id="bedrooms"
                                    value={projectDetails.bedrooms}
                                    onChange={(e) => changeHandler(e)}
                                    onBlur={handleBedroomsBlur}
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="one">one</option>
                                    <option value="two">two</option>
                                    <option value="three">three</option>
                                    <option value="four">four</option>
                                    <option value="five">five</option>
                                    <option value="six">six</option>
                                </select>
                                {formErrors.bedrooms && <p className='error'>{formErrors.bedrooms}</p>}
                            </div>

                            <div className="form-group">
                                <p>
                                    <label htmlFor="bathrooms">Bathrooms</label>
                                </p>
                                <select
                                    className="form-control"
                                    name="bathrooms"
                                    id="bathrooms"
                                    value={projectDetails.bathrooms}
                                    onChange={(e) => changeHandler(e)}
                                    onBlur={handleBathroomsBlur}
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="one">one</option>
                                    <option value="two">two</option>
                                    <option value="three">three</option>
                                    <option value="four">four</option>
                                    <option value="five">five</option>
                                </select>
                                {formErrors.bathrooms && <p className='error'>{formErrors.bathrooms}</p>}
                            </div>

                            <div className="form-group">
                                <p>
                                    <label htmlFor="garage">Garage</label>
                                </p>
                                <select className="form-control" name="garage" id="garage"
                                    value={projectDetails.garage}
                                    onChange={(e) => changeHandler(e)}
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="One-Car Garage">One-Car Garage</option>
                                    <option value="Two-Car Garage">Two-Car Garage</option>
                                    <option value="Three-Car Garage">Three-Car Garage</option>
                                    <option value="Four-Car Garage">Four-Car Garage</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <p>
                                    <label htmlFor="pool">Pool</label>
                                </p>
                                <select className="form-control" name="pool" id="pool"
                                    value={projectDetails.pool}
                                    onChange={(e) => changeHandler(e)}
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                    <option value="Extra Large">Extra Large</option>
                                    <option value="Circle">Circle</option>
                                    <option value="Non-standard Shape">Non-standard Shape</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Picture">Project Image</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter picture"
                                    id="projectName"
                                    name="img"
                                    value={projectDetails.img}
                                    onChange={(e) => changeHandler(e)}
                                    onBlur={handleImageBlur}
                                />
                                {formErrors.image && <p className='error'>{formErrors.image}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="desctiption">Description</label>
                                <textarea
                                    rows="4"
                                    type="text"
                                    className="form-control"
                                    placeholder="Description text"
                                    id="description"
                                    name="description"
                                    value={projectDetails.description}
                                    onChange={(e) => changeHandler(e)}
                                ></textarea>
                            </div>

                        </section>

                        <button className="btn btn-primary edit-btn" type="submit">Edit</button>

                    </form>

                </div>

            </div>
        </div>

    );
}