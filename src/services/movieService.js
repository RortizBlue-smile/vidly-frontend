import http from './httpService'
import lodash from 'lodash'
export async function getMovies() {
	const { data: genres } = await http.get('movies')
	return genres
}
export async function getMovie(id) {
	const { data: movie } = await http.get(`movies/${id}`)
	return movie
}
export async function deleteMovie(id) {
	return http.delete(`movies/${id}`)
}
export async function saveMovie(movie) {
	if (movie._id) {
		const body = lodash.omit(movie, ['_id'])
		console.log(body)
		return await http.put(`movies/${movie._id}`, body)
	}
	return await http.post(`movies`, movie)
}
