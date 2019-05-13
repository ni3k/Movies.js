import api from '../apiConfig/config';

import { itemsIsLoading } from './interactions';

export function setSearchTerm(term) {
  return {
    type: 'SETED_SEARCH_TERM',
    term,
  };
}

export function selectMovie(id) {
  return {
    type: 'MOVIE_SELECTED_SUCCESFULL',
    id,
  };
}


export function setFilter(filters) {
  return {
    type: 'FILTER_SET',
    filters,
  };
}

export function selectedItem(item) {
  return {
    type: 'ITEM_FETCH_DATA_SUCCESS',
    item,
  };
}


export function saveItem(movieId) {
  return async (dispatch) => {
    dispatch(itemsIsLoading(true));
    const token = localStorage.getItem('token');
    await api.get(`/watchlater/${movieId}`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    dispatch(itemsIsLoading(false));
  };
}
