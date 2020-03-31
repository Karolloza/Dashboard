import * as actionTypes from "../actions";

const initialState = {
  pending: false,
  error: null,
  users: null
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USERS_FETCH_PENDING: {
      return {
        ...state,
        pending: true
      };
    }

    case actionTypes.USERS_FETCH_SUCCESS: {
      return {
        ...state,
        pending: false,
        error: null,
        users: action.users
      };
    }

    case actionTypes.USERS_FETCH_ERROR: {
      return {
        ...state,
        pending: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
};

export default usersReducer;
