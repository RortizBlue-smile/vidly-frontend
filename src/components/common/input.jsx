import React from 'react'

function Input({ name, label, value, onChange, type = 'text', error = null }) {
	return (
		<div className='mb-3'>
			<label htmlFor={name} className='form-label'>
				{label}
			</label>
			<input
				value={value}
				onChange={onChange}
				id={name}
				name={name}
				type={type}
				className='form-control'
			/>
			{error && <div className='alert alert-danger'>{error}</div>}
		</div>
	)
}

export default Input
