import {POST_MESSAGE,ADD_REMOTE_MESSAGE}  from './types.js'


export const postMessage = function(fullMessage){
    console.log('I WAS CALLED, fullMessage:',fullMessage)
    // fullMessage - {username:string , message:string }
    return {
        type:POST_MESSAGE,
        payload:fullMessage
    }
}

export const addRemoteMessage = function(fullMessage){
    return {
        type: ADD_REMOTE_MESSAGE,
        payload:fullMessage
    }
}

export const createUsername = function(username){
    return {
        type:'CREATE_USERNAME',
        payload:username
    }
}