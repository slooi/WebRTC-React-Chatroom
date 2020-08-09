import React, {Component} from 'react'
import {postMessage} from '../actions/actions.js'
import {connect} from 'react-redux'


class MessageForm extends Component{
    constructor(props){
        super(props)
    }
    pie = () =>{
        console.log(this)
    }
    onSubmit = (e) => {
        e.preventDefault()
        const message = e.target.message.value
        e.target.message.value = ''

        this.props.postMessage({
            username: "bob famer template name",
            message: message
        })
    }
    
    render(){
        return (
            <form autoComplete="off" onSubmit={this.onSubmit} className="message-form">
                <input name="message"/>
            </form>
        )
    }
}

const mapDispatchToProps = {
    postMessage
}

export default connect(null,mapDispatchToProps)(MessageForm)