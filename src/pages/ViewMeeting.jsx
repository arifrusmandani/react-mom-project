import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import MeetingDocument from './meeting/MeetingDocument';

export default function ViewMeeting() {
  document.title = 'MOM - Document View';

  return (
    <>
    <div className='bgcolor'>
      <Navbar />
      <Box height={70}/>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <MeetingDocument/>
        </Box>
      </Box>
    </div>
    </>
  )
}
