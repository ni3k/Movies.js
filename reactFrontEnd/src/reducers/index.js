import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, selectMovie } from './items';
    
export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    selectMovie
});