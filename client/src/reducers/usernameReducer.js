import {CREATE_USERNAME} from '../actions/action.js'

const initalState = ''

export const usernameReducer = function(state = initalState,action){
    switch(action.type){
        case CREATE_USERNAME:
            return action.payload
        default:
            return state
    }
}