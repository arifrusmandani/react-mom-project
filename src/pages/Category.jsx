import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import CategoryList from './category/CategoryList';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Category() {
  document.title = 'MOM - Category List';
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
            <CategoryList/>
          </Box>
        </Box>
      </div>
      </>
    )
  }
}
