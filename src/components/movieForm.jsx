import Joi from 'joi'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getGenres } from '../services/genreService'
import { getMovie, saveMovie } from '../services/movieService'
import { toast } from 'react-toastify'

import FormBtn from './common/formBtn'
import Input from './common/input'
import Select from './common/select'

function MovieForm() {
	const { id: movieId } = useParams()
	const nav = useNavigate()

	const [labelMovieTitle, setLabelMovieTitle] = useState('New')
	const [data, setData] = useState({
		title: '',
		genreId: '',
		numberInStock: '',
		dailyRentalRate: '',
	})
	const [genres, setGenres] = useState([])
	const [validationErrors, setValidationErrors] = useState({})
	const [button, setButton] = useState({ text: 'Save', loading: false })

	useEffect(() => {
		populateGenres()
		populateMovie()
	}, [])

	const validationSchema = Joi.object({
		_id: Joi.string(),
		title: Joi.string().required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number()
			.required()
			.min(0)
			.max(100)
			.label('Number in Stock'),
		dailyRentalRate: Joi.number()
			.required()
			.min(0)
			.max(10)
			.label('Daily Rental Rate'),
	})

	const populateGenres = async () => {
		const genres = await getGenres()
		setGenres(genres)
	}
	const populateMovie = async () => {
		try {
			if (movieId === 'new') return
			const movieInDB = await getMovie(movieId)
			const movie = mapMovie(movieInDB)
			setLabelMovieTitle(movie.title)
			setData(movie)
		} catch (ex) {
			if (ex.response?.status === 404) nav('/not-found')
		}
	}
	const mapMovie = (movieInDB) => {
		const movie = {
			_id: movieInDB._id,
			title: movieInDB.title,
			genreId: movieInDB.genre._id,
			numberInStock: movieInDB.numberInStock,
			dailyRentalRate: movieInDB.dailyRentalRate,
		}
		return movie
	}
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
		handleSave()
	}
	const handleSave = async () => {
		try {
			setButton({ loading: true, text: 'Loading...' })
			await saveMovie({ ...data })
			toast.info('Movie Saved')
			nav('/movies')
		} catch (ex) {
			setButton({ loading: false, text: 'Save' })
			toast.error('Error during Saving')
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
			<h1>Movie Form {labelMovieTitle}</h1>
			<form onSubmit={handleSubmit}>
				<Input
					name='title'
					label='Title'
					value={data.title}
					onChange={handleChange}
					error={validationErrors?.title}
				/>
				<Select
					name='genreId'
					label='Genre'
					value={data.genreId}
					options={genres}
					onChange={handleChange}
					error={validationErrors?.genreId}
				/>
				<Input
					name='numberInStock'
					label='Number in Stock'
					value={data.numberInStock}
					onChange={handleChange}
					error={validationErrors?.numberInStock}
				/>
				<Input
					name='dailyRentalRate'
					label='Rate'
					value={data.dailyRentalRate}
					onChange={handleChange}
					error={validationErrors?.dailyRentalRate}
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

export default MovieForm
