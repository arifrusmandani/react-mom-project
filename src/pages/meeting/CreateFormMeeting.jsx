import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Button, Divider, Grid, MenuItem, TextField, Typography, autocompleteClasses, styled, useAutocomplete } from '@mui/material';
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
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { getUsers } from '../../services/users';


// auto complete region
const Root = styled('div')(
  ({ theme }) => `
  color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`,
);

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 50%;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 4px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

export default function CreateFormMeeting() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [is_public, setIsPublic] = useState("1");
  const [member, setMember] = useState("");
  const [category, setCategory] = useState("");
  const [datetime, setDatetime] = useState("");
  // const [shared_to, setSharedTo] = useState("");
  const [created_by, setCreatedBy] = useState("");
  
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
  // const handleSharedToChange = (e) => {
  //   setSharedTo(e.target.value)
  // }
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

  const [userList, setUserList] = useState([])
  const getDataUserList = useCallback(async () => {
    const data = await getUsers();
    setUserList(data);
    // eslint-disable-next-line
  }, []);
  

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    // defaultValue: [top100Films[1]],
    multiple: true,
    options: userList,
    getOptionLabel: (option) => option.email,
  });


  const createMeeting = async() => {
    const emails = value.map(item => item.email);
    // Concatenate emails with a comma delimiter
    const dataPayload = {
      title: title,
      description: description,
      is_public: parseInt(is_public),
      members: member.split(',').map(item => item.trim()),
      // shared_to: shared_to.split(',').map(item => item.trim()),
      shared_to: emails,
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
      setCreatedBy(userData.name)
      getDataCategoryList();
      getDataUserList()
    }
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
          <Root>
            <div {...getRootProps()}>
              <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
                {value.map((option, index) => (
                  <StyledTag label={option.email} {...getTagProps({ index })} />
                ))}
                <input {...getInputProps()} />
              </InputWrapper>
            </div>
            {groupedOptions.length > 0 ? (
              <Listbox {...getListboxProps()}>
                {groupedOptions.map((option, index) => (
                  <li {...getOptionProps({ option, index })}>
                    <span>{option.email}</span>
                    <CheckIcon fontSize="small" />
                  </li>
                ))}
              </Listbox>
            ) : null}
          </Root>
          {/* <TextField id='shared_to' 
              label='Share to' 
              variant='outlined' 
              size='small' 
              type='text'
              sx={{ minWidth: '100%' }} 
              value={shared_to} 
              onChange={handleSharedToChange}></TextField> */}
          </Grid>
        )}
        <Grid item xs={10}>
          
        </Grid>
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