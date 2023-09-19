import React, { useState } from "react";
import { TextField, FormControl, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import {decrypt, encrypt,encryptDataAes,decryptDataAes} from '../helpers/helper'
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (email && password) {
        
            let requestBody = {email,password}
            console.log(requestBody)
            let encryptRequest = encryptDataAes(requestBody)
            console.log("encrypted request",encryptRequest);
            try {
                let response = await axios.post('http://localhost:8000/api/v1/auth/login',
                // requestBody
                    {encryptRequest}
                    )
                if (response) {
                    console.log("login success")
                    console.log("encrypted response---->",response)
                    response = await decryptDataAes(response.data)
                    console.log('decrypted response--->',response)
                    localStorage.setItem('token', response.token)
                    navigate('/dashboard')
                }
            } catch (error) {
                console.log("encrypted error----->",error)
                error = await decryptDataAes(error.response.data)
                console.log("decrypted error--->",error);
                // alert(error.response.data.error)
            }

        }
    }

    const routeToRegister = ()=>{
        navigate('/register')
    }

    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h2>Login </h2>
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
                <Button variant="outlined" color="primary" type="submit">Login</Button>

            </form>

            <p>New user click Here!!!<a onClick={routeToRegister}>Register</a></p>

        </React.Fragment>
    );
}

export default LoginPage;