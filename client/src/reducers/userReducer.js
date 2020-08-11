import {ADD_NEW_USER} from '../actions/types.js'

const initalState = [] // Array of objects

export const userReducer = function(state = initalState, action){
    switch(action.type){
        case ADD_NEW_USER:
            return [...state,action.payload]
        default:
            return state
    }   
}