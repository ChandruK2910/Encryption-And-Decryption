import React, { useEffect } from 'react'
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

export const Dashboard = () => {
  function createData(name, email) {
    return { name, email};
  }

  useEffect(()=>{
    // fetchData()
  },[])

  const fetchData = async()=>{
    try {
      const response = await axios.get('')
      if(response){
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const rows = [
    createData('test','test@gmail.com'),
    createData('test1','test1@gmail.com'),
    createData('test2','test2@gmail.com'),
    createData('test3','test3@gmail.com'),
    createData('test4','test4@gmail.com'),
    createData('test5','test5@gmail.com'),
   
  ];
  const handleEdit = async(index)=>{
    if(window.confirm('Are you sure want to edit')){
      console.log('edit is clicked', index+1)
    }
  }

  const handleDelete = async(index)=>{
    if(window.confirm('Are you sure want to delete')){
      console.log('delete is clicked', index+1)
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
          {rows.map((row,index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right"><IconButton aria-label="edit" size="small" onClick={()=>handleEdit(index)}>
        <EditIcon  />
      </IconButton></TableCell>
              <TableCell align="right"><IconButton aria-label="delete" size="small" onClick={()=>handleDelete(index)}>
        <DeleteIcon   />
      </IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}
