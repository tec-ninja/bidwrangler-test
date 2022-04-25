import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import UserContext from '../../contexts/user'
import { BIDDER, AUCTIONEER } from '../../constants'

function Login() {
    const navigate = useNavigate()

    const {user, setUser} = useContext(UserContext)
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [err, setErr] = useState('')

    const login = () => {
        if (!name || !role) {
            setErr('Name and role must be specified')
            setTimeout(() => setErr(''), 1000)
            return
        }
        setUser({name, role})
        navigate('/auctiondetail')
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, padding: 3, width: 360, marginTop: 12, border: 'solid 1px lightgray'}}>
            <Typography variant='h4'>LOG IN</Typography>
            {err && <Typography style={{color: 'red'}}>{err}</Typography>}
            <FormControl>
                <TextField variant='outlined' label='Name' onChange={e => setName(e.target.value)} required />
            </FormControl>
            <FormControl required>
                <InputLabel htmlFor='role'>Role</InputLabel>
                <Select value={role} label='Role' id='role' onChange={e => setRole(e.target.value)}>
                    <MenuItem value={AUCTIONEER}>Auctioneer</MenuItem>
                    <MenuItem value={BIDDER}>Bidder</MenuItem>
                </Select>
            </FormControl>
            <Button variant='contained' onClick={login}>Login</Button>
        </Box>
    )
}

export default Login