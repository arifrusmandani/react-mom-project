import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Divider, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { getDetailMeetingApi } from '../../services/meeting';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';


export default function MeetingDocument() {
  const [data, setData] = useState({});
  const { id } = useParams();

  const getDetailMeeting = useCallback(async () => {
    const response = await getDetailMeetingApi(id);
    console.log(response.data)
    if (response.code > 299){
      alert("data not dound")
    }else{
      setData(response.data);
    }
  }, [id]);

  const sanitizeHTML = (html) => {
    return DOMPurify.sanitize(html);
  };

  const arrayToString = (array) => {
    if (array){
      return array.join(", ")
    }else{
      return ""
    }
  }
  
  useEffect(() => {
    getDetailMeeting();
    // eslint-disable-next-line
  }, [id, getDetailMeeting]);

  return (
    <>
    <Paper sx={{ width: '21cm', minHeight: '29.7cm', overflow: 'hidden', padding:"1cm", margin:'auto', display: 'flex', flexDirection: 'column' }}>
    <img src={'../../images/doc-header.png'} alt="header" class="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
      <Typography gutterBottom variant='h6' component="div" sx={{ paddingBottom: "20px" }} align='center'>
          Document MOM
      </Typography>
      <Box height={10}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell> <b>Date and Time </b> </TableCell>
              <TableCell> {data.time_and_date} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell> <b>Agenda </b> </TableCell>
              <TableCell> {data.title} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell> <b>Description </b> </TableCell>
              <TableCell> {data.description} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell> <b>Members </b> </TableCell>
              <TableCell> {arrayToString(data.members)} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell> <b>Created by </b> </TableCell>
              <TableCell> {data.created_by}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell> <b>Created Date </b> </TableCell>
              <TableCell> {data.created_date}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <Box height={40}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#ff3737', color: '#fff', fontSize: '1.2rem' }}> <b>Summary</b> </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(data.summary) }} />
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <Divider/>
      <Box sx={{ flex: '1' }} />
      <Box sx={{ backgroundColor: '#af242a', color: '#fff', padding: '0.5rem', textAlign: 'center' }}/>
    </Paper>
    </>
  );
}