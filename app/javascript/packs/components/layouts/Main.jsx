import React from 'react'
import Header from "../common/Header"

import Box from '@mui/material/Box'

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