import * as actionTypes from './actionTypes';

const defaultPerPage = 25;

const initialState = {
    folders: {},
    foldersStatuses: {
        fetching: false,
        error: '',
        lastUpdated: 0,
        currentPage: 0,
        from: 0,
        lastPage: 0,
        perPage: defaultPerPage,
        to: defaultPerPage,
        total: 0,
    },
    resources: {},
    resourcesStatuses: {
        fetching: false,
        error: '',
        lastUpdated: 0,
        currentPage: 0,
        from: 0,
        lastPage: 0,
        perPage: defaultPerPage,
        to: defaultPerPage,
        total: 0,
    },
    uploads: {},
    uploadsStatuses: {
        fetching: false,
        error: '',
        lastUpdated: 0,
    },
};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_UNSORTED_FOLDERS_REQUEST:
            return { ...state, foldersStatuses: {...state.foldersStatuses, error: '', fetching: true}};
        case actionTypes.GET_UNSORTED_FOLDERS_FAILURE:
            return { ...state, foldersStatuses: {...state.foldersStatuses, error: '', fetching: false}};
        case actionTypes.GET_UNSORTED_FOLDERS_SUCCESS:
            const folderUpdates = {...state.folders};
            folderUpdates[action.payload.name] = action.payload.folders;

            return {
                ...state,
                folders: folderUpdates,
                foldersStatuses: {
                    ...state.statuses,
                    error: '',
                    fetching: false,
                    lastUpdated: action.payload.receivedAt,
                }
            };

        case actionTypes.GET_UNSORTED_RESOURCES_REQUEST:
            return { ...state, resourcesStatuses: {...state.resourcesStatuses, error: '', fetching: true}};
        case actionTypes.GET_UNSORTED_RESOURCES_FAILURE:
            return { ...state, resourcesStatuses: {...state.resourcesStatuses, error: '', fetching: false}};
        case actionTypes.GET_UNSORTED_RESOURCES_SUCCESS:
            const updates = {...state.resources};
            updates[action.payload.name] = action.payload.resources;

            return {
                ...state,
                resources: updates,
                resourcesStatuses: {
                    ...state.statusesRelated,
                    error: '',
                    fetching: false,
                    lastUpdated: action.payload.receivedAt,
                }
            };

        case actionTypes.POST_LINK_IMAGE_TO_CARD_REQUEST:
            return { ...state, uploadsStatuses: {...state.uploadsStatuses, error: '', fetching: true}};
        case actionTypes.POST_LINK_IMAGE_TO_CARD_FAILURE:
            return { ...state, uploadsStatuses: {...state.uploadsStatuses, error: '', fetching: false}};
        case actionTypes.POST_LINK_IMAGE_TO_CARD_SUCCESS:

            return {
                ...state,
                uploads: action.payload.path,
                uploadsStatuses: {
                    ...state.uploadsStatuses,
                    error: '',
                    fetching: false,
                    lastUpdated: action.payload.receivedAt,
                }
            };

        default:
            return state;
    }
};

export default imageReducer;

export const getUnsortedFoldersData = (state) => state.folders;
export const getUnsortedFoldersStatuses = (state) => state.foldersStatuses;

export const getUnsortedResourcesData = (state) => state.resources;
export const getUnsortedResourcesStatuses = (state) => state.resourcesStatuses;

export const getUploadsData = (state) => state.uploads;
export const getUploadsStatuses = (state) => state.uploadsStatuses;
