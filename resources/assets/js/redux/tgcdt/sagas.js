import { call, put, select, takeLatest } from 'redux-saga/effects';
import tgcdtApi from '../../modules/apis/tgcdt';

import { GET_SEARCH_REQUEST, GET_CARD_REQUEST } from './actionTypes';
import { getSearchFailure, getSearchSuccess, getCardFailure, getCardSuccess } from './actions';

function* tgcdtSaga() {
    yield takeLatest(GET_SEARCH_REQUEST, getSearchRequest);
    yield takeLatest(GET_CARD_REQUEST, getCardRequest);
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

export default tgcdtSaga;