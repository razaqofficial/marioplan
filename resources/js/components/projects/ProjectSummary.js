import React from 'react';
import { Link } from "react-router-dom";
import { likeProject } from "../../store/actions/projectAction";
import {connect} from "react-redux";

const ProjectSummary = (props) => {
        const { project } = props;
    return (
        <div className="card z-depth-0 project summary" key={project.id}>
            <div className="card-content grey-text text-darken-3">
                <Link to={"/project/" + project.id}>
                    <span className="card-title">{ project.title }</span>
                    <p>{ project.title }</p>
                </Link>
                <p className="grey-text">{ project.created_at }</p>
                <a onClick={() => props.likeProject(project)}><span className="badge"><i className="material-icons circle">thumb_up</i></span></a>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        likeProject:(project) => dispatch(likeProject(project))
    }
};

export default connect(null,mapDispatchToProps)(ProjectSummary);
