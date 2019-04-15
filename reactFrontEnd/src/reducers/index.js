import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, selectMovie, selectedItem } from './items';
    
export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    selectMovie,
    selectedItem
});