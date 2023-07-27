import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { deleteMeetingApi, getMeetingApi } from '../../services/meeting'
import Swal from 'sweetalert2';
import { AddCircleRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Cookies from 'js-cookie';

export default function MeetingList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [meetingData, setMeetingData] = useState([]);
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = React.useState({});


  const shouldIncludeItem = (item, user) => {
    const isPublicToUser = item.is_public === false && item.shared_to.includes(user.email);
    const isCreatedByUser = item.created_by === user.name;
    return isPublicToUser || isCreatedByUser;
  };

  const getDataMeetingList = useCallback(async (user) => {
    const data = await getMeetingApi();
    if (user.role === "superadmin"){
      setMeetingData(data);
    }else{
      const filtered = data.filter(item => shouldIncludeItem(item, user));
      // const filtered = data.filter(item => item.is_public === false && item.shared_to.includes(user.email) || item.created_by === user.name)
      setMeetingData(filtered);
    }

    // eslint-disable-next-line
  }, []);

  const deleteMeetingId = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteMeetingData(id);
        }
      })
  }

  async function deleteMeetingData(id){
    const response = await deleteMeetingApi(id);
    console.log(response)
    if (response.code === 200) {
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
    }
    getDataMeetingList(userLogin);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const handleFilterData = (meetingData) => {
  //   const filtered = meetingData.filter(item => item.is_public === false && item.shared_to.includes(userLogin.email))
  //   return filtered
  // };

  useEffect(() => {
    const userSession = Cookies.get('userSession');
    if (userSession){
      const userData = JSON.parse(userSession)
      setUserLogin(userData)
      getDataMeetingList(userData);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding:"20px" }}>
        <Typography gutterBottom variant='h5' component="div" sx={{ paddingBottom: "20px" }}>
            Meeting List
        </Typography>
        <Divider/>
        <Stack direction="row" spacing={2} className='my-2 mb-2 align-right'>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
        <Button variant='contained' startIcon={<AddCircleRounded/>} onClick={()=>{navigate("/meeting/create")}}>
          Add Meeting Note
        </Button>
        </Stack>
        <Box height={10}/>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Title </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Description </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Date and Time </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Category </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Created By </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Status </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Action </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetingData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell align="left"> {row.title} </TableCell>
                    <TableCell align="left"> {row.description} </TableCell>
                    <TableCell align="left"> {row.time_and_date} </TableCell>
                    <TableCell align="left"> {row.category_code} </TableCell>
                    <TableCell align="left"> {row.created_by} </TableCell>
                    <TableCell align="left"> {row.is_public === true ? 'Public' : 'Private'} </TableCell>
                    <TableCell align="left">
                        <Stack spacing={2} direction="row">
                            <VisibilityIcon style={{
                                fontSize: "20px",
                                color: "green",
                                cursor: "pointer"
                            }}
                            onClick={()=>{navigate("/meeting/view/"+row._id)}}
                            />
                            {userLogin.name === row.created_by || userLogin.role === "superadmin" ? (
                              <>
                                <EditIcon
                                  style={{
                                    fontSize: "20px",
                                    color: "blue",
                                    cursor: "pointer",
                                  }}
                                />
                                <DeleteIcon
                                  style={{
                                    fontSize: "20px",
                                    color: "darkred",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    deleteMeetingId(row._id);
                                  }}
                                />
                              </>
                            ) : (
                              null
                            )}
                        </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={meetingData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}