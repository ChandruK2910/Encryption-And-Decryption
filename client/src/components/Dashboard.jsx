import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import { Typography } from '@mui/material';
import axios from 'axios';
import UpdateDialog from './UpdateDialog';
import {encryptDataAes,decryptDataAes} from '../helpers/helper'

export const Dashboard = () => {
  const [data,setData] = useState(null)
  const [isUpdated,setIsUpdated] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemId,setItemId] = useState('')

  const openDialog = (id) => {
    setIsDialogOpen(true);
    setItemId(id)
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  
  const handleSubmit = async(name,email) => {
    setIsDialogOpen(false);
    if(itemId != ''){
      console.log('Submitted value:', name,email,itemId);
    }
    try {
      if(!email || !name){
        console.log('email or name is missing')
      }else{
        let requestBody = {
          username : name,
          email
        }
        console.log('item',itemId);
        let encryptRequest = encryptDataAes(requestBody)
        console.log(encryptRequest);
        const response = await axios.put(`http://localhost:8000/api/v1/auth/update/${itemId}`,
        requestBody,
        {headers:{'auth-token': localStorage.getItem('token')}}
        )
        if(response){
          console.log(response)
          setIsUpdated(!isUpdated) 
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
    fetchData()
  },[isUpdated])

  const fetchData = async()=>{
    try {
      const response = await axios.get('http://localhost:8000/api/v1/auth/getUser',{headers:{'auth-token': localStorage.getItem('token')}})
      if(response){
        console.log(response.data.data)
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async(id)=>{
    if(window.confirm('Are you sure want to delete')){
      console.log('delete is clicked', id)
      try {
        let response = await axios.delete(`http://localhost:8000/api/v1/auth/delete/${id}`,{headers:{'auth-token': localStorage.getItem('token')}})
        if(response)
        console.log(response)
      const deleteData =data.filter((item)=>item._id !== id)
      setData(deleteData)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
    <Typography><b>Users List</b></Typography>
    <br></br>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>S.No</b></TableCell>
            <TableCell align="right"><b>UserName</b></TableCell>
            <TableCell align="right"><b>Email</b></TableCell>
            <TableCell align="right"><b>Edit</b></TableCell>
            <TableCell align="right"><b>Delete</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row,index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1 }
              </TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right"><IconButton aria-label="edit" size="small" onClick={()=>openDialog(row._id)}>
        <EditIcon   />
       
      </IconButton></TableCell>
              <TableCell align="right"><IconButton aria-label="delete" size="small" onClick={()=>handleDelete(row._id)}>
        <DeleteIcon   />
      </IconButton></TableCell>
      
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <UpdateDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onSubmit={handleSubmit}
      />
    
    </>
  )
}
