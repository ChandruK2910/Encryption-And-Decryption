import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';


const UpdateDialog = ({ open, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [name,setName] = useState('')
  const [item,setItem] =useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleUsername = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(name,email);
    setEmail('')
    setName('')
    onClose
  };

  return (
    <Dialog open={open} onClose={true} fullWidth maxWidth='sm'>
      <DialogTitle>Update Dialog</DialogTitle>
      <DialogContent>
        <br></br>
        <TextField
          label="User Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleUsername}
        />
        <br></br>
        <br></br>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmail}
        />
        <br></br>
        <br></br>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
