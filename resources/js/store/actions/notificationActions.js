import axios from 'axios';

export const allNotifications = () => {

	return (dispatch,getState) => {
	   	let user  = JSON.parse(localStorage.getItem('user'));
		axios.get('/api/notifications',{ headers: {Authorization: 'Bearer ' + user.token } })
			.then((res) => {
				 dispatch({type: 'NOTIFICATION_SUCCESS', payload: res.data});
			});
	}

}