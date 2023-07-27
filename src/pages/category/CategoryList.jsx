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
import { Box, Button, Divider, Modal, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { deleteCategoryApi, getCategoryApi } from '../../services/category'
import Swal from 'sweetalert2';
import { AddCircleRounded } from '@mui/icons-material';
import { useAppStore } from '../../appStore';
import AddFormCategory from './AddFormCategory';
import EditFormCategory from './EditFormCategory';

export default function CategoryList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [categoryData, setCategoryData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [formid, setFormId] = useState("");
  const handleOpen = () => setOpen(true);
  const handleEditOpen = () => setEditOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);
  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);


  const getDataCategoryList = useCallback(async () => {
    const data = await getCategoryApi();
    setRows(data);
    // eslint-disable-next-line
  }, []);

  const deleteCategoryId = (id) => {
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
            deleteCategoryData(id);
        }
      })
  }

  async function deleteCategoryData(id){
    const response = await deleteCategoryApi(id);
    console.log(response)
    if (response.code === 200) {
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
    }
    getDataCategoryList();
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

  const editData = (id, name) => {
    const dataUser = {
      id: id,
      name: name
    };
    setFormId(dataUser)
    handleEditOpen()
  }

  useEffect(() => {
    getDataCategoryList();
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
          <AddFormCategory closeEvent={handleClose}/>
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
          <EditFormCategory closeEvent={handleEditClose} fid={formid}/>
        </Box>
      </Modal>
    </div>
    <Paper sx={{ width: '100%', overflow: 'hidden', padding:"20px" }}>
      <Typography gutterBottom variant='h5' component="div" sx={{ paddingBottom: "20px" }}>
          Category List
      </Typography>
      <Divider/>
      <Stack direction="row" spacing={2} className='my-2 mb-2 align-right'>
      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>
      <Button variant='contained' endIcon={<AddCircleRounded/>} onClick={handleOpen}>
        Add Category
      </Button>
      </Stack>
      <Box height={10}/>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell align="left" style={{ minWidth: "300px" }}><b> Category Name </b></TableCell>
                <TableCell align="left" style={{ minWidth: "300px" }}><b> Created Date </b></TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}><b> Action </b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell align="left"> {row.name} </TableCell>
                    <TableCell align="left"> {row.created_date} </TableCell>
                    <TableCell align="left">
                        <Stack spacing={2} direction="row">
                            <EditIcon style={{
                                fontSize: "20px",
                                color: "blue",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                              editData(row._id, row.name)
                            }}/>
                            <DeleteIcon style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer"
                            }}
                            onClick={() => {
                                deleteCategoryId(row._id)
                            }}
                            />
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