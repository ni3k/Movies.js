import axios from "axios";

const API_URL = "http://localhost:4000";

export function itemsHasErrored(bool) {
  return {
    type: "ITEMS_HAS_ERRORED",
    hasErrored: bool
  };
}
export function itemsIsLoading(bool) {
  return {
    type: "ITEMS_IS_LOADING",
    isLoading: bool
  };
}
export function itemsFetchDataSuccess(items) {
  return {
    type: "ITEMS_FETCH_DATA_SUCCESS",
    items
  };
}

export function itemFetchDataSuccess(item) {
  return {
    type: "ITEM_FETCH_DATA_SUCCESS",
    item
  };
}

export function selectMovie(id) {
  return {
    type: "MOVIE_SELECTED_SUCCESFULL",
    id
  }
}

export function itemFetch(id) {
  return async dispatch => {
    dispatch(itemsIsLoading(true));
    const {data: {movies: movies}, statusText} = await axios.get(API_URL+"/movie/"+id);
    if (statusText !== "OK") dispatch(itemsHasErrored(true));
    dispatch(itemFetchDataSuccess(movies[0]));
    dispatch(itemsIsLoading(false));
  }
}

export function itemsFetchData(url) {
  return async dispatch => {
    dispatch(itemsIsLoading(true));
    const { data: {movies: movies}, statusText } = await axios.get(url);
    if (statusText !== "OK") dispatch(itemsHasErrored(true));
    dispatch(itemsFetchDataSuccess(movies));
    dispatch(itemsIsLoading(false));
  };
}
