import {jwtDecode} from 'jwt-decode';

export const getToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {

            localStorage.removeItem('token');
            return null;
        }

        return decoded;
    } catch (error) {

        localStorage.removeItem('token');
        return null;
    }
};
