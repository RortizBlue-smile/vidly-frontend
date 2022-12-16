import React, { useEffect, useRef, useState } from 'react'
import Input from './common/input'
import Joi from 'joi'
import FormBtn from './common/formBtn'
import { getCurrentUser, login } from '../services/authService'
import { toast } from 'react-toastify'
import { Navigate, useNavigate } from 'react-router-dom'

function LoginForm({ setIsLoggedIn }) {
	const nav = useNavigate()
	useEffect(() => {
		const user = getCurrentUser()
		if (user) nav('/')
	}, [])

	const [data, setData] = useState({ username: '', password: '' })
	const [validationErrors, setValidationErrors] = useState({})
	const [button, setButton] = useState({ text: 'Login', loading: false })

	const validationSchema = Joi.object({
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password'),
	})
	const validation = () => {
		const { error } = validationSchema.validate(data, { abortEarly: false })
		if (!error) return null
		const errors = error.details.reduce((acc, err) => {
			acc[err.path[0]] = err.message
			return acc
		}, {})
		return errors
	}
	const validateProperty = ({ name, value }) => {
		const rule = validationSchema.extract(name)
		const obj = { [name]: value }
		const schema = Joi.object({ [name]: rule })
		const { error } = schema.validate(obj)

		return error ? error.details[0] : null
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		const errors = validation()
		setValidationErrors(errors)
		if (errors) return
		doSumbit()
	}
	const doSumbit = async () => {
		try {
			setButton({ loading: true, text: 'Loading...' })
			await login(data)
			toast.info('Login successfully')
			setIsLoggedIn(true)
			nav(-1)
		} catch (ex) {
			if (ex.response?.status === 400) {
				const newErrors = { ...validationErrors }
				newErrors.username = ex.response.data
				setButton({ loading: false, text: 'Login' })

				setValidationErrors(newErrors)
			}
		}
	}
	const handleChange = ({ target: input }) => {
		const errorMessage = validateProperty(input)
		if (errorMessage) {
			setValidationErrors((prev) => ({
				...prev,
				[input.name]: errorMessage.message,
			}))
		} else {
			setValidationErrors((prev) => {
				const copy = { ...prev }
				delete copy[input.name]
				return copy
			})
		}
		setData((prev) => ({ ...prev, [input.name]: input.value }))
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<Input
					name='username'
					label='Username'
					value={data.username}
					onChange={handleChange}
					error={validationErrors?.username}
				/>
				<Input
					name='password'
					label='Password'
					value={data.password}
					type='password'
					onChange={handleChange}
					error={validationErrors?.password}
				/>
				<FormBtn
					label={button.text}
					validation={validation}
					loading={button.loading}
				/>
			</form>
		</div>
	)
}

export default LoginForm
