import {combineReducers} from 'redux'
import {messageReducer} from './messageReducer.js'
import {usernameReducer} from './usernameReducer.js'
import {userReducer} from './userReducer.js'

const rootReducer = combineReducers({
    messages:messageReducer,
    username:usernameReducer,
    users:userReducer
})

export default rootReducer