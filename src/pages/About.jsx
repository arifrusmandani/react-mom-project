import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';

export default function About() {
  document.title = 'MOM - About';

  return (
    <>
    <div className='bgcolor'>
      <Navbar />
      <Box height={70}/>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>About</h1>
        </Box>
      </Box>
    </div>
    </>
  )
}
