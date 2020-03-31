export const SET_MODAL = "SET_MODAL";
export const SET_LOADER = "SET_LOADER";
export const SHOW_TOAST = "SHOW_TOAST";
export const HIDE_TOAST = "HIDE_TOAST";

export const setModal = status => ({
  type: SET_MODAL,
  status
});

export const setLoader = isLoading => ({
  type: SET_LOADER,
  isLoading
});

export const showToast = payload => ({
  type: SHOW_TOAST,
  payload
});

export const hideToast = () => ({
  type: HIDE_TOAST
});
