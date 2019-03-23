import axios from '../axios';

const imageApi = {
    getUnsortedFolders: (name) => {
        console.log('getUnsortedFolders');
        return axios.get(`/api/image/unsorted/folder/${name}`)
            .then((response) => response.data);
    },
    getUnsortedResources: (name) =>
        axios.get(`/api/image/unsorted/resource/${name}`)
            .then((response) => response.data),
    linkImageToCard: (s3Path, gameId, cardId, imageType, language) =>
        axios.post('/api/image/unsorted/link', {s3Path, gameId, cardId, imageType, language})
            .then((response) => response.data),
};

export default imageApi;