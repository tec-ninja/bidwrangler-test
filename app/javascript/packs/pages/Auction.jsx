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
    const [item, setItem] = useState(null)
    const [bid, setBid] = useState(null)
    const [err, setErr] = useState('')
    const {user} = useContext(UserContext)

    const handleReceivedMessage = message => {
        if (message.type === 'new auction') {
            setItem(message.data)
        } else if (message.type === 'new bid') {
            setBid(message.data)
        }
    }

    useEffect(() => {
        Axios.get(`${BASE_URL}/auction`)
            .then(({ data }) => {
                setItem(data.item);
                setBid(data.bid);
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
            .then(() => setItem(item))
            .catch(error => {
                setErr('Create auction failed!')
                setTimeout(() => setErr(''), 1000)
            })
    }

    const sendBid = (bid) => {
        Axios.post(`${BASE_URL}/auction`, { message: { type: 'new bid', data: bid } })
            .then(() => setBid(bid))
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
                    ? item 
                        ? <Bidder item={item} bid={bid} sendBid={sendBid} />
                        : <></>
                    : item
                        ? <Auctioneer item={item} bid={bid} />
                        : <CreateAuction createItem={createItem} />
                }
            </Box>
        </MainLayout>
    )
}

export default Auction