import {POST_MESSAGE}  from './types.js'


export const postMessage = function(fullMessage){
    console.log('I WAS CALLED, fullMessage:',fullMessage)
    // fullMessage - {username:string , message:string }
    return {
        type:POST_MESSAGE,
        payload:fullMessage
    }
}

export const createUsername = function(username){
    return {
        type:'CREATE_USERNAME',
        payload:username
    }
}