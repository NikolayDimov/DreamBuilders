import React from 'react';

export const ProjectDetailsRenderer = ({ projectDetails }) => {
    return (
        <div className="mb-5">
            <h3 className="text-uppercase mb-4">Project Details</h3>
            <section className="d-flex flex-column justify-content-start bg-light p-4">
                <p className="h6 text-uppercase mb-4 default-orange-color">
                    <img className="details-icons" src="../../../../img/icon-floors.svg" alt="icon-floors" />
                    Category - {projectDetails.category}
                </p>
                <p className="h6 text-uppercase mb-4 default-orange-color">
                    <img className="details-icons" src="../../../../img/icon-beds.svg" alt="icon-beds" />
                    Bedrooms - {projectDetails.bedrooms}
                </p>
                <p className="h6 text-uppercase mb-4 default-orange-color">
                    <img className="details-icons" src="../../../../img/icon-baths.svg" alt="icon-baths" />
                    Bathrooms - {projectDetails.bathrooms}
                </p>
                <p className="h6 text-uppercase mb-4 default-orange-color">
                    <img className="details-icons" src="../../../../img/icon-garages.svg" alt="icon-garage" />
                    Garage - {projectDetails.garage}
                </p>
                <p className="h6 text-uppercase mb-4 default-orange-color">
                    <img className="details-icons" src="../../../../img/icon-pool.png" alt="icon-pool" />
                    Pool - {projectDetails.pool}
                </p>
            </section>
        </div>
    );
};


