import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import {thunk} from "redux-thunk"
import {
    appReducer,
    postReducer,
    postsReducer,
    userReducer,
    usersReducer
} from "../reducers/index.js"

const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    users: usersReducer,
    post: postReducer,
    posts: postsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
