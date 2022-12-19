import axios from 'axios'
import { toast } from 'react-toastify'
import { log } from './logService'
import { getJwt } from '../utils/jwtHelpers'

const api = axios.create({
	baseURL: import.meta.env.VITE_API,
	headers: {
		'Content-type': 'application/json;charset=utf-8',
	},
})
api.interceptors.response.use(null, (info) => {
	console.log(info)
	const expectedError = info.response?.status >= 400 && info.response?.status
	if (!expectedError) {
		log('Logging error:', info)
		toast.error('An unexpected error ocurred')
	}

	return Promise.reject(info)
})
api.defaults.headers.common['x-auth-token'] = getJwt()

export default {
	get: api.get,
	post: api.post,
	put: api.put,
	delete: api.delete,
}
