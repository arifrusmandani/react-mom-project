import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Button, Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import { useCallback } from 'react';
import { getCategoryApi } from '../../services/category';
import { useEffect } from 'react';
import { createMeetingApi } from '../../services/meeting';
import Swal from 'sweetalert2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimeField } from '@mui/x-date-pickers';
import Cookies from 'js-cookie';


export default function CreateFormMeeting() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [is_public, setIsPublic] = useState("1");
  const [member, setMember] = useState("");
  const [category, setCategory] = useState("");
  const [datetime, setDatetime] = useState("");
  const [shared_to, setSharedTo] = useState("");
  const [created_by, setCreatedBy] = useState("");
  const [userLogin, setUserLogin] = React.useState({});
  
  const [categoryList, setCategoryList] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }
  const handleIsPublicChange = (e) => {
    setIsPublic(e.target.value)
  }
  const handleMemberChange = (e) => {
    setMember(e.target.value)
  }
  const handleSharedToChange = (e) => {
    setSharedTo(e.target.value)
  }
  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }
  const handleDatetimeChange = (val) => {
    setDatetime(dayjs(val))
  }

  const editorRef = useRef(null);

  const getDataCategoryList = useCallback(async () => {
    const data = await getCategoryApi();
    setCategoryList(data)
    // eslint-disable-next-line
  }, []);

  const createMeeting = async() => {
    const dataPayload = {
      title: title,
      description: description,
      is_public: parseInt(is_public),
      members: member.split(',').map(item => item.trim()),
      shared_to: shared_to.split(',').map(item => item.trim()),
      category_code: category,
      summary: editorRef.current.getContent(),
      time_and_date: dayjs(datetime).format('DD-MM-YYYY HH:mm'),
      created_by: created_by
    }
    console.log(dataPayload)
    const response = await createMeetingApi(dataPayload);
    if (response.code > 299){
      Swal.fire(
        'Error!',
        'Error add new data.',
        'error'
      )
      }else{
        Swal.fire(
          'Success!',
          'Data meeting has been added.',
          'success'
        )
        window.location.href = '/meeting';
      }
  }

  useEffect(() => {
    const userSession = Cookies.get('userSession');
    if (userSession){
      const userData = JSON.parse(userSession)
      setUserLogin(userData)
      setCreatedBy(userData.name)
    }
    getDataCategoryList();
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <Paper sx={{ width: '100%', overflow: 'hidden', padding:"20px" }}>
      <Typography gutterBottom variant='h5' component="div" sx={{ paddingBottom: "20px" }}>
          Create Meeting Note
      </Typography>
      <Divider/>
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField 
            id='title' 
            label='Title' 
            variant='outlined' 
            size='small' sx={{ minWidth: '100%' }} 
            value={title} 
            onChange={handleTitleChange}
            ></TextField>
        </Grid>
        <Grid item xs={12}>
            <TextField id='description' 
            label='Descriprion' 
            variant='outlined' 
            size='small' 
            type='text'
            sx={{ minWidth: '100%' }} 
            value={description} 
            onChange={handleDescriptionChange}></TextField>
        </Grid>
        
        <Grid item xs={2}>
            <TextField id='category' 
            label='Category' 
            variant='outlined' 
            size='small' 
            select
            sx={{ minWidth: '100%' }} 
            value={category} 
            onChange={handleCategoryChange}>
                {categoryList.map((cat) => (
                    <MenuItem key={cat.name} value={cat.name}>
                        {cat.name}
                    </MenuItem>
                ))}
            </TextField>
        </Grid>
        <Grid item xs={6}>
            <TextField id='member' 
            label='Member' 
            variant='outlined' 
            size='small' 
            type='text'
            sx={{ minWidth: '100%' }} 
            value={member} 
            onChange={handleMemberChange}></TextField>
        </Grid>
        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={datetime}
            onChange={(newValue) => handleDatetimeChange(newValue)}
          />
        </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            label="Time"
            value={datetime}
            onChange={(newValue) => handleDatetimeChange(newValue)}
            format="HH:mm"
          />
        </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
            <TextField id='share' 
            label='Share Status' 
            variant='outlined' 
            size='small' 
            select
            sx={{ minWidth: '100%' }} 
            value={is_public} 
            onChange={handleIsPublicChange}>
                <MenuItem key="1" value="1">Public</MenuItem>
                <MenuItem key="0" value="0">Private</MenuItem>
            </TextField>
        </Grid>
        {is_public === "1" ? (
          ""
        ) : (
          <Grid item xs={10}>
          <TextField id='shared_to' 
              label='Share to' 
              variant='outlined' 
              size='small' 
              type='text'
              sx={{ minWidth: '100%' }} 
              value={shared_to} 
              onChange={handleSharedToChange}></TextField>
          </Grid>
        )}
        <Grid item xs={12}>
          <Editor
            apiKey='a2dxxr6okqz2k3ech6ficrmi6sae4v0mqn5q3wrpjfon2ab2'
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: 'file edit view insert format tools table tc help',
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect typography inlinecss',
              toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
        </Grid>
        <Grid item xs={12}>
            <Typography variant='h5' align='right'>
                <Button variant='contained' onClick={createMeeting}>Submit</Button>
            </Typography>
        </Grid>
      </Grid>
      <Box height={10}/>
    </Paper>
    </>
  );
}