import tgcdtReducer, * as fromTgcdtReducer from '../../redux/tgcdt/reducer';

const rootReducers = {
  tgcdt: tgcdtReducer,
};

export default rootReducers;

export const getSearchData = (state) => fromTgcdtReducer.getSearchData(state.tgcdt);
export const getSearchStatuses = (state) => fromTgcdtReducer.getSearchStatuses(state.tgcdt);

export const getCardData = (state, id) => fromTgcdtReducer.getCardData(state.tgcdt, id);
export const getCardStatuses = (state) => fromTgcdtReducer.getCardStatuses(state.tgcdt);