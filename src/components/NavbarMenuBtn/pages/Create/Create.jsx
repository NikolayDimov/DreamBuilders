/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { firestore_db } from '../../../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

import './Create.css';



export default function Create() {
    const nav = useNavigate();
    const { user } = useAuth();
    const userCollectionRef = collection(firestore_db, 'houses');

    const [projectName, setProjectName] = useState('');
    const [category, setCategory] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [garage, setGarage] = useState('');
    const [pool, setPool] = useState('');
    const [img, setImg] = useState('');


    async function createHouse(e) {
        e.preventDefault();
        try {
            await addDoc(userCollectionRef, {
                owner_uid: user.uid,
                owner_email: user.email,
                projectName: projectName,
                category: category,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                garage: garage,
                pool: pool,
                img: img,
                createdAt: new Date().toISOString(),
            });
            nav('/catalog');
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
                    <form onSubmit={createHouse}>

                        <section className='inputs-fields'>

                            <div className="form-group">
                                <label htmlFor="username">Project Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter name"
                                    id="projectName"
                                    name="projectName"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    required
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
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
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
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(e.target.value)}
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
                                    value={bathrooms}
                                    onChange={(e) => setBathrooms(e.target.value)}
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
                                    value={garage}
                                    onChange={(e) => setGarage(e.target.value)}
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
                                    value={pool}
                                    onChange={(e) => setPool(e.target.value)}
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
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
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