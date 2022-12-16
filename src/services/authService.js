import http from './httpService'
import jwtDecode from 'jwt-decode'
import { getJwt, saveJwt } from '../utils/jwtHelpers'

const tokenKey = 'token'

export async function login(user) {
	const { data: jwt } = await http.post('auth', {
		email: user.username,
		password: user.password,
	})
	saveJwt(jwt.token)
}

export function getCurrentUser() {
	try {
		const jwt = getJwt()
		const userInfo = jwtDecode(jwt)
		return userInfo
	} catch (error) {
		return null
	}
}
export function logout() {
	localStorage.removeItem(tokenKey)
}
