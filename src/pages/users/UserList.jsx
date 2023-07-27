import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
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
import { deleteUser, getUsers } from '../../services/users'
import Swal from 'sweetalert2';
import { AddCircleRounded } from '@mui/icons-material';
import AddForm from './AddForm';
import { useAppStore } from '../../appStore';
import EditForm from './EditForm';
import Cookies from 'js-cookie';


export default function UserList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [formid, setFormId] = useState("");
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);
  const [userLogin, setUserLogin] = React.useState({});

  const getDataUserList = useCallback(async () => {
    const data = await getUsers();
    setRows(data);
    // eslint-disable-next-line
  }, []);

  const deleteUserId = (id) => {
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
            deleteUserData(id);
        }
      })
  }

  async function deleteUserData(id){
    const response = await deleteUser(id);
    if (response.code === 200) {
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
    }
    getDataUserList();
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const editData = (id, name, email, gender, phone, date_of_birth, role) => {
    const dataUser = {
      id: id,
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      date_of_birth: date_of_birth,
      role: role,
    };
    setFormId(dataUser)
    handleEditOpen()
  }

  useEffect(() => {
    const userSession = Cookies.get('userSession');
    if (userSession){
      const userData = JSON.parse(userSession)
      setUserLogin(userData)
    }
    getDataUserList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddForm closeEvent={handleClose}/>
        </Box>
      </Modal>
      {/* Edit modal */}
      <Modal
        open={editopen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditForm closeEvent={handleEditClose} fid={formid}/>
        </Box>
      </Modal>
    </div>
    <Paper sx={{ width: '100%', overflow: 'hidden', padding:"20px" }}>
      <Typography gutterBottom variant='h5' component="div" sx={{ paddingBottom: "20px" }}>
          User List
      </Typography>
      <Divider/>
      <Stack direction="row" spacing={2} className='my-2 mb-2 align-right'>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
        {userLogin.role === "superadmin" ? (
          <Button variant='contained' endIcon={<AddCircleRounded/>} onClick={handleOpen}>
            Add User
          </Button>
        ) : (null)}
      </Stack>
      <Box height={10}/>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Name </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Email </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Gender </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Phone </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Birth Date </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Role </b></TableCell>
                {userLogin.role === "superadmin" ? (
                  <TableCell align="left" style={{ minWidth: "100px" }}><b> Action </b></TableCell>
                ) : (null)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell align="left"> {row.name} </TableCell>
                    <TableCell align="left"> {row.email} </TableCell>
                    <TableCell align="left"> {row.gender} </TableCell>
                    <TableCell align="left"> {row.phone} </TableCell>
                    <TableCell align="left"> {row.date_of_birth} </TableCell>
                    <TableCell align="left"> {row.role} </TableCell>
                    {userLogin.role === "superadmin" ? (
                    <TableCell align="left">
                        <Stack spacing={2} direction="row">
                            <EditIcon style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                              editData(row._id, row.name, row.email, row.gender, row.phone, row.date_of_birth, row.role)
                            }}
                            />
                            <DeleteIcon style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                                deleteUserId(row._id)
                            }}
                            />
                        </Stack>
                    </TableCell>
                    ) : (null)}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}