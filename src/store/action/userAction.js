import userApi from "apis/userApi";
import toast from "react-hot-toast";
import {
  FETCH_USER_FAIL,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAIL,
} from "store/constants/userType";

export const actFetchUserAction = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_USER_REQUEST });
    userApi
      .getAllUserApi()
      .then((res) => {
        dispatch({ type: FETCH_USER_SUCCESS, payload: res.data.content });
      })
      .catch((err) => {
        dispatch({ type: FETCH_USER_FAIL, payload: err });
      });
  };
};

export const actSearchUserAction = (ten) => {
  return (dispatch) => {
    dispatch({ type: SEARCH_USER_REQUEST });
    userApi
      .searchUserApi(ten)
      .then((res) => {
        dispatch({ type: SEARCH_USER_SUCCESS, payload: res.data.content });
        if(res.data.content.length == 0 && ten != "") {
          toast.error("Không thể tìm kiếm!")
        }
      })
      .catch((err) => {
        dispatch({ type: SEARCH_USER_FAIL, payload: err });
      });
  };
};