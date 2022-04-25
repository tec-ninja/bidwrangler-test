import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Auction from '../pages/Auction'
import UserContext from '../contexts/user'

function RouteList() {
    const [user, setUser] = useState({
        name: '',
        role: ''
    })

    return (
        <UserContext.Provider value={{user, setUser}}>
            <Router>
                <Routes>
                    <Route path='/' exact element={<Login />} />
                    <Route path='/auctiondetail' exact element={<Auction />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    )
}

export default RouteList