import {createStore,combineReducers,applyMiddleware,compose } from 'redux'
import rootReducer from './reducers/index.js'
import thunk from 'redux-thunk'

const initalState = {

}


const store = createStore(
    rootReducer
    ,compose(applyMiddleware(thunk)
    // ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
export default store