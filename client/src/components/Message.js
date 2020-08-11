import React from 'react'

const Message = function(props){
    if(props.username === ''){
        return (
            <div className="message">
                {/* <span className="user"><strong>{props.username}</strong></span> */}
                <span className="user"><strong><em>{props.message}</em></strong></span>
            </div>
        )
    }else{
        return (
            <div className="message">
                <span className="user"><strong>{props.username}</strong></span>
                <span className="user-message">{props.message}</span>
            </div>
        )
    }
}

export default Message