import React, {Component} from 'react'


const UserItem = function(props){
    return (
        <div className="user-item">
            {props.username}
        </div>
    )
}

export default UserItem