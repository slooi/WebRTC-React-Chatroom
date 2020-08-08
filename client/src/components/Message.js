import React from 'react'

const Message = function(props){
    return (
        <div className="message">
            <span className="user">{props.user}</span>
            <span className="user-message">{props.message}</span>
        </div>
    )
}

export default Message