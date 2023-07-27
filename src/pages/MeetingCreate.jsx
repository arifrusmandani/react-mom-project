import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import CreateFormMeeting from './meeting/CreateFormMeeting';

export default function MeetingCreate() {
  document.title = 'MOM - Create Meeting';
  return (
    <>
    <div className='bgcolor'>
      <Navbar />
      <Box height={70}/>
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <CreateFormMeeting/>
        </Box>
      </Box>
    </div>
    </>
  )
}
