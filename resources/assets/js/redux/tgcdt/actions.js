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

export function getCardRelatedRequest(name, gameId, language, option, page, pageSize) {
    return {
        type: actionTypes.GET_CARD_RELATED_REQUEST,
        payload: {
            name,
            gameId,
            language,
            option,
            page,
            pageSize,
        },
    };
}

export function getCardRelatedFailure(error) {
    return {
        type: actionTypes.GET_CARD_RELATED_FAILURE,
        payload: {
            error,
        },
    };
}

export function getCardRelatedSuccess(cards) {

    return {
        type: actionTypes.GET_CARD_RELATED_SUCCESS,
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

export function getSetSearchRequest(pageSize, page, sorted, filtered) {
    return {
        type: actionTypes.GET_SET_SEARCH_REQUEST,
        payload: {
            pageSize,
            page,
            sorted,
            filtered,
        },
    };
}

export function getSetSearchFailure(error) {
    return {
        type: actionTypes.GET_SET_SEARCH_FAILURE,
        payload: {
            error,
        },
    };
}

export function getSetSearchSuccess(sets) {
    return {
        type: actionTypes.GET_SET_SEARCH_SUCCESS,
        payload: {
            sets,
            receivedAt: Date.now(),
        },
    };
}

export function getSetRequest(id) {
    return {
        type: actionTypes.GET_SET_REQUEST,
        payload: {
            id,
        },
    };
}

export function getSetFailure(error) {
    return {
        type: actionTypes.GET_SET_FAILURE,
        payload: {
            error,
        },
    };
}

export function getSetSuccess(set) {
    return {
        type: actionTypes.GET_SET_SUCCESS,
        payload: {
            set,
            receivedAt: Date.now(),
        },
    };
}