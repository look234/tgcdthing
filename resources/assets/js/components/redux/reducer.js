import tgcdtReducer, * as fromTgcdtReducer from '../../redux/tgcdt/reducer';

const rootReducers = {
  tgcdt: tgcdtReducer,
};

export default rootReducers;

export const getSearchData = (state) => fromTgcdtReducer.getSearchData(state.tgcdt);
export const getSearchStatuses = (state) => fromTgcdtReducer.getSearchStatuses(state.tgcdt);