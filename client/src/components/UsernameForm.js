import React from 'react'
import {connect} from 'react-redux'
import {createUsername,addRemoteMessage,addNewUser,removeUserById} from '../actions/actions.js'


import UserManager from '../UserManager.js'

const UsernameForm = function(props){
    window.userManager = new UserManager()

    const onSubmit = function(e){
        e.preventDefault()
        const username = e.target.username.value
        e.target.username.value = ''
        if(username.length>0){
            props.createUsername(username)

            userManager.setMessageCallback((username,message)=>{
                props.addRemoteMessage({username,message})
            })
            userManager.setGotUserCallback(user=>{
                console.log(user)
                props.addNewUser(user)
            })
            userManager.setUserLeftCallback((id,username)=>{
                props.removeUserById(id)
                
                props.addRemoteMessage({username:'',message:username})
            })

            // Set username
            userManager.setUsername(username)
        }
    }

    
    return (
        <div className="username-form">
            <div className="form-box">
                <div className="username-text-prompt">Enter your username:</div>
                <br/>
                <br/>
                <div className="username-form-container">
                    <form autoComplete="off" onSubmit={onSubmit}>
                        <input name="username"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    createUsername,
    addRemoteMessage,
    addNewUser,
    removeUserById
}

export default connect(null,mapDispatchToProps)(UsernameForm)