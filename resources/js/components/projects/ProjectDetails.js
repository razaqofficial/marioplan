import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findProject } from '../../store/actions/projectAction';
import { Redirect } from 'react-router-dom';
class ProjectDetails extends Component {

    componentDidMount() {
        const id = this.props.match.params.project_id
       this.props.findProject(id);
    }

    render() {
        const { project,isLoggedIn } = this.props;
        if(!isLoggedIn) return <Redirect to="/login"/>;
            if (project) {
                return (
                <React.Fragment>
                     <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{ project.title }</span>
                            { project.content }
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Posted by the { project.user.name }</div>
                            <div>{ project.created_at }, 2am</div>
                        </div>
                    </div>
                </div>
                </React.Fragment>
            );
        } else {
             return (
           <p className="center"> Loading</p>
           );
        }

    }

}

const mapStateToPros = (state,ownProps) => {
    const id = ownProps.match.params.project_id;
   // const projects = state.project.projects;
    return {
        project: state.project.findProject,
        isLoggedIn : state.auth.loggedIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        findProject:(id) => dispatch(findProject(id))
    }
};

export default connect(mapStateToPros,mapDispatchToProps)(ProjectDetails);
