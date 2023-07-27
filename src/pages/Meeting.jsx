import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import MeetingList from './meeting/MeetingList';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function Meeting() {
  document.title = 'MOM - Meeting List';
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const userSession = Cookies.get('userSession');
    if(userSession){
      setLoading(false)
    }else{
      window.location.href = '/sign-in';
    }
  }, []);

  if(loading){
    return (
      <div></div>
    )
  }else{
    return (
      <>
      <div className='bgcolor'>
        <Navbar />
        <Box height={70}/>
        <Box sx={{ display: 'flex' }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <MeetingList/>
          </Box>
        </Box>
      </div>
      </>
    )
  }
}
