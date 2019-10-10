import React from 'react';
import ProjectSummary from './ProjectSummary';

const ProjectList = ({projects}) => {
    return (
        <React.Fragment>
            <div className="project-list section">
                {projects && projects.map(project => {
                 return (
                     <ProjectSummary project={project} key={project.id} />
                 )
                })}
            </div>
        </React.Fragment>
    );
};

export default ProjectList;
