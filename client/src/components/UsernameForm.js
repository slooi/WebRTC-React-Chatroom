import React from 'react'
import {connect} from 'react-redux'
import {createUsername,addRemoteMessage,addNewUsername} from '../actions/actions.js'


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
            userManager.setGotUsernameCallback(username=>{
                console.log(username)
                props.addNewUsername(username)
            })

            // Set username
            userManager.setUsername(username)
        }
    }

    
    return (
        <div className="username-form">
            <div className="form-box">
                <div>Enter your username:</div>
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
    addNewUsername
}

export default connect(null,mapDispatchToProps)(UsernameForm)