import { fork, all } from 'redux-saga/effects';
import tgcdtSagas from '../../redux/tgcdt/sagas';

function* rootSaga() {
    yield all([
        fork(tgcdtSagas),
    ]);
}

export default rootSaga;