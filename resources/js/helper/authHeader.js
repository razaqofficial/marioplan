export const authHeader = () => {
  //return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

        return { Authorization: 'Bearer ' + user.token  }
};
