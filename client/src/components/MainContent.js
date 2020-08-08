import React, {Component} from 'react'
import Chat from './Chat.js'
import MessageForm from './MessageForm.js'

class MainContent extends Component{
    render(){
        return (
            <div className="main-content">
                <Chat/>
                <MessageForm/>
            </div>
        )
    }
}

export default MainContent