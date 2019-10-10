import {
    AUTHENTICATION_PASS,
    AUTHENTICATION_ERROR,
    SESSION_EXPIRED,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    REGISTER_PASS,
    REGISTER_FAILED
} from "../actions/authTypes";
let user = JSON.parse(localStorage.getItem('user'));
const initState = {
    loggedIn: !!user,
    user: user ? user : null,
    authError:null
};

const authReducer = (state = initState,action) => {
    switch (action.type) {
        case AUTHENTICATION_PASS:
               
            return {
                ...state,
                loggedIn:true,
                user: action.payload,
                authError:null
            };
        case AUTHENTICATION_ERROR:
          return {
              ...state,
              authError: action.payload.message
          };
        case  LOGOUT_SUCCESS:
            return {
                ...state,
                loggedIn:false,
                user:null,
                authError:null
            };
        case LOGOUT_ERROR:
            return {
                ...state,
                authError:action.payload.message
            };
        case REGISTER_PASS:
            return {
              ...state,
              registerPass:action.payload
            };
        case REGISTER_FAILED:
            return {
                ...state,
                registerFailed:action.payload
            };
        case SESSION_EXPIRED:
            return {
                ...state,
                loggedIn:false,
                user:null,
                authError:null
            };
        default:
            return state;
    }
};

export default authReducer;
