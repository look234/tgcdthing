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

        default:
            return state;
    }
};

export default tgcdtReducer;

export const getSearchData = (state) => state.byId;
export const getSearchStatuses = (state) => state.statuses;