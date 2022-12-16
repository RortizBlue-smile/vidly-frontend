import React, { useState } from 'react'
import Input from './common/input'
import FormBtn from './common/formBtn'
import Joi from 'joi'
import { register } from '../services/userService'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { saveJwt } from '../utils/jwtHelpers'

function RegisterForm({ setIsLoggedIn }) {
	const nav = useNavigate()
	const [data, setData] = useState({ username: '', password: '', name: '' })
	const [validationErrors, setValidationErrors] = useState({})
	const [button, setButton] = useState({ text: 'Register', loading: false })

	const validationSchema = Joi.object({
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password'),
		name: Joi.string().required().label('Name'),
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
		doSubmit()
	}
	const doSubmit = async () => {
		try {
			setButton({ loading: true, text: 'Loading...' })
			const { headers } = await register(data)
			saveJwt(headers['x-auth-token'])
			toast.info('Register complete')
			setIsLoggedIn(true)

			nav('/')
		} catch (ex) {
			if (ex.response?.status === 400) {
				const newErrors = { ...validationErrors }
				newErrors.username = ex.response.data
				setButton({ loading: false, text: 'Register' })
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
			<h1>Register</h1>
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
				<Input
					name='name'
					label='Name'
					value={data.name}
					onChange={handleChange}
					error={validationErrors?.name}
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

export default RegisterForm
