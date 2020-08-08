import React, {Component} from 'react'

class MessageForm extends Component{
    onSubmit(e){
        e.preventDefault()
    }
    
    render(){
        return (
            <form onSubmit={this.onSubmit} className="message-form">
                <input />
            </form>
        )
    }
}


export default MessageForm