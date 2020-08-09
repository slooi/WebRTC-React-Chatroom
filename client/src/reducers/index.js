import {combineReducers} from 'redux'
import {messageReducer} from './messageReducer.js'

const rootReducer = combineReducers({
    messages:messageReducer
})

export default rootReducer