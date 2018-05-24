import axios from '../axios';

const tgcdtApi = {
    search: (pageSize, page, sorted, filtered, userId) =>
        axios.post('/api/card/search/fancy', { pageSize, page, sorted, filtered, userId })
        .then((response) => response.data),
};

export default tgcdtApi;