import React from 'react'

function FormBtn({ label, validation, loading = false }) {
	return (
		<button
			type='submit'
			className='btn btn-primary'
			disabled={validation() || loading}
		>
			{label}
		</button>
	)
}

export default FormBtn
