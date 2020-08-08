import React, {Component} from 'react'

class Message extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log(this.props.messages)
        return (
            <div className="message">
                <span className="user">{this.props.user}</span>
                <span className="user-message">{this.props.message}</span>
                
            </div>
        )
    }
}

export default Message