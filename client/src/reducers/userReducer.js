import {ADD_NEW_USER, REMOVE_USER} from '../actions/types.js'

const initalState = [] // Array of objects

export const userReducer = function(state = initalState, action){
    console.log('HERE IS YOUR ACTION',action)
    switch(action.type){
        case ADD_NEW_USER:
            return [...state,action.payload]
        case REMOVE_USER:
            console.log('REMOVE_USER called')
            const result = state.filter(user=>{
                if(user.id !== action.payload){
                    return user
                }else{
                    console.log('REMOVED: ',user)
                }
            })
            console.log(result)
            return result
        default:
            return state
    }   
}