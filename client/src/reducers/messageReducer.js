import {POST_MESSAGE,CREATE_USERNAME} from '../actions/types.js'

const initialState = []

export const messageReducer = function(state = initialState, action){
    switch(action.type){
        case POST_MESSAGE:
            // payload - {username:string , message:string }
            return [...state,action.payload]
        default:
            return state
    }
}