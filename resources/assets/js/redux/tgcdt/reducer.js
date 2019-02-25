import * as actionTypes from './actionTypes';

const defaultPerPage = 25;

const initialState = {
    byId: [],
    statuses: {
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
    byIdRelated: [],
    statusesRelated: {
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
};

const tgcdtReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SEARCH_REQUEST:
            return { ...state, statuses: {...state.statuses, error: '', fetching: true}};
        case actionTypes.GET_SEARCH_FAILURE:
            return { ...state, statuses: {...state.statuses, error: '', fetching: false}};
        case actionTypes.GET_SEARCH_SUCCESS:
            return {
                ...state,
                byId: action.payload.cards.data,
                statuses: {
                    ...state.statuses,
                    error: '',
                    fetching: false,
                    lastUpdated: action.payload.receivedAt,
                    currentPage: action.payload.cards.current_page,
                    from: action.payload.cards.from,
                    lastPage: action.payload.cards.last_page,
                    perPage: action.payload.cards.per_page,
                    to: action.payload.cards.to,
                    total: action.payload.cards.total,
                }
            };

        case actionTypes.GET_CARD_RELATED_REQUEST:
            return { ...state, statusesRelated: {...state.statusesRelated, error: '', fetching: true}};
        case actionTypes.GET_CARD_RELATED_FAILURE:
            return { ...state, statusesRelated: {...state.statusesRelated, error: '', fetching: false}};
        case actionTypes.GET_CARD_RELATED_SUCCESS:
            return {
                ...state,
                byIdRelated: action.payload.cards,
                statusesRelated: {
                    ...state.statusesRelated,
                    error: '',
                    fetching: false,
                    lastUpdated: action.payload.receivedAt,
                    currentPage: action.payload.cards.current_page,
                    from: action.payload.cards.from,
                    lastPage: action.payload.cards.last_page,
                    perPage: action.payload.cards.per_page,
                    to: action.payload.cards.to,
                    total: action.payload.cards.total,
                }
            };

        case actionTypes.GET_CARD_REQUEST:
            return { ...state, statuses: {...state.statuses, error: '', fetching: true}};
        case actionTypes.GET_CARD_FAILURE:
            return { ...state, statuses: {...state.statuses, error: '', fetching: false}};
        case actionTypes.GET_CARD_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.card[0].id]: action.payload.card[0],
                },
                statuses: {
                    ...state.statuses,
                    error: '',
                    fetching: false,
                    lastUpdated: action.payload.receivedAt,
                }
            };

        case actionTypes.GET_SET_SEARCH_REQUEST:
            return { ...state, statuses: {...state.statuses, error: '', fetching: true}};
        case actionTypes.GET_SET_SEARCH_FAILURE:
            return { ...state, statuses: {...state.statuses, error: '', fetching: false}};
        case actionTypes.GET_SET_SEARCH_SUCCESS:
            return {
                ...state,
                byId: action.payload.sets.data,
                statuses: {
                    ...state.statuses,
                    error: '',
                    fetching: false,
                    lastUpdated: action.payload.receivedAt,
                    currentPage: action.payload.sets.current_page,
                    from: action.payload.sets.from,
                    lastPage: action.payload.sets.last_page,
                    perPage: action.payload.sets.per_page,
                    to: action.payload.sets.to,
                    total: action.payload.sets.total,
                }
            };

        case actionTypes.GET_SET_REQUEST:
            return { ...state, statuses: {...state.statuses, error: '', fetching: true}};
        case actionTypes.GET_SET_FAILURE:
            return { ...state, statuses: {...state.statuses, error: '', fetching: false}};
        case actionTypes.GET_SET_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.set[0].id]: action.payload.set[0],
                },
                statuses: {
                    ...state.statuses,
                    error: '',
                    fetching: false,
                    lastUpdated: action.payload.receivedAt,
                }
            };

        default:
            return state;
    }
};

export default tgcdtReducer;

export const getSearchData = (state) => state.byId;
export const getSearchStatuses = (state) => state.statuses;

export const getCardRelatedData = (state) => state.byIdRelated;
export const getCardRelatedStatuses = (state) => state.statusesRelated;

export const getCardData = (state, id) => state.byId[id];
export const getCardStatuses = (state) => state.statuses;

export const getSetSearchData = (state) => state.byId;
export const getSetSearchStatuses = (state) => state.statuses;

export const getSetData = (state, id) => state.byId[id];
export const getSetStatuses = (state) => state.statuses;