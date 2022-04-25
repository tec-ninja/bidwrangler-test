import React from 'react'
import Box from '@mui/material/Box'
import Header from "../common/Header"

function Main({ children }) {
    return (
        <Box>
            <Header />
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                {children}
            </Box>
        </Box>
    )
}

export default Main