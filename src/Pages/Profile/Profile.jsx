import React, { useContext } from 'react';
import { AuthContext } from '../../context/context'
import { Box, Button, TextField, Grid, TextareaAutosize } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Calendar from 'react-calendar';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  btnOK:{
    fontSize:12,
    backgroundColor:'#ffff00'
  }
}))
export default function Profile() 
{
    const classes = useStyles()
    const { user } = useContext(AuthContext);
    const [value, onChange] = useState(new Date());
    const [txt, setTxt] = useState("");
    console.log(user);
    return (
    <>
        <h1>
            Profile
        </h1>
        <Calendar onChange = {onChange} value = {value}></Calendar>
        <Box style = {{ display:'block'}}>
          <TextareaAutosize minRows={5} onChange = {setTxt} > </TextareaAutosize>
          <Button>Save</Button>
        </Box>
    </>
  );
}
