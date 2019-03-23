import { fork, all } from 'redux-saga/effects';
import tgcdtSagas from '../../redux/tgcdt/sagas';
import imageSagas from '../../redux/image/sagas';

function* rootSaga() {
    yield all([
        fork(tgcdtSagas),
        fork(imageSagas),
    ]);
}

export default rootSaga;