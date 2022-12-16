import React from 'react'

function SearchBox({ value, onChange }) {
	return (
		<input
			type='text'
			name='query'
			className='form-control my-3'
			placeholder='Search Movie'
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	)
}

export default SearchBox
