import React from 'react'

import UserList from './components/UserList.js'
import MainContent from './components/MainContent.js'
import UsernameForm from './components/UsernameForm.js'

const App = () => {
    return (
        <div className="app">
            <UserList />
            <MainContent />
            <UsernameForm/>
        </div>
    )
}

export default App
