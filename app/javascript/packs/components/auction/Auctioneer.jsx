import React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function Auctioneer({ history }) {
    console.log(history)
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, marginTop: 12, border: '1px solid lightgray', padding: 3}}>
            <Typography variant='h4' style={{borderBottom: '1px solid black'}}>Auction Details</Typography>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography style={{fontWeight: 'bold'}}>Item Name:</Typography>
                <Typography>{history[0].name}</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid black'}}>
                <Typography style={{fontWeight: 'bold'}}>Starting Price:</Typography>
                <Typography>{`$${history[0].price}`}</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography style={{fontWeight: 'bold'}}>Current Price:</Typography>
                <Typography>{history.length > 1 ? `$${history[history.length - 1].price} - ${history[history.length - 1].name}` : `$${history[0].price} - You`}</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                <Typography style={{fontWeight: 'bold', color: 'blue'}}>Prior Bids</Typography>
                {history.length > 2 
                    ? history.slice(1, history.length - 1).map((item, index) => (
                        <Typography key={index}>{`$${item.price} - ${item.name}`}</Typography>
                    )) 
                    : <Typography>No prior bids!</Typography>}
            </Box>
        </Box>
    )
}

Auctioneer.propTypes = {
    history: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
        auctioneer: PropTypes.string
    })),
}

Auctioneer.defaultProps = {
    history: [
        {
            name: 'Satan',
            price: 100,
            auctioneer: 'Auctioneer'
        },
        {
            name: 'Tokky',
            price: 200
        }
    ]
}

export default Auctioneer