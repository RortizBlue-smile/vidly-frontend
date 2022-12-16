import React from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../services/authService'
import Like from './common/like'
import Table from './common/table'

function MoviesTable({ paginateMovies, sortColumn, onDelete, onLike, onSort }) {
	const columns = [
		{
			path: 'title',
			label: 'Title',
			content: (movie) => (
				<Link to={`/movies/${movie._id}`}>{movie.title} </Link>
			),
		},
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{
			key: 'like',
			content: (movie) => (
				<Like
					liked={movie.liked}
					onLike={() => {
						onLike(movie)
					}}
				/>
			),
		},
	]
	const currentUser = getCurrentUser()
	if (currentUser?.isAdmin) {
		columns.push({
			key: 'delete',
			content: (movie) => (
				<button
					className='btn btn-danger btn-sm'
					onClick={() => {
						onDelete(movie._id)
					}}
				>
					Delete
				</button>
			),
		})
	}
	return (
		<Table
			data={paginateMovies}
			columns={columns}
			sortColumn={sortColumn}
			onSort={onSort}
		/>
	)
}

export default MoviesTable
