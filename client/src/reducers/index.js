import {combineReducers} from 'redux'
import {messageReducer} from './messageReducer.js'
import {usernameReducer} from './usernameReducer.js'

const rootReducer = combineReducers({
    messages:messageReducer,
    username:usernameReducer
})

export default rootReducer