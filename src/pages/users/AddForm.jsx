import { Box, Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import { createUserApi, getUsers } from '../../services/users';
import Swal from 'sweetalert2';
import { useCallback } from 'react';
import { useAppStore } from '../../appStore';

export default function AddForm({closeEvent}) {
    const setRows = useAppStore((state) => state.setRows);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthDate, setBirthDate] = useState("1991-01-01");
    const [role, setRole] = useState("");
    const [gender, setGender] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value)
    }
    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }
    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }

    const listRole = [
        {
            value: "superadmin",
            label: "superadmin",
        },
        {
            value: "member",
            label: "member",
        }
    ]

    const getDataUserList = useCallback(async () => {
        const data = await getUsers();
        setRows(data);
        // eslint-disable-next-line
    }, []);

    const createUser = async() => {
        const dataUser = {
            name: name,
            phone: phone,
            email: email,
            password: password,
            date_of_birth: birthDate,
            gender: gender,
            role: role,
        }
        const response = await createUserApi(dataUser);
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
                'Data user has been added.',
                'success'
              )
        }
        closeEvent();
        getDataUserList();
    }

  return (
    <>
    <Box sx={{ m: 2 }}/>
    <Typography variant='h5' align='center'>
        Add User
    </Typography>
    <IconButton style={{ position: "absolute", top: "0", right: "0"}}
    onClick={closeEvent}>
        <CloseIcon/>
    </IconButton>
    <Box height={20}/>
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField 
            id='name' 
            label='Name' 
            variant='outlined' 
            size='small' sx={{ minWidth: '100%' }} 
            value={name} 
            onChange={handleNameChange}
            ></TextField>
        </Grid>
        <Grid item xs={6}>
            <TextField id='phone' 
            label='Phone' 
            variant='outlined' 
            size='small' 
            type='number'
            sx={{ minWidth: '100%' }} 
            value={phone} 
            onChange={handlePhoneChange}></TextField>
        </Grid>
        <Grid item xs={6}>
            <TextField id='gender' 
            label='Gender' 
            variant='outlined' 
            size='small' 
            select
            sx={{ minWidth: '100%' }} 
            value={gender} 
            onChange={handleGenderChange}>
                <MenuItem key="MALE" value="MALE">Male</MenuItem>
                <MenuItem key="FEMALE" value="FEMALE">Female</MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={12}>
            <TextField id='email' 
            label='Email' 
            variant='outlined' 
            size='small' 
            type='email'
            sx={{ minWidth: '100%' }} 
            value={email} 
            onChange={handleEmailChange}></TextField>
        </Grid>
        <Grid item xs={12}>
            <TextField id='password' 
            label='Password' 
            variant='outlined' 
            size='small' 
            type='password'
            sx={{ minWidth: '100%' }} 
            value={password} 
            onChange={handlePasswordChange}></TextField>
        </Grid>
        <Grid item xs={6}>
            <TextField id='birth-date' 
            label='Birth Date'
            variant='outlined'
            size='small'
            type='date'
            sx={{ minWidth: '100%' }}
            value={birthDate} onChange={handleBirthDateChange}></TextField>
        </Grid>
        <Grid item xs={6}>
            <TextField id='role' 
            label='Role' 
            select
            variant='outlined' 
            size='small' 
            sx={{ minWidth: '100%' }} 
            value={role} 
            onChange={handleRoleChange}>
                {listRole.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                        {role.label}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
        <Grid item xs={12}>
            <Typography variant='h5' align='right'>
                <Button variant='contained' onClick={createUser}>Submit</Button>
            </Typography>
        </Grid>
    </Grid>
    <Box sx={{ m: 2 }}/>
    </>
  )
}
