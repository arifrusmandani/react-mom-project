import React from 'react';
import Sidenav from '../components/Sidenav';
import Navbar from '../components/Navbar';
import MyAccordion from '../components/MyAccordion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Stack } from '@mui/material';
import "../Dash.css";
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/Book';
import StyleIcon from '@mui/icons-material/Style';
import StarIcon from '@mui/icons-material/Star';
import CountUp from 'react-countup';
import { useEffect } from 'react';
import Cookies from 'js-cookie';


export default function Home() {
  const [userLogin, setUserLogin] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  console.log(userLogin)

  document.title = 'MOM - Dashboard';
  
  useEffect(() => {
    const userSession = Cookies.get('userSession');
    if(userSession){
      const userData = JSON.parse(userSession)
      setUserLogin(userData)
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
            <Grid container spacing={2}>
              <Grid item xs={8}>
              <Stack spacing={2} direction="row">
              <Card sx={{ minWidth: 49 + "%", height: 150 }} className='card_gradient'>
                <CardContent>
                  <div className='card_icon_white'>
                    <BookIcon/>
                  <Typography gutterBottom variant="h5" component="div" sx={{color: "#ffffff"}}>
                    <CountUp delay={0.2} end={1100} duration={0.8}/>
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div" sx={{color: "#ccd1d1"}}>
                    Total Meeting Notes
                  </Typography>
                  </div>
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 49 + "%", height: 150 }} className='card_gradient_light'>
                <CardContent>
                  <div className='card_icon_white'>
                    <GroupIcon/>
                  <Typography gutterBottom variant="h5" component="div" sx={{color: "#ffffff"}}>
                    <CountUp delay={0.2} end={100} duration={0.8}/>
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div" sx={{color: "#ccd1d1"}}>
                    Total Users
                  </Typography>
                  </div>
                </CardContent>
              </Card>
              </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack spacing={2}>
                  <Card className='card_gradient_light'>
                    <Stack spacing={2} direction="row">
                      <div className='card_icon_white'>
                        <StyleIcon/>
                      </div>
                      <div className='dashboard_padding_card'>
                        <span className='card_title text-white'>
                          <CountUp delay={0.2} end={10} duration={0.8}/>
                        </span>
                        <br/>
                        <span className='card_sub_title text-white'>Total Category of Meeting</span>
                      </div>
                    </Stack>
                  </Card>
                  <Card className='card_gradient_light'>
                    <Stack spacing={2} direction="row">
                      <div className='card_icon_white'>
                        <StarIcon/>
                      </div>
                      <div className='dashboard_padding_card'>
                        <span className='card_title text-white'>
                          Weekly Meeting
                        </span>
                        <br/>
                        <span className='card_sub_title text-white'>Most Category of Meeting</span>
                      </div>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>
            <Box height={20}/>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
  
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ height: 60 + "vh" }}>
                  <CardContent>
                    <div className='dashboard_padding_card'>
                      <span className='card_title'>Latest Meeting</span>
                    </div>
                    <MyAccordion/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </div>
      </>
    )
  }
}