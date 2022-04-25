import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import UserContext from '../../contexts/user'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function Bidder({ item, bid, sendBid }) {
    const {user, setUser} = useContext(UserContext)

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, marginTop: 12, border: '1px solid lightgray', padding: 3}}>
            <Typography variant='h4' style={{borderBottom: '1px solid black'}}>Auction Details</Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography style={{fontWeight: 'bold'}}>Item Name:</Typography>
                <Typography>{item.name}</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black'}}>
                <Typography style={{fontWeight: 'bold'}}>Current Price:</Typography>
                <Typography>{bid ? `$${bid.price} - ${bid.name}` : `$${item.price} - ${item.auctioneer}`}</Typography>
            </Box>
            {bid && user.name === bid.name
                ? <Button variant='contained' disabled>{`You bid $${bid.price}`}</Button>
                : <Button variant='contained' onClick={() => sendBid({name: user.name, price: bid?.price ? bid.price + 100 : item.price + 100})}>
                    {`Bid $${bid?.price ? bid.price + 100 : item.price + 100}`}
                  </Button>}
        </Box>
    )
}

Bidder.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        auctioneer: PropTypes.string
    }),
    bid: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
    }),
    sendBid: PropTypes.func
}

Bidder.defaultProps = {
    item: {
        name: 'Satan',
        price: 100,
        auctioneer: 'Auctioneer'
    },
    bid: {
        name: 'Tokky',
        price: 200
    }
}

export default Bidder