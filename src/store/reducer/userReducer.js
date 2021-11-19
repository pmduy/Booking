import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    SEARCH_USER_FAIL,
  } from "store/constants/userType";
  
  const initialState = {
    nguoiDung: null,
    loading: false,
    error: "",
  };
  
  const initState = {
    nguoi: null,
    loading: false,
    error: "",
  };
  
  export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case FETCH_USER_REQUEST:
        return { ...state, loading: true };
  
      case FETCH_USER_SUCCESS:
        return { ...state, nguoiDung: payload, loading: false };
  
      case FETCH_USER_FAIL:
        return { ...state, error: payload, loading: false };
  
      default:
        return state;
    }
  };
  
  export const searchReducer = (state = initState, { type, payload }) => {
    switch (type) {
      case SEARCH_USER_REQUEST:
        return { ...state, loading: true };
  
      case SEARCH_USER_SUCCESS:
        return { ...state, nguoi: payload, loading: false };
  
      case SEARCH_USER_FAIL:
        return { ...state, error: payload, loading: false };
  
      default:
        return state;
    }
  };