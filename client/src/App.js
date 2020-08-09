import React from 'react'
import {connect} from 'react-redux'

import UserList from './components/UserList.js'
import MainContent from './components/MainContent.js'
import UsernameForm from './components/UsernameForm.js'


const App = props => {
    return (
        <div className="app">
            <UserList />
            <MainContent />
            {!(props.username.length>0) && <UsernameForm/>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps,null)(App)
