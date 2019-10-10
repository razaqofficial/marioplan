
const initState = {
	notifications:[]
};

const notificationReducer = (state = initState,action) => {
	switch (action.type) {
        case 'NOTIFICATION_SUCCESS':
        	console.log(action.payload);
        	return {
        		...state,
        		notifications: action.payload
        	}
        	break;
        case 'NOTIFICATION_UPDATE':
        	return {
        		...state,
        		notifications:[...state.notifications,action.payload]
        	}
         default:
            return state;
    }
}

export default notificationReducer;
