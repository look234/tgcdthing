import axios from '../axios';

const tgcdtApi = {
    search: (pageSize, page, sorted, filtered, userId) =>
        axios.post('/api/card/search/fancy', {pageSize, page, sorted, filtered, userId})
            .then((response) => response.data),
    getCardRelated: (name, gameId, language, option, page, pageSize) =>
        axios.get(`/api/card/related`, {
            params: {
                name: name,
                gameId: gameId,
                language: language,
                option: option,
                page: page,
                pageSize: pageSize
            }
        }).then((response) => response.data),
    getCard: (id) =>
        axios.get(`/api/card/${id}`).then((response) => response.data),
    searchSets: (pageSize, page, sorted, filtered, userId) =>
        axios.post(`/api/set/search/fancy`, {pageSize, page, sorted, filtered, userId})
            .then((response) => response.data),
    getSet: (id) =>
        axios.get(`/api/set/${id}`).then((response) => response.data),
};

export default tgcdtApi;