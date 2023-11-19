import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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
            if (location.state && location.state.projectDetails) {
                setProjectDetails(location.state.projectDetails);
            } else {
                console.error('No project details found in location.state');
            }
        };

        fetchData();
    }, [location.state]);

    // console.log(projectDetails);
    // console.log(id);


    const changeHandler = (e) => {
        setProjectDetails(projectDetails => ({ ...projectDetails, [e.target.name]: e.target.value }));

    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            if (projectDetails) {
                const projectDetailsRef = doc(firestore_db, 'houses', id);

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
                    <form onSubmit={handleEditSubmit}>

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
                                />
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
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="oneStoryHouse">One-Story House</option>
                                    <option value="twoStoryHouse">Two-Story House</option>
                                    <option value="threeStoryHouse">Three-Story House</option>
                                    <option value="townHouse">Town House</option>
                                    <option value="mansion">Mansion</option>
                                </select>
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
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="one">1</option>
                                    <option value="two">2</option>
                                    <option value="three">3</option>
                                    <option value="four">4</option>
                                    <option value="five">5</option>
                                </select>
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
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="one">1</option>
                                    <option value="two">2</option>
                                    <option value="three">3</option>
                                    <option value="four">4</option>
                                </select>
                            </div>

                            <div className="form-group">
                                {/* <p>
                                    <label className="control control--checkbox mb-3 mb-sm-2">
                                        <input type="checkbox" defaultChecked="" />
                                        <span className="caption">Garage</span>
                                        <div className="control__indicator" />
                                    </label>
                                </p> */}
                                <p>
                                    <label htmlFor="garage">Garage</label>
                                </p>
                                <select className="form-control" name="garage" id="garage"
                                    value={projectDetails.garage}
                                    onChange={(e) => changeHandler(e)}
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="oneCarGarage">One-Car Garage</option>
                                    <option value="twoCarGarage">Two-Car Garage</option>
                                    <option value="threeCarGarage">Three-Car Garage</option>
                                </select>
                            </div>

                            <div className="form-group">
                                {/* <p>
                                    <label className="control control--checkbox mb-3 mb-sm-2">
                                        <input type="checkbox" defaultChecked="" />
                                        <span className="caption">Pool</span>
                                        <div className="control__indicator" />
                                    </label>
                                </p> */}
                                <p>
                                    <label htmlFor="pool">Pool</label>
                                </p>
                                <select className="form-control" name="pool" id="pool"
                                    value={projectDetails.pool}
                                    onChange={(e) => changeHandler(e)}
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="small">Small: 5 x 4 m</option>
                                    <option value="medium">Medium: 7 x 4 m</option>
                                    <option value="large">Large: 10 x 5 m</option>
                                    <option value="extraLarge">Extra Large: 15 x 6 m</option>
                                    <option value="circle">circle</option>
                                    <option value="nonStandardShape">non-standard shape</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="Picture">Picture</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter picture"
                                    id="projectName"
                                    name="img"
                                    value={projectDetails.img}
                                    onChange={(e) => changeHandler(e)}
                                />
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