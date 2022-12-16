import React from 'react'

function Select({ name, value, label, options, onChange, error }) {
	return (
		<div className='mb-3'>
			<label htmlFor={name} className='form-label'>
				{label}
			</label>
			<select
				name={name}
				id={name}
				value={value}
				onChange={onChange}
				className='form-control'
			>
				<option value='' />
				{options.map((option) => (
					<option key={option._id} value={option._id}>
						{option.name}
					</option>
				))}
			</select>
			{error && <div className='alert alert-danger'>{error}</div>}
		</div>
	)
}

export default Select
