import axios from 'axios';


export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}
export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}
export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function itemsFetchData(url) {
    return async (dispatch) => {
        dispatch(itemsIsLoading(true));
        const {data: movies, statusText } = await axios.get(url);
        if (statusText !== 'OK')
            dispatch(itemsHasErrored(true));
        dispatch(itemsFetchDataSuccess(movies.movies))
        dispatch(itemsIsLoading(false));
    }
}