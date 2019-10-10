import { browserHistory } from 'react-router-dom';

const initState = {
    projects:[],
    findProject:null,
    successfulRequest:false
};

const projectReducer = (state = initState,action) => {

    switch (action.type) {
        case 'CREATE_PROJECT':
            return {
               ...state,
                projects:[...state.projects,action.project],
                successfulRequest:true
            };
            return state;
        case 'CREATE_PROJECT_ERROR':
            return {
                ...state,
                successfulRequest:false
            };
        case 'ALL_PROJECTS':
               return {
                   projects: action.projects
               };
        case 'PROJECTS_ERROR':
            if (action.error.status === 401) {
              //  localStorage.removeItem('user');
              //  console.log('destroy storage and redirect to login', 'from reducer');
            }
        case 'FIND_PROJECT':
            return {
                ...state,
                findProject: action.project
            };
            return state;
        case 'SUCCESSFUL_REQUEST':
            return {
                ...state,
                successfulRequest:action.requestState
            };
        case 'FIND_PROJECT':
            console.log('project liked from reducer ' , action.payload);
            return {
                ...state
            };
        default:
            return state;
    }

};

export default projectReducer;
