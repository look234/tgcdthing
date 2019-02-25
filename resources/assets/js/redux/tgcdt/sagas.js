import {call, put, select, takeLatest} from 'redux-saga/effects';
import tgcdtApi from '../../modules/apis/tgcdt';

import {GET_SEARCH_REQUEST, GET_CARD_REQUEST, GET_SET_SEARCH_REQUEST, GET_SET_REQUEST} from './actionTypes';
import {
    getSearchFailure,
    getSearchSuccess,
    getCardFailure,
    getCardSuccess,
    getSetSearchFailure,
    getSetSearchSuccess,
    getSetFailure,
    getSetSuccess
} from './actions';

function* tgcdtSaga() {
    yield takeLatest(GET_SEARCH_REQUEST, getSearchRequest);
    yield takeLatest(GET_CARD_REQUEST, getCardRequest);
    yield takeLatest(GET_SET_SEARCH_REQUEST, getSetSearchRequest);
    yield takeLatest(GET_SET_REQUEST, getSetRequest);
}

function* getSearchRequest(action) {
    try {
        const cards = yield call(tgcdtApi.search, action.payload.pageSize, action.payload.page,
            action.payload.sorted, action.payload.filtered);
        console.log(cards);
        yield put(getSearchSuccess(cards));
    } catch (error) {
        yield put(getSearchFailure(error));
    }
}

function* getCardRequest(action) {
    try {
        console.log(action);
        const card = yield call(tgcdtApi.getCard, action.payload.id);
        console.log(card);
        yield put(getCardSuccess(card));
    } catch (error) {
        yield put(getCardFailure(error));
    }
}

function* getSetSearchRequest(action) {
    try {
        const sets = yield call(tgcdtApi.searchSets, action.payload.pageSize, action.payload.page,
            action.payload.sorted, action.payload.filtered);
        console.log(sets);
        yield put(getSetSearchSuccess(sets));
    } catch (error) {
        yield put(getSetSearchFailure(error));
    }
}

function* getSetRequest(action) {
    try {
        console.log(action);
        const set = yield call(tgcdtApi.getSet, action.payload.id);
        console.log(set);
        yield put(getSetSuccess(set));
    } catch (error) {
        yield put(getSetFailure(error));
    }
}


export default tgcdtSaga;