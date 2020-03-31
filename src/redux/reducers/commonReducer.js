import * as actionTypes from "../actions";

const initialState = {
  setModal: false,
  isLoading: false,
  toast: {
    show: false,
    body: "Success",
    type: "success"
  }
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MODAL: {
      return {
        ...state,
        setModal: action.status
      };
    }
    case actionTypes.SET_LOADER:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case actionTypes.SHOW_TOAST:
      return {
        ...state,
        toast: {
          show: true,
          body: action.payload.body || initialState.toast.body,
          type: action.payload.type || initialState.toast.type
        }
      };
    case actionTypes.HIDE_TOAST:
      return {
        ...state,
        toast: {
          show: false
        }
      };
    default: {
      return state;
    }
  }
};

export default commonReducer;
