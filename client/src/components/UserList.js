import React, {Component} from 'react'
import UserItem from './UserItem'
import {connect} from 'react-redux'

class UserList extends Component{
    constructor(props){
        super(props)
    }

    render = () => {
        return (
            <div className="user-list">
                <UserItem username={this.props.username}/>
                {this.props.users.map(user=><UserItem key={user.id} username={user.username}/>)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username:state.username,
        users:state.users
    }
}

export default connect(mapStateToProps,null)(UserList)