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
    const [descripion, setDescription] = useState('');


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
                descripion: descripion,
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
                                    required
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="One-Story House">One-Story House</option>
                                    <option value="Two-Story House">Two-Story House</option>
                                    <option value="Three-Story House">Three-Story House</option>
                                    <option value="Town House">Town House</option>
                                    <option value="Mansion">Mansion</option>
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
                                    required
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="one">one</option>
                                    <option value="two">two</option>
                                    <option value="three">three</option>
                                    <option value="four">four</option>
                                    <option value="five">five</option>
                                    <option value="six">six</option>
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
                                    required
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="one">one</option>
                                    <option value="two">two</option>
                                    <option value="three">three</option>
                                    <option value="four">four</option>
                                    <option value="five">five</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <p>
                                    <label htmlFor="garage">Garage</label>
                                </p>
                                <select className="form-control" name="garage" id="garage"
                                    value={garage}
                                    onChange={(e) => setGarage(e.target.value)}
                                >
                                    <option value="" disabled>Select...</option>
                                    <option value="One-Car Garage">One-Car Garage</option>
                                    <option value="wo-Car Garage">Two-Car Garage</option>
                                    <option value="Three-Car Garage">Three-Car Garage</option>
                                    <option value="Four-Car Garage">Four-Car Garage</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <p>
                                    <label htmlFor="pool">Pool</label>
                                </p>
                                <select className="form-control" name="pool" id="pool"
                                    value={pool}
                                    onChange={(e) => setPool(e.target.value)}
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
                                <label htmlFor="Picture">Picture</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter picture"
                                    id="projectName"
                                    name="img"
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="desctiption">Description</label>
                                <textarea
                                    rows="4"
                                    type="text"
                                    className="form-control"
                                    placeholder="Description text"
                                    id="descripion"
                                    name="descripion"
                                    value={descripion}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>

                        </section>

                        <button className="btn btn-primary create-btn" type="submit">Create</button>

                    </form>

                </div>

            </div>
        </div >
    );
}