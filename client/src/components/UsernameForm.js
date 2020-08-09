import React from 'react'
import {connect} from 'react-redux'
import {createUsername} from '../actions/actions.js'

const UsernameForm = function(props){
    const onSubmit = function(e){
        e.preventDefault()
        const username = e.target.username.value
        e.target.username.value = ''
        props.createUsername(username)
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
    createUsername
}

export default connect(null,mapDispatchToProps)(UsernameForm)