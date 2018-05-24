import axios from 'axios';
import promise from 'promise';

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': getCookie('XSRF-TOKEN'),
};

axios.interceptors.response.use((response) => response,
    (error) => {
            switch(error.response.status) {
                case 401:
                    break;
                case 402:
                    break;
                default:
                    break;
            }
            return promise.reject(error);
    }
);

export default axios;