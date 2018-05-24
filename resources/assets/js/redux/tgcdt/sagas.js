import { call, put, select, takeLatest } from 'redux-saga/effects';
import tgcdtApi from '../../modules/apis/tgcdt';

import { GET_SEARCH_REQUEST } from './actionTypes';
import { getSearchFailure, getSearchSuccess } from './actions';

function* tgcdtSaga() {
    yield takeLatest(GET_SEARCH_REQUEST, getSearchRequest);
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

export default tgcdtSaga;