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

export function getCardRequest(id) {
    return {
        type: actionTypes.GET_CARD_REQUEST,
        payload: {
            id,
        },
    };
}

export function getCardFailure(error) {
    return {
        type: actionTypes.GET_CARD_FAILURE,
        payload: {
            error,
        },
    };
}

export function getCardSuccess(card) {
    return {
        type: actionTypes.GET_CARD_SUCCESS,
        payload: {
            card,
            receivedAt: Date.now(),
        },
    };
}