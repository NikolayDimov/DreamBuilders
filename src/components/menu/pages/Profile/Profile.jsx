// import { useState, useEffect } from 'react';
// import { firestore_db } from '../../firebase';
// import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import Logout from '../../auth/Logout/Logout';
import { Link } from 'react-router-dom';

import './Profile.css';



export default function Profile() {


    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header">
                <h1 className="display-3 text-uppercase text-white mb-3">Welcome to your Profile page</h1>
                <div className="d-inline-flex text-white">
                    <h6 className="text-uppercase m-0">
                        <p className='text-banner'>Your Projects are visible for other clients</p>
                    </h6>
                </div>
            </div>
            {/* Page Header Start */}
            {/* Blog Start */}
            <div className="container-fluid py-6 px-5">
                <div className="row g-5">
                    <div className="col-lg-8">
                        {/* Blog Detail Start */}
                        <div className="mb-5">
                            <h2 className="text-uppercase mb-4">
                                Create your new house project or choose from existing ones
                            </h2>

                            <section className='flex-two-buttons'>
                                <Link to={"/create"}>
                                    <section className='myProject-icons-section createBtn btn btn-outline-dark m-1'>
                                        <i className="fa-solid fa-plus"></i>
                                        <p>Create you project</p>
                                    </section>
                                </Link>

                                <Link to='/catalog'>
                                    <section className='myProject-icons-section catalogBtn btn btn-outline-dark m-1'>
                                        <i className="fa-solid fa-house"></i>
                                        <p>Projects catalog</p>
                                    </section>
                                </Link>
                            </section>

                            <img
                                className="img-fluid w-100 rounded mb-5"
                                src="img/blog-2.jpg"
                                alt=""
                            />
                            <h1 className="text-uppercase mb-4">
                                My Projects Here
                            </h1>


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

                        {/* Comment Form Start */}
                        <div className="bg-light p-5 myProject-comment-section">
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
                                        // defaultValue={""}
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
                            <h3 className="text-uppercase mb-4">Categories</h3>
                            <div className="d-flex flex-column justify-content-start bg-light p-4">
                                <a className="h6 text-uppercase mb-4" href="#">
                                    <i className="fa fa-angle-right me-2" />
                                    One-story house
                                </a>
                                <a className="h6 text-uppercase mb-4" href="#">
                                    <i className="fa fa-angle-right me-2" />
                                    Two-story house
                                </a>
                                <a className="h6 text-uppercase mb-4" href="#">
                                    <i className="fa fa-angle-right me-2" />
                                    Three-story house
                                </a>
                                <a className="h6 text-uppercase mb-4" href="#">
                                    <i className="fa fa-angle-right me-2" />
                                    Town House
                                </a>
                                <a className="h6 text-uppercase mb-0" href="#">
                                    <i className="fa fa-angle-right me-2" />
                                    Mansion
                                </a>
                            </div>
                        </div>
                        {/* Category End */}
                        {/* Recent Post Start */}
                        <div className="mb-5">
                            <h3 className="text-uppercase mb-4">History of My Project</h3>
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

                    </div>
                    {/* Sidebar End */}
                </div>
            </div>
            {/* Blog End */}
            <Logout />
        </>
    );
}
