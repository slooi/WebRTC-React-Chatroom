import {POST_MESSAGE,ADD_REMOTE_MESSAGE,CREATE_USERNAME,ADD_NEW_USER}  from './types.js'


export const postMessage = function(fullMessage){
    console.log('I WAS CALLED, fullMessage:',fullMessage)
    // fullMessage - {username:string , message:string }
    console.log(window.userManager)
    window.userManager.broadcastStr(fullMessage.message)
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
        type:CREATE_USERNAME,
        payload:username
    }
}

export const addNewUser = function(user){
    return {
        type:ADD_NEW_USER,
        payload:user
    }
}
