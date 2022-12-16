const tokenKey = 'token'

export function saveJwt(token) {
	localStorage.setItem(tokenKey, token)
}
export function getJwt() {
	return localStorage.getItem(tokenKey)
}
