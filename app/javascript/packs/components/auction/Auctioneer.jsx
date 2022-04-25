import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Auctioneer({ item, bid }) {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, marginTop: 12, border: '1px solid lightgray', padding: 3}}>
            <Typography variant='h4' style={{borderBottom: '1px solid black'}}>Auction Details</Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography style={{fontWeight: 'bold'}}>Item Name:</Typography>
                <Typography>{item.name}</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black'}}>
                <Typography style={{fontWeight: 'bold'}}>Starting Price:</Typography>
                <Typography>{`$${item.price}`}</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography style={{fontWeight: 'bold'}}>Current Price:</Typography>
                <Typography>{bid ? `$${bid.price} - ${bid.name}` : `$${item.price} - You`}</Typography>
            </Box>
        </Box>
    )
}

Auctioneer.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        auctioneer: PropTypes.string
    }),
    bid: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
    }),
}

Auctioneer.defaultProps = {
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

export default Auctioneer