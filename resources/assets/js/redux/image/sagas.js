import {call, put, select, takeLatest} from 'redux-saga/effects';
import imageApi from '../../modules/apis/image';

import {
    GET_UNSORTED_FOLDERS_REQUEST,
    GET_UNSORTED_RESOURCES_REQUEST,
    POST_LINK_IMAGE_TO_CARD_REQUEST,
} from './actionTypes';
import {
    getUnsortedFoldersFailure,
    getUnsortedFoldersSuccess,
    getUnsortedResourcesFailure,
    getUnsortedResourcesSuccess,
    postLinkImageToCardFailure,
    postLinkImageToCardSuccess,
} from './actions';

function* imageSaga() {
    yield takeLatest(GET_UNSORTED_FOLDERS_REQUEST, getUnsortedFoldersRequest);
    yield takeLatest(GET_UNSORTED_RESOURCES_REQUEST, getUnsortedResourcesRequest);
    yield takeLatest(POST_LINK_IMAGE_TO_CARD_REQUEST, postLinkImageToCardRequest);
}

function* getUnsortedFoldersRequest(action) {
    try {
        const folders = yield call(imageApi.getUnsortedFolders, action.payload.name);
        console.log(folders);

        yield put(getUnsortedFoldersSuccess(action.payload.name, folders));
    } catch (error) {
        yield put(getUnsortedFoldersFailure(error));
    }
}

function* getUnsortedResourcesRequest(action) {
    try {
        const resources = yield call(imageApi.getUnsortedResources, action.payload.name);
        console.log(resources);
        yield put(getUnsortedResourcesSuccess(action.payload.name, resources));
    } catch (error) {
        yield put(getUnsortedResourcesFailure(error));
    }
}

function* postLinkImageToCardRequest(action) {
    try {
        const response = yield call(
            imageApi.linkImageToCard,
            action.payload.s3Path,
            action.payload.gameId,
            action.payload.cardId,
            action.payload.imageType,
            action.payload.language
        );
        console.log(response);
        yield put(postLinkImageToCardSuccess(action.payload.path));
    } catch (error) {
        yield put(postLinkImageToCardFailure(error));
    }
}

export default imageSaga;