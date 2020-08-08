import React, {Component} from 'react'
import Message from './Message.js'

class Chat extends Component{
    render(){
        return (
            <div className="chat">
                <Message user="bob" message="Hello World!"/>
                <Message user="steve"  message="I'm awesome!"/>
                <Message user="steve"  message="I'm awesome!"/>
            </div>
        )
    }
}

export default Chat