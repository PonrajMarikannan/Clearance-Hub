import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import

const axiosInstance = axios.create({
    baseURL: 'http://localhost:7070/ccts',
    withCredentials: true, // Include credentials if required
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = sessionStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    alert('Session expired. Please log in again.');
                    sessionStorage.clear();
                    window.location.href = '/';
                    return Promise.reject('Token expired');
                }

                config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error('Error decoding token:', error);
                sessionStorage.clear();
                window.location.href = '/';
                return Promise.reject('Invalid token');
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            alert('Unauthorized access. Please log in again.');
            sessionStorage.clear();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
