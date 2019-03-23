import tgcdtReducer, * as fromTgcdtReducer from '../../redux/tgcdt/reducer';
import imageReducer, * as fromImageReducer from '../../redux/image/reducer';

const rootReducers = {
    tgcdt: tgcdtReducer,
    images: imageReducer,
};

export default rootReducers;

export const getSearchData = (state) => fromTgcdtReducer.getSearchData(state.tgcdt);
export const getSearchStatuses = (state) => fromTgcdtReducer.getSearchStatuses(state.tgcdt);

export const getCardRelatedData = (state) => fromTgcdtReducer.getCardRelatedData(state.tgcdt);
export const getCardRelatedStatuses = (state) => fromTgcdtReducer.getCardRelatedStatuses(state.tgcdt);

export const getCardData = (state, id) => fromTgcdtReducer.getCardData(state.tgcdt, id);
export const getCardStatuses = (state) => fromTgcdtReducer.getCardStatuses(state.tgcdt);

export const getSetSearchData = (state) => fromTgcdtReducer.getSetSearchData(state.tgcdt);
export const getSetSearchStatuses = (state) => fromTgcdtReducer.getSetSearchStatuses(state.tgcdt);

export const getSetData = (state, id) => fromTgcdtReducer.getSetData(state.tgcdt, id);
export const getSetStatuses = (state) => fromTgcdtReducer.getSetStatuses(state.tgcdt);

export const getUnsortedFoldersData = (state) => fromImageReducer.getUnsortedFoldersData(state.images);
export const getUnsortedFoldersStatuses = (state) => fromImageReducer.getUnsortedFoldersStatuses(state.images);

export const getUnsortedResourcesData = (state) => fromImageReducer.getUnsortedResourcesData(state.images);
export const getUnsortedResourcesStatuses = (state) => fromImageReducer.getUnsortedResourcesStatuses(state.images);

export const getUploadsData = (state) => fromImageReducer.getUploadsData(state.images);
export const getUploadsStatuses = (state) => fromImageReducer.getUploadsStatuses(state.images);