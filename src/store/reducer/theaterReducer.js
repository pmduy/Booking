import * as theaterType from "../constants/theaterType";

const initialState = {
    theater: null,
    loading: false,
    error: "",
};

const theaterReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case theaterType.FETCH_THEATER_REQUEST:
            return { ...state, loading: true };

        case theaterType.FETCH_THEATER_SUCCESS:
            return { ...state, theater: payload, loading: false };

        case theaterType.FETCH_THEATER_FAIL:
            return { ...state, error: payload, loading: false };

        default:
            return state;
    }
};
export default theaterReducer;