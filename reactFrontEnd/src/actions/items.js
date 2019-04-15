import _ from 'lodash';
import api from '../apiConfig/config';

export function itemsHasErrored(bool) {
  return {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function itemsIsLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool,
  };
}
export function itemsFetchDataSuccess(items) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items,
  };
}

export function itemFetchDataSuccess(item) {
  return {
    type: 'ITEM_FETCH_DATA_SUCCESS',
    item,
  };
}

export function selectMovie(id) {
  return {
    type: 'MOVIE_SELECTED_SUCCESFULL',
    id,
  };
}

export function setPageRed(page) {
  return {
    type: 'PAGE_SET',
    page,
  };
}

export function selectedItem(item) {
  return {
    type: 'ITEM_FETCH_DATA_SUCCESS',
    item,
  };
}

export function itemGenres(genres) {
  return {
    type: 'ITEM_GENRES_FETCH_SUCCESS',
    genres,
  };
}

export function itemFetch(id) {
  return async (dispatch) => {
    dispatch(itemsIsLoading(true));
    const { data: { movies }, statusText } = await api.get(`/movie/${id}`);
    if (statusText !== 'OK') dispatch(itemsHasErrored(true));
    //  converting to object like: id: [object]
    dispatch(selectedItem(movies[0]));
    dispatch(itemsIsLoading(false));
  };
}

export function itemFetchGenres(id) {
  return async (dispatch) => {
    dispatch(itemsIsLoading(true));
    const { data: { genres }, statusText } = await api.get(`/moviegenre/${id}?string=true`);
    if (statusText !== 'OK') dispatch(itemsHasErrored(true));
    dispatch(itemGenres(genres));
    dispatch(itemsIsLoading(false));
  };
}

export const itemsFetchData = url => async (dispatch) => {
  dispatch(itemsIsLoading(true));
  console.log('here');
  const { data: { movies }, statusText } = await api.get(url);
  if (statusText !== 'OK') dispatch(itemsHasErrored(true));
  dispatch(itemsFetchDataSuccess(_.keyBy(movies, 'id')));
  dispatch(itemsIsLoading(false));
};
