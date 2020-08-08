import React from 'react'

import UserList from './components/UserList.js'
import MainContent from './components/MainContent.js'

const App = () => {
    return (
        <div className="app">
            <UserList />
            <MainContent />
        </div>
    )
}

export default App
