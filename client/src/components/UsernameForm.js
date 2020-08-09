import React from 'react'

const UsernameForm = function(){
    const onSubmit = function(e){
        e.preventDefault()
    }
    return (
        <div className="username-form">
            <div className="form-box">
                <div>Enter your username:</div>
                <br/>
                <br/>
                <div className="username-form-container">
                    <form onSubmit={onSubmit}>
                        <input/>
                    </form>
                </div>
            </div>
        </div>
    )
} 

export default UsernameForm