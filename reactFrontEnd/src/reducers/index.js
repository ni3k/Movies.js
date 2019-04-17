import { combineReducers } from 'redux';
import {
  items,
  itemsHasErrored,
  itemsIsLoading,
  selectMovie,
  selectedItem,
  itemGenres,
  setedPage,
  randomItems,
  genres,
  filters,
} from './items';

export default combineReducers({
  items,
  itemsHasErrored,
  itemsIsLoading,
  selectMovie,
  selectedItem,
  itemGenres,
  setedPage,
  randomItems,
  genres,
  filters,
});
