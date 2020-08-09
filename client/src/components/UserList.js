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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username:state.username
    }
}

export default connect(mapStateToProps,null)(UserList)