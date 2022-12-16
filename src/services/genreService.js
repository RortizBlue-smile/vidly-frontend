import http from './httpService'

export async function getGenres() {
	const { data: genres } = await http.get('genres')
	return genres
}
