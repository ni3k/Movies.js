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

export function clearItem() {
  return {
    type: 'CLEAR_ITEM',
  };
}

export function setAuth(auth) {
  return {
    type: 'USER_STATUS_SET',
    auth,
  };
}

export function setPagination(pages) {
  return {
    type: 'PAGINATION_SET_SUCCESSFULL',
    pages,
  };
}

export function toogleButton(seen) {
  return {
    type: 'SET_TOOGLE_BUTTON',
    seen,
  };
}

export function checkElibility(id) {
  return async (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const { data: { movie } } = await api.get(`/checkMovie/${id}`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    dispatch(toogleButton(movie));
  };
}

export function setPageRed(page) {
  return {
    type: 'PAGE_SET',
    page,
  };
}
