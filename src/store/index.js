import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducer/authReducer";
import bookingReducer from "./reducer/bookingRecuder";
import movieReducer from "./reducer/movieReducer";
import showtimeReducer from "./reducer/showtimeReducer";
import theaterReducer from "./reducer/theaterReducer";
import { searchReducer, userReducer } from "./reducer/userReducer";

const rootReducer = combineReducers({
    movieReducer:movieReducer,
    authReducer:authReducer,
    showtimeReducer:showtimeReducer,
    bookingReducer:bookingReducer,
    theaterReducer:theaterReducer,
    userReducer: userReducer,
    searchReducer: searchReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
