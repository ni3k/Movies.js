
const INITIAL_STATE = {
  id: '',
  title: '',
  year: '',
  description: '',
};

export function itemsHasErrored(state = false, action) {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}
export function itemsIsLoading(state = false, action) {
  switch (action.type) {
    case 'ITEMS_IS_LOADING':
      return action.isLoading;
    default:
      return state;
  }
}

export function setedPage(state = 1, action) {
  console.log(action);
  switch (action.type) {
    case 'PAGE_SET':
      return action.page;
    default:
      return state;
  }
}

export function items(state = {}, action) {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return { ...state, ...action.items };
    default:
      return state;
  }
}
export function selectedItem(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ITEM_FETCH_DATA_SUCCESS':
      return { ...state, ...action.item };
    default:
      return state;
  }
}

export function itemGenres(state = [], action) {
  switch (action.type) {
    case 'ITEM_GENRES_FETCH_SUCCESS':
      return [...action.genres];
    default:
      return state;
  }
}

export function selectMovie(state = '', action) {
  switch (action.type) {
    case 'MOVIE_SELECTED_SUCCESFULL':
      return action.id;
    case 'MOVIE_RENDER_SUCCESFULL':
      return action;
    default:
      return state;
  }
}
