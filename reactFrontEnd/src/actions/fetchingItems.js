import api from '../apiConfig/config';

import { itemsHasErrored, itemsIsLoading, setPagination } from './interactions';
import { selectedItem } from './itemHandling';

export function itemsFetchDataSuccess(items) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items,
  };
}

export function allGenres(genres) {
  return {
    type: 'GENRE_FETCH_SUCCESS',
    genres,
  };
}

export function randomItems(items) {
  return {
    type: 'RANDOM_ITEMS_SUCCESS',
    items,
  };
}

export function itemFetchDataSuccess(item) {
  return {
    type: 'ITEM_FETCH_DATA_SUCCESS',
    item,
  };
}

export function fetchGenres() {
  return async (dispatch) => {
    const { data: { genre }, statusText } = await api.get('/allgenres');
    if (statusText !== 'OK') dispatch(itemsHasErrored(true));
    const filtred = await Promise.all(
      genre.map(g => ({ key: g.id, text: g.title, value: g.id })),
    );
    dispatch(allGenres(filtred));
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
    dispatch(selectedItem(movies));
    dispatch(itemGenres(movies.genres));
    dispatch(itemsIsLoading(false));
  };
}

export function fetchSearchTerm(page) {
  return async (dispatch, getState) => {
    const { searchTerm } = getState();
    dispatch(itemsIsLoading(true));
    const { data: { movies, pages }, statusText } = await api.get(`/searchTitle?title=${searchTerm}&page=${page}`);
    if (statusText !== 'OK') dispatch(itemsHasErrored(true));
    dispatch(itemsFetchDataSuccess(movies));
    dispatch(setPagination(pages));
    dispatch(itemsIsLoading(false));
  };
}

export const itemsFetchData = url => async (dispatch) => {
  dispatch(itemsIsLoading(true));
  const token = localStorage.getItem('token');
  const { data: { movies, pages }, statusText } = await api.get(url, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  if (statusText !== 'OK') dispatch(itemsHasErrored(true));
  dispatch(setPagination(pages));
  dispatch(itemsFetchDataSuccess(movies));
  dispatch(itemsIsLoading(false));
};

export const randomItemsFetch = nr => async (dispatch) => {
  const { data: { movies }, statusText } = await api.get(`/random_movie?number=${nr}`);
  if (statusText !== 'OK') dispatch(itemsHasErrored(true));
  dispatch(randomItems(movies));
};
