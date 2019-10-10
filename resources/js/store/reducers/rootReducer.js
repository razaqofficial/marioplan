import authReducer from './authReducer';
import projectReducer from './projectReducer';
import notificationReducer from './notificationReducer';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth:authReducer,
    project:projectReducer,
    notifiable:notificationReducer
});

export default rootReducer;
