// ProjectDetailsContext.js
import { createContext, useContext, useState } from 'react';

const ProjectDetailsContext = createContext();

export const ProjectDetailsProvider = ({ children }) => {
    const [projectDetails, setProjectDetails] = useState(null);

    return (
        <ProjectDetailsContext.Provider value={{ projectDetails, setProjectDetails }}>
            {children}
        </ProjectDetailsContext.Provider>
    );
};

export const useProjectDetails = () => {
    const context = useContext(ProjectDetailsContext);
    if (!context) {
        throw new Error('useProjectDetails must be used within a ProjectDetailsProvider');
    }
    return context;
};
