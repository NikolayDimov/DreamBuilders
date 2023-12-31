import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateFormError } from './CreateErrorHadnler';
import { useAuth } from '../../../../contexts/AuthContext';

import { firestore_db } from '../../../../firebase';
import { collection, addDoc } from 'firebase/firestore';


import './Create.css';



export default function Create() {
    const nav = useNavigate();
    const { user } = useAuth();
    const userCollectionRef = collection(firestore_db, 'houses');
    const [successMessage, setSuccessMessage] = useState('');

    // Error Validator
    const {
        formErrors,
        validateProjectName,
        validateCategory,
        validateBedrooms,
        validateBathrooms,
        validateImage,
        getBlurHandlers
    } = useCreateFormError();


    const [createdValues, setCreatedValues] = useState({
        projectName: '',
        category: '',
        bedrooms: '',
        bathrooms: '',
        garage: '',
        pool: '',
        img: '',
        description: ''
    });


    // This object replace all 5 function below
    const {
        handleProjectNameBlur,
        handleCategoryBlur,
        handleBedroomsBlur,
        handleBathroomsBlur,
        handleImageBlur,
    } = getBlurHandlers(createdValues);

    // const handleProjectNamelBlur = () => {
    //     validateProjectName(createdValues.projectName);
    // };

    // const handleCategoryBlur = () => {
    //     validateCategory(createdValues.category);
    // };

    // const handleBedroomsBlur = () => {
    //     validateBedrooms(createdValues.bedrooms);
    // };

    // const handleBathroomsBlur = () => {
    //     validateBathrooms(createdValues.bathrooms);
    // };

    // const handleImageBlur = () => {
    //     validateImage(createdValues.image);
    // };



    const changeHandler = (e) => {
        setCreatedValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };


    async function createHouse(e) {
        e.preventDefault();
        try {
            let isProjectNameValid = validateProjectName(createdValues.projectName);
            let isCategoryValid = validateCategory(createdValues.category);
            let isBedroomsValid = validateBedrooms(createdValues.bedrooms);
            let isBathroomsValid = validateBathrooms(createdValues.bathrooms);
            let isImageValid = validateImage(createdValues.img);

            if (!isProjectNameValid || !isCategoryValid || !isBedroomsValid || !isBathroomsValid || !isImageValid) {
                console.log(`Values can no be empty strings`);
            } else {
                await addDoc(userCollectionRef, {
                    owner_uid: user.uid,
                    owner_email: user.email,
                    projectName: createdValues.projectName,
                    category: createdValues.category,
                    bedrooms: createdValues.bedrooms,
                    bathrooms: createdValues.bathrooms,
                    garage: createdValues.garage,
                    pool: createdValues.pool,
                    img: createdValues.img,
                    description: createdValues.description,
                    createdAt: new Date().toISOString(),
                });

                // Set success message
                setSuccessMessage('Project created successfully');
                console.log('Project created successfully');
                nav('/catalog');
            }

        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div className="container-create">
            <div className="row align-items-center justify-content-center">

                <div className="form-block-create mx-auto">
                    <div className="title">
                        <h3>Create you own house {(user.email.split('@'))[0]} </h3>
                    </div>

                    <form onSubmit={createHouse} noValidate>

                        <section className='inputs-fields'>

                            <div className="form-group">
                                <label htmlFor="username">Project Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter name"
                                    id="projectName"
                                    name="projectName"
                                    value={createdValues.projectName}
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
                                    value={createdValues.category}
                                    onChange={(e) => changeHandler(e)}
                                    onBlur={handleCategoryBlur}
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="One-Story House">One-Story House</option>
                                    <option value="Two-Story House">Two-Story House</option>
                                    <option value="Three-Story House">Three-Story House</option>
                                    <option value="Town House">Town House</option>
                                    <option value="Mansion">Mansion</option>
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
                                    value={createdValues.bedrooms}
                                    onChange={changeHandler}
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
                                    value={createdValues.bathrooms}
                                    onChange={changeHandler}
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
                                    value={createdValues.garage}
                                    onChange={changeHandler}
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
                                    value={createdValues.pool}
                                    onChange={changeHandler}
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
                                    value={createdValues.img}
                                    onChange={changeHandler}
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
                                    value={createdValues.description}
                                    onChange={changeHandler}
                                ></textarea>
                            </div>

                        </section>

                        <button className="btn btn-primary create-btn" type="submit">Create</button>

                        {/* Display success message */}
                        {successMessage && (
                            <div className="alert alert-success mt-3" role="alert">
                                {successMessage}
                            </div>
                        )}

                    </form>

                </div>

            </div>
        </div >
    );
}