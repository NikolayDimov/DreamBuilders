import React from 'react';

export const ProjectDescriptionRenderer = ({ projectDetails }) => {
    return (
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
    );
};
