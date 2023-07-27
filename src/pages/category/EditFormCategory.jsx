import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { updateCategoryApi, getCategoryApi } from '../../services/category';
import Swal from 'sweetalert2';
import { useCallback } from 'react';
import { useAppStore } from '../../appStore';
import { useEffect } from 'react';

export default function EditFormCategory({fid, closeEvent}) {
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

    const updateCategory = async() => {
        const dataPayload = {
            name: name,
        }
        const response = await updateCategoryApi(fid.id, dataPayload);
        console.log("response", response)
        if (response.code > 299){
            Swal.fire(
                'Error!',
                'Error update new data.',
                'error'
              )
        }else{
            Swal.fire(
                'Success!',
                'Data category has been updated.',
                'success'
              )
        }
        closeEvent();
        getDataCategoryList();
    }

    useEffect(() => {
      setName(fid.name);
      // eslint-disable-next-line
  }, []);

  return (
    <>
    <Box sx={{ m: 2 }}/>
    <Typography variant='h5' align='center'>
        Edit Category Name
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
                <Button variant='contained' onClick={updateCategory}>Submit</Button>
            </Typography>
        </Grid>
    </Grid>
    <Box sx={{ m: 2 }}/>
    </>
  )
}
