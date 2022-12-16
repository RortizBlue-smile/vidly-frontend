import React, { useState, useEffect } from 'react'
import { getMovies, deleteMovie } from '../services/movieService'
import { getGenres } from '../services/genreService'
import Pagination from './common/pagination'
import ListGroup from './common/listGroup'
import { paginate } from '../utils/paginate'
import MoviesTable from './moviesTable'
import lodash from 'lodash'
import { Link } from 'react-router-dom'
import SearchBox from './common/searchBox'
import { toast } from 'react-toastify'

function Movies({ user }) {
	const [movies, setMovies] = useState([])
	const [genres, setGenres] = useState([])
	const [selectedGenre, setSelectedGenre] = useState({})
	const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })
	const [pageSize] = useState(4)
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		const loadGenres = async () => {
			const dbGenres = await getGenres()
			const newGenre = { _id: '', name: 'All genres' }
			const genres = [{ ...newGenre }, ...dbGenres]
			const dbMovies = await getMovies()
			setMovies(dbMovies)
			setGenres(genres)
			setSelectedGenre({ ...newGenre })
		}

		loadGenres()
	}, [])

	const handleDelete = async (id) => {
		const originalMovies = movies
		const newMovies = movies.filter((movie) => movie._id !== id)
		setMovies(newMovies)
		try {
			await deleteMovie(id)
			toast.info('Movie deleted')
		} catch (ex) {
			if (ex.response?.status === 404) {
				toast.error('This movie has already been deleted')
			} else {
				toast.error('Error during process')
			}

			setMovies(originalMovies)
		}
	}
	const handleLike = (movie) => {
		const newMovies = [...movies]
		const index = newMovies.findIndex((item) => item._id === movie._id)
		newMovies[index].liked = !newMovies[index].liked

		setMovies(newMovies)
	}
	const handlePageChange = (nextPage) => {
		setCurrentPage(nextPage)
	}
	const handleGenreSelect = (genre) => {
		setCurrentPage(1)
		setSearchQuery('')
		setSelectedGenre(genre)
	}
	const handleSort = (sortColumn) => {
		setSortColumn(sortColumn)
	}
	const handleSearch = (query) => {
		const genre = !query ? { _id: '', name: 'All genres' } : {}
		setCurrentPage(1)
		setSelectedGenre(genre)
		setSearchQuery(query)
	}
	const getPagedDate = () => {
		let filteredMovies = movies
		if (searchQuery) {
			filteredMovies = movies.filter((movie) =>
				movie.title.toLowerCase().includes(searchQuery.toLowerCase())
			)
		} else if (selectedGenre && selectedGenre._id) {
			filteredMovies = movies.filter(
				(movie) => movie.genre._id === selectedGenre._id
			)
		}
		const sortedMovies = lodash.orderBy(
			filteredMovies,
			[sortColumn.path],
			[sortColumn.order]
		)
		const paginateMovies = paginate(sortedMovies, currentPage, pageSize)
		return { totalCount: filteredMovies.length, data: paginateMovies }
	}
	if (movies.length < 1) {
		return <p className='mt-2'>There are no movies in the database</p>
	}
	const { totalCount, data } = getPagedDate()
	return (
		<div className='row'>
			<div className='col-3'>
				<ListGroup
					items={genres}
					onItemSelect={handleGenreSelect}
					selectedItem={selectedGenre}
				/>
			</div>
			<div className='col'>
				{user && (
					<Link to='/movies/new' className='btn btn-primary '>
						New Movies
					</Link>
				)}
				<p className='mt-2'>Showing {totalCount} movies in the database</p>
				<SearchBox value={searchQuery} onChange={handleSearch} />
				<MoviesTable
					paginateMovies={data}
					sortColumn={sortColumn}
					onDelete={handleDelete}
					onLike={handleLike}
					onSort={handleSort}
				/>
				<Pagination
					itemsCount={totalCount}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	)
}

export default Movies
