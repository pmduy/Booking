import theaterApi from "apis/theaterApi";
import * as theaterType from "../constants/theaterType";

export const actFetchTheaterAction = () => {
    return (dispatch) => {
        dispatch({ type: theaterType.FETCH_THEATER_REQUEST });
        theaterApi
            .fetchTheaterApi()
            .then((res) => {
                dispatch({
                    type: theaterType.FETCH_THEATER_SUCCESS,
                    payload: res.data.content,
                });
            })
            .catch((err) => {
                dispatch({
                    type: theaterType.FETCH_THEATER_FAIL,
                    payload: err,
                });
            });
    };
};