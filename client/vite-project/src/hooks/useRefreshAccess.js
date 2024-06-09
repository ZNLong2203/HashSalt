import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const useRefreshAccess = async () => {
    try {
        const res = await axios.post('http://localhost:3000/auth/refresh');
        localStorage.setItem('accessToken', res.data.accessToken);
        return res.data.accessToken;
    } catch(err) {
        console.error(err);
    }
}

// Axios interceptor to refresh access token
axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            const {exp} = jwtDecode(accessToken);
            if(Date.now() >= exp * 1000) {
                await useRefreshAccess();
            }
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default {useRefreshAccess};