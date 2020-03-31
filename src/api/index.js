import axios from "axios";
import * as actionTypes from "../redux/actions";

const baseUrl = "https://jsonplaceholder.typicode.com";

export const fetchUsers = () => async dispatch => {
  await actionTypes.usersFetchPending();
  await dispatch(actionTypes.setLoader(true));
  try {
    const customers = await axios.get(`${baseUrl}/users`);
    await dispatch(actionTypes.usersFetchSuccess(customers));
  } catch (error) {
    dispatch(actionTypes.usersFetchError(error));
  }
  await dispatch(actionTypes.setLoader(false));
};

export const deleteUser = id => async dispatch => {
  await dispatch(actionTypes.setLoader(true));
  try {
    await axios.delete(`${baseUrl}/users/${id}`);
  } catch (error) {
    console.log("error");
  }
  await dispatch(actionTypes.setLoader(false));
};

export const addUser = data => async dispatch => {
  await dispatch(actionTypes.setLoader(true));

  try {
    await axios.post(`${baseUrl}/users`, data);
  } catch (error) {
    console.log(error);
  }
  await dispatch(actionTypes.setLoader(false));
};

export const updateUser = (id, data) => async dispatch => {
  await dispatch(actionTypes.setLoader(true));

  try {
    await axios.put(`${baseUrl}/users/${id}`, data);
  } catch (error) {
    console.log(error);
  }
  await dispatch(actionTypes.setLoader(false));
};
