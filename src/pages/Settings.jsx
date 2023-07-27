import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';

export default function Settings() {
  document.title = 'MOM - Settings';
  
  return (
    <>
    <div className='bgcolor'>
      <Navbar />
      <Box height={70}/>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Settings</h1>
        </Box>
      </Box>
    </div>
    </>
  )
}
