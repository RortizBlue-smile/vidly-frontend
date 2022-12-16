import lodash from 'lodash'

export function paginate(items, pageNumber, pageSize) {
	const startIndex = (pageNumber - 1) * pageSize
	const endIndex = pageSize * pageNumber
	return items.slice(startIndex, endIndex)
}
