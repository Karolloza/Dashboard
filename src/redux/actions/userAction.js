export const USERS_FETCH_PENDING = "USERS_FETCH_PENDING";
export const USERS_FETCH_SUCCESS = "USERS_FETCH_SUCCESS";
export const USERS_FETCH_ERROR = "USERS_FETCH_ERROR";

export const usersFetchPending = () => ({
  type: USERS_FETCH_PENDING
});

export const usersFetchSuccess = users => ({
  type: USERS_FETCH_SUCCESS,
  users
});

export const usersFetchError = error => ({
  type: USERS_FETCH_ERROR,
  error
});
