import * as actionTypes from './actionTypes';

export function getUnsortedFoldersRequest(name) {
    return {
        type: actionTypes.GET_UNSORTED_FOLDERS_REQUEST,
        payload: {
            name
        },
    };
}

export function getUnsortedFoldersFailure(error) {
    return {
        type: actionTypes.GET_UNSORTED_FOLDERS_FAILURE,
        payload: {
            error,
        },
    };
}

export function getUnsortedFoldersSuccess(name, folders) {
    return {
        type: actionTypes.GET_UNSORTED_FOLDERS_SUCCESS,
        payload: {
            name,
            folders,
            receivedAt: Date.now(),
        },
    };
}

export function getUnsortedResourcesRequest(name) {
    return {
        type: actionTypes.GET_UNSORTED_RESOURCES_REQUEST,
        payload: {
            name
        },
    };
}

export function getUnsortedResourcesFailure(error) {
    return {
        type: actionTypes.GET_UNSORTED_RESOURCES_FAILURE,
        payload: {
            error,
        },
    };
}

export function getUnsortedResourcesSuccess(name, resources) {

    return {
        type: actionTypes.GET_UNSORTED_RESOURCES_SUCCESS,
        payload: {
            name,
            resources,
            receivedAt: Date.now(),
        },
    };
}

export function postLinkImageToCardRequest(s3Path, gameId, cardId, imageType, language) {
    return {
        type: actionTypes.POST_LINK_IMAGE_TO_CARD_REQUEST,
        payload: {
            s3Path,
            gameId,
            cardId,
            imageType,
            language
        },
    };
}

export function postLinkImageToCardFailure(error) {
    return {
        type: actionTypes.POST_LINK_IMAGE_TO_CARD_FAILURE,
        payload: {
            error,
        },
    };
}

export function postLinkImageToCardSuccess(path) {

    return {
        type: actionTypes.POST_LINK_IMAGE_TO_CARD_SUCCESS,
        payload: {
            path,
            receivedAt: Date.now(),
        },
    };
}
