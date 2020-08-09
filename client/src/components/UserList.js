import React, {Component} from 'react'
import UserItem from './UserItem'

class UserList extends Component{
    render(){
        return (
            <div className="user-list">
                <UserItem username="Bob"/>
            </div>
        )
    }
}

export default UserList