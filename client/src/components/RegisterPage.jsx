import React, { useState } from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import {decrypt, encrypt,encryptDataAes,decryptDataAes} from '../helpers/helper'
import axios from "axios";


export const RegisterPage = () => {
    const [name,setName] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(!name) alert('userName is mandatory!')
        if(!email) alert('email is mandatory!')
        if(!password) alert('please fill the password field')
        if(!confirmPassword) alert('please fill the password field')
        if(password != confirmPassword){
alert(`password and confirm password must be same`)
        }
        if(name && email && password == confirmPassword){
            let requestBody = {
                username : name,
                email,
                password
            }
            console.log("requestBody--->",requestBody)
            let encryptRequest = encryptDataAes(requestBody)
            console.log("encrypt reqest--->",encryptRequest)
            try {
                let response = await axios.post('http://localhost:8000/api/v1/auth/register',
                // requestBody,
                {encryptRequest}
                )
                if(response){
                    console.log('encrypted response --->',response)
                    response = await decryptDataAes(response.data)
                    console.log('decrypted response----->',response)
                    handleLogin()
                }
            } catch (error) {
                console.log("encrypted error----->",error)
                error = await decryptDataAes(error.response.data)
                console.log("decrypted error--->",error);
            }
        }
    }

    const handleLogin=async()=>{
        if (email && password) {
        
            let requestBody = {email,password}
            console.log(requestBody)
            let encryptRequest = encryptDataAes(requestBody)
            console.log(encryptRequest);
            try {
                let response = await axios.post('http://localhost:8000/api/v1/auth/login',
                // requestBody
                    {encryptRequest}
                    )
                if (response) {
                    console.log("login success")
                    console.log("encrypted response --->",response)
                    response = await decryptDataAes(response.data)
                    console.log('decrypted response --->',response)
                    localStorage.setItem('token', response.token)
                    navigate('/dashboard')
                }
            } catch (error) {
                console.log("encrypted error----->",error)
        error = await decryptDataAes(error.response.data)
        console.log("decrypted error--->",error);
            }

        }
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
