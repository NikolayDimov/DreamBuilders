import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useProjectDetails } from '../../../../contexts/ProjectDetailsContext';
import { useLocation } from 'react-router-dom';


import './Edit.css';



export default function Edit() {
    // const { id } = useParams();
    // const { projectEditDetails } = useProjectDetails();

    const location = useLocation();
    console.log('Location State:', location.state);
    const { projectDetails } = location.state ?? {};

    const [editedProjectName, setEditedProjectName] = useState(projectDetails.name);



    useEffect(() => {
        // Use projectDetails directly without fetching from Firestore
        console.log('Project Details:', projectDetails);
    }, [projectDetails]);

    const handleProjectNameChange = (e) => {
        setEditedProjectName(e.target.value);
    };

    if (!projectDetails) {
        // Handle the case where projectEditDetails is undefined
        return <p>Loading project details...</p>;
    }

    return (
        <div className="container-create">
            <div className="row align-items-center justify-content-center">

                <div className="form-block-create mx-auto">
                    <div className="title">
                        <h3>Edit you own house {(projectDetails.email.split('@'))[0]} </h3>
                    </div>
                    <form >

                        <section className='inputs-fields'>

                            <div className="form-group">
                                <label htmlFor="username">Project Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter name"
                                    id="projectName"
                                    value={projectDetails.name}
                                    onChange={handleProjectNameChange}
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
                                    onChange={handleProjectNameChange}
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
                                    onChange={handleProjectNameChange}
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
                                    onChange={handleProjectNameChange}
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
                                    onChange={handleProjectNameChange}
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
                                    onChange={handleProjectNameChange}
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
                                    value={projectDetails.img}
                                    onChange={handleProjectNameChange}
                                />
                            </div>

                        </section>

                        <button className="btn btn-block btn-primary btn-margin" type="submit">Create</button>

                    </form>

                </div>

            </div>
        </div>
    );
}