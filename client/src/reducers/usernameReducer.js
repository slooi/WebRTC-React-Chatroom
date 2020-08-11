import {CREATE_USERNAME,ADD_NEW_USERNAME} from '../actions/types.js'

const initalState = ['']

export const usernameReducer = function(state = initalState,action){
    switch(action.type){
        case CREATE_USERNAME:
            return [action.payload]
        case ADD_NEW_USERNAME:
            return [...state,action.payload]
        default:
            return state
    }
}