import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import UserContext from '../../contexts/user'

function CreateAuction({ createItem }) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const {user} = useContext(UserContext)

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, marginTop: 12}}>
            <Typography variant='h4'>Create New Auction</Typography>
            <TextField label='Item Name' onChange={e => setName(e.target.value)} />
            <TextField type='number' label='Starting Price' onChange={e => setPrice(parseFloat(e.target.value))} />
            <Button variant='contained' onClick={() => createItem({name, price, auctioneer: user.name})}>Start Auction</Button>
        </Box>
    )
}

CreateAuction.propTypes = {
    createItem: PropTypes.func.isRequired
}

export default CreateAuction