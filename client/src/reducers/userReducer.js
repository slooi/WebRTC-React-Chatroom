import {ADD_NEW_USER, REMOVE_USER} from '../actions/types.js'

const initalState = [] // Array of objects

export const userReducer = function(state = initalState, action){
    switch(action.type){
        case ADD_NEW_USER:
            return [...state,action.payload]
        case REMOVE_USER:
            const result = state.filter(user=>{
                if(user.id !== action.payload){
                    return user
                }
            })
            return result
        default:
            return state
    }   
}