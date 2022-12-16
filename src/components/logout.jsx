import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../services/authService'

function Logout({ setIsLoggedIn }) {
	const nav = useNavigate()
	useEffect(() => {
		logout()
		setIsLoggedIn(false)
		toast.info('logout successfully')
		nav('/')
	}, [])
	return <></>
}

export default Logout
