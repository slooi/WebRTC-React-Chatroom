import React, {Component} from 'react'
import Message from './Message.js'
import {connect} from 'react-redux'
import {postMessage} from '../actions/actions.js'




class Chat extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        // window.network = new Network() //!@#!@!@#
    }
    render(){
        console.log(this.props)
        return (
            <div className="chat">
                {this.props.messages.map((fullMessage,i)=>
                    <Message key={i} user={fullMessage.username} message={fullMessage.message}/>
                )}
            {/* <Message user="steve"  message="I'm awesome!"/> */}
            {/* <Message user="steve"  message="I'm awesome!"/> */}
            </div>
        )
    }
}

const mapStateToProps = function(state){
    return {
        messages:state.messages
    }
}

const mapDispatchToProps = {
    postMessage
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat)