import axios from 'axios';


const setAuthHeader = (token) => {
    if (token) {
        axios.defaults.headers = {
            JWT: token,
        };
    } else {
        delete axios.defaults.headers.JWT;
    }
};


export default setAuthHeader;
