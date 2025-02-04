import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from './Loader';

const AuthLayout = ({ children, authentication = true }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const isLoggedIn = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication) {
            if (!isLoggedIn) {
                navigate('/login')
            }
        } else if (!authentication) {
            if (isLoggedIn) {
                navigate('/dashboard')
            }
        }
        setLoader(false);
    }, [isLoggedIn, navigate, authentication])

    return loader ? <Loader /> : <>{children}</>
}

export default AuthLayout