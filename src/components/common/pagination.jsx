import React from 'react'
import lodash from 'lodash'
import PropTypes from 'prop-types'

function Pagination({ itemsCount, pageSize, currentPage, onPageChange }) {
	const pageCount = Math.ceil(itemsCount / pageSize)
	const pages = lodash.range(1, pageCount + 1)
	if (pageCount === 1) return <></>
	return (
		<nav>
			<ul className='pagination'>
				{pages.map((page) => (
					<li
						className={page === currentPage ? 'page-item active' : 'page-item'}
						key={page}
					>
						<a
							className='page-link'
							onClick={() => {
								onPageChange(page)
							}}
							style={{ cursor: 'pointer' }}
						>
							{page}
						</a>
					</li>
				))}
			</ul>
		</nav>
	)
}
Pagination.propTypes = {
	itemsCount: PropTypes.number,
	pageSize: PropTypes.number,
	currentPage: PropTypes.number,
	onPageChange: PropTypes.func,
}

export default Pagination
