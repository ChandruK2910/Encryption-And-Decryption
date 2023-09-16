import React, { useState } from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import {decrypt, encrypt} from '../helpers/helper'
import axios from "axios";


export const RegisterPage = () => {
    const [name,setName] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = ()=>{

    }
  return (
    <React.Fragment>
    <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Register </h2>
        <TextField
            label="userName"
            onChange={e => setName(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="text"
            sx={{ mb: 3 }}
            fullWidth
            value={name}

        />
        <TextField
            label="Email"
            onChange={e => setEmail(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="email"
            sx={{ mb: 3 }}
            fullWidth
            value={email}

        />
        <TextField
            label="Password"
            onChange={e => setPassword(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="password"
            value={password}

            fullWidth
            sx={{ mb: 3 }}
        />
        <TextField
            label="Confirm Password"
            onChange={e => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            color="primary"
            type="password"
            value={confirmPassword}

            fullWidth
            sx={{ mb: 3 }}
        />
        <Button variant="outlined" color="primary" type="submit">Register</Button>

    </form>

</React.Fragment>
  )
}
