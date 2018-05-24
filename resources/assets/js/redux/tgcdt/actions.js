import * as actionTypes from './actionTypes';

export function getSearchRequest(pageSize, page, sorted, filtered) {
    return {
        type: actionTypes.GET_SEARCH_REQUEST,
        payload: {
            pageSize,
            page,
            sorted,
            filtered,
        },
    };
}

export function getSearchFailure(error) {
    return {
        type: actionTypes.GET_SEARCH_FAILURE,
        payload: {
            error,
        },
    };
}

export function getSearchSuccess(cards) {
    return {
        type: actionTypes.GET_SEARCH_SUCCESS,
        payload: {
            cards,
            receivedAt: Date.now(),
        },
    };
}