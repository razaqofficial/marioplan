import React, { Component } from 'react';
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
import { allProjects } from '../../store/actions/projectAction';
import { allNotifications } from '../../store/actions/notificationActions';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {

    componentDidMount() {
       if (this.props.isLoggedIn) {
           this.props.allProjects(this.props.history);
           this.props.allNotifications();

         setTimeout(() => {
            const userId = this.props.user.id;
            Echo.private('App.User.' + userId)
            .notification((notification) => {
              this.props.updateNotification(notification);
            });
         },5000);
      }
    }

    styles = {
      marginTop: 10,
    }

    render() {
       const { projects,isLoggedIn } = this.props;
       if(!isLoggedIn) return <Redirect to="/login"/>;
        return (
           <React.Fragment>
               <div className="dashboard container">
                  <div className="row">
                      <div className="col s12 m6">
                          <ProjectList projects={projects}/>
                      </div>
                      <div className="col s12 m5 offset-m1" style={this.styles}>
                          <Notifications notifications={this.props.notifications}/>
                      </div>
                  </div>
               </div>
           </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        projects : state.project.projects,
        isLoggedIn : state.auth.loggedIn,
        notifications : state.notifiable.notifications,
        user : state.auth.user
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        allProjects:(history) => dispatch(allProjects(history)),
        allNotifications:() => dispatch(allNotifications()),
        updateNotification:(notification) => dispatch({type:'NOTIFICATION_UPDATE',payload:notification})
    }
};
//one connect method is enough, I used to compose just to see how it works (for adding multiple HOC)
export default compose(
    connect(mapStateToProps),
    connect(null,mapDispatchToProps)
)(Dashboard);
