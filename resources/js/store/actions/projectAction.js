import axios from 'axios';

export const createProject = (project) => {
    return (dispatch, getState) => {
        let user  = JSON.parse(localStorage.getItem('user'));
        //Make async request
        axios.post('/api/create-project', {
            ...project
        },{ headers: {Authorization: 'Bearer ' + user.token } })
            .then(() =>{
                //Carry on the dispatch when Async Task is done
                dispatch({ type:'CREATE_PROJECT', project:project });
              //  console.log(res.data);
            })
            .catch((err) => {
               dispatch({ type:'CREATE_PROJECT_ERROR', error: err.response });
            });
    }
};

export const allProjects = (history) => {
    return (dispatch, getState) => {
        let user  = JSON.parse(localStorage.getItem('user'));
        //Make async request
        axios.get('/api/projects-list',{ headers: {Authorization: 'Bearer ' + user.token } })
            .then((res) => {
                //Carry on the dispatch when Async Task is done
                dispatch({type: 'ALL_PROJECTS', projects: res.data});
                //  console.log(res.data);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.removeItem('user');
                   dispatch({type: 'SESSION_EXPIRED'});
                    history.push('/login');
                }
                dispatch({type: 'PROJECTS_ERROR', error: err.response});
            });
    }
};

export const findProject = (id) => {
    return (dispatch, getState) => {
        //Make async request
        let user  = JSON.parse(localStorage.getItem('user'));
        axios.get('/api/find-project/' + id,{ headers: {Authorization: 'Bearer ' + user.token } })
            .then((res) => {
                //Carry on the dispatch when Async Task is done
                dispatch({type: 'FIND_PROJECT', project: res.data});
                //  console.log(res.data);
            })
            .catch((err) => {
                dispatch({type: 'PROJECTS_ERROR', error: err.response});
            });
    }
};

export const likeProject = (project) => {
  return (dispatch, getState) => {
    let user  = JSON.parse(localStorage.getItem('user'));
        axios.get('/api/like/project/' + project.id,{ headers: {Authorization: 'Bearer ' + user.token } })
            .then((res) => {
                //Carry on the dispatch when Async Task is done
                dispatch({type: 'LIKE_PROJECT', payload: res.data});
                //  console.log(res.data);
            })
            .catch((err) => {
                console.log(err)
                dispatch({type: 'PROJECTS_ERROR', error: err.response});
            });
  }
};

export const setSuccessfulRequestState = (requestState) => {
   return (dispatch) => {
       dispatch({type: 'SUCCESSFUL_REQUEST', requestState:requestState });
   }
};


