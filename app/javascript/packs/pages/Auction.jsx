import React, { useState, useContext, useEffect } from 'react'
import ActionCable from 'actioncable'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Axios from 'axios'
import MainLayout from '../components/layouts/Main'
import CreateAuction from '../components/auction/CreateAuction'
import Auctioneer from '../components/auction/Auctioneer'
import Bidder from '../components/auction/Bidder'
import UserContext from '../contexts/user'
import { BIDDER, WS_URL, BASE_URL } from '../constants'

function Auction () {
    const [history, setHistory] = useState([])
    const [err, setErr] = useState('')
    const {user} = useContext(UserContext)

    const handleReceivedMessage = message => {
        setHistory(history => [...history, message.data])
    }

    useEffect(() => {
        Axios.get(`${BASE_URL}/auction`)
            .then(({ data }) => {
                let history = data.history;
                setHistory(history)
            })
            .catch(e => console.log('Error getting auction details'))

        const cable = ActionCable.createConsumer(WS_URL)
        cable.subscriptions.create(
            { channel: 'AuctionChannel' },
            { received: message => handleReceivedMessage(message) }
        )
    }, [])

    const createItem = (item) => {
        Axios.post(`${BASE_URL}/auction`, { message: { type: 'new auction', data: item } })
            .then(() => console.log('Successfully created!'))
            .catch(error => {
                setErr('Create auction failed!')
                setTimeout(() => setErr(''), 1000)
            })
    }

    const sendBid = (bid) => {
        Axios.post(`${BASE_URL}/auction`, { message: { type: 'new bid', data: bid } })
            .then(() => console.log('Successfully bidded!'))
            .catch(error => {
                setErr('Send bid failed!')
                setTimeout(() => setErr(''), 1000)
            })
    }

    return (
        <MainLayout>
            <Box style={{width: 360}}>
                {err && <Typography style={{color: 'red'}}>{err}</Typography>}
                {user.role === BIDDER
                    ? history.length 
                        ? <Bidder item={history[0]} bid={history[history.length - 1]} sendBid={sendBid} />
                        : <></>
                    : history.length
                        ? <Auctioneer history={history} />
                        : <CreateAuction createItem={createItem} />
                }
            </Box>
        </MainLayout>
    )
}

export default Auction