import React, { Component } from 'react';
import { createProject,setSuccessfulRequestState } from "../../store/actions/projectAction";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class CreateProject extends Component {

    state = {
        title:'',
        content:'',
    };

    componentDidUpdate() {
        if (this.props.successfulRequest) {
           this.props.setSuccessfulRequestState(false);
           //this.props.history.push('/')
           document.querySelector("input").value = '';
           document.querySelector("textarea").value = '';
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
       this.props.createProject(this.state);

    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    render() {
        const { isLoggedIn } = this.props;
        if(!isLoggedIn) return <Redirect to="/login"/>;
        return (
            <React.Fragment>
                <div className="container">
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="grey-text text-darken-3">Create new Project</h5>
                        <div className="input-field">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" name="title" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="content">Project Content</label>
                           <textarea className="materialize-textarea" id="content" onChange={this.handleChange} name="content"> </textarea>
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">Create</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        successfulRequest:state.project.successfulRequest,
        isLoggedIn : state.auth.loggedIn,
        user : state.auth.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        createProject:(project) => dispatch(createProject(project )),
        setSuccessfulRequestState:(requestState) => dispatch(setSuccessfulRequestState(requestState)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateProject);
