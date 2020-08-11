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
                {this.props.usernames.map((username,i)=><UserItem key={i} username={username}/>)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        usernames:state.usernames
    }
}

export default connect(mapStateToProps,null)(UserList)