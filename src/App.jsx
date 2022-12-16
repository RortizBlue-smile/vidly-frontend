import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterForm from './components/registerForm'
import Customers from './components/customers'
import LoginForm from './components/loginForm'
import MovieForm from './components/movieForm'
import Movies from './components/movies'
import NavBar from './components/navBar'
import NotFound from './components/notFound'
import Rentals from './components/rentals'
import { ToastContainer } from 'react-toastify'
import Logout from './components/logout'
import { getCurrentUser } from './services/authService'

import 'react-toastify/dist/ReactToastify.css'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [user, setUser] = useState(null)
	useEffect(() => {
		const userInfo = getCurrentUser()
		setUser(userInfo)
	}, [isLoggedIn])
	const protectRoute = (component, redirect = '/login') => {
		return user ? component : <Navigate to={redirect} />
	}
	return (
		<>
			<ToastContainer />
			<NavBar user={user} />
			<main className='container mt-4'>
				<Routes>
					<Route path='' element={<Navigate to='movies' />} />
					<Route path='movies/:id' element={protectRoute(<MovieForm />)} />
					<Route path='movies' element={<Movies user={user} />} />
					<Route path='customers' element={<Customers />} />
					<Route path='rentals' element={<Rentals />} />
					<Route
						path='login'
						element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
					/>
					<Route
						path='register'
						element={<RegisterForm setIsLoggedIn={setIsLoggedIn} />}
					/>
					<Route
						path='logout'
						element={<Logout setIsLoggedIn={setIsLoggedIn} />}
					/>
					<Route path='not-found' element={<NotFound />} />
					<Route path='*' element={<Navigate to='/not-found' />} />
				</Routes>
			</main>
		</>
	)
}

export default App
