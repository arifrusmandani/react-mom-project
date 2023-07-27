import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { createCategoryApi, getCategoryApi } from '../../services/category';
import Swal from 'sweetalert2';
import { useCallback } from 'react';
import { useAppStore } from '../../appStore';

export default function AddFormCategory({closeEvent}) {
    const setRows = useAppStore((state) => state.setRows);
    const [name, setName] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const getDataCategoryList = useCallback(async () => {
        const data = await getCategoryApi();
        setRows(data);
        // eslint-disable-next-line
    }, []);

    const createCategory = async() => {
        const dataPayload = {
            name: name,
        }
        const response = await createCategoryApi(dataPayload);
        console.log("response", response)
        if (response.code > 299){
            Swal.fire(
                'Error!',
                'Error add new data.',
                'error'
              )
        }else{
            Swal.fire(
                'Success!',
                'Data Category has been added.',
                'success'
              )
        }
        closeEvent();
        getDataCategoryList();
    }

  return (
    <>
    <Box sx={{ m: 2 }}/>
    <Typography variant='h5' align='center'>
        Add Category Name
    </Typography>
    <IconButton style={{ position: "absolute", top: "0", right: "0"}}
    onClick={closeEvent}>
        <CloseIcon/>
    </IconButton>
    <Box height={20}/>
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField id='name' 
            label='Name' 
            variant='outlined' 
            size='small' 
            sx={{ minWidth: '100%' }} 
            value={name} 
            onChange={handleNameChange}>
            </TextField>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='h5' align='right'>
                <Button variant='contained' onClick={createCategory}>Submit</Button>
            </Typography>
        </Grid>
    </Grid>
    <Box sx={{ m: 2 }}/>
    </>
  )
}
