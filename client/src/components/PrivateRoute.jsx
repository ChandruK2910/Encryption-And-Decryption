import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoute() {
    let token = localStorage.getItem('token') == null ? false : true
    return (
        <>
            {token ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}

export default PrivateRoute