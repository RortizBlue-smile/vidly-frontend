import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons'
function TableHeader({ columns, onSort, sortColumn }) {
	const raiseSort = (path) => {
		const { order: actualOrder, path: actualPath } = sortColumn
		let newOrder = 'asc'
		if (actualPath === path) {
			newOrder = actualOrder === 'asc' ? 'desc' : 'asc'
		}
		onSort({ path, order: newOrder })
	}
	const renderSortIcon = (column) => {
		if (column.path !== sortColumn.path) return <></>
		const icon = sortColumn.order === 'asc' ? faSortAsc : faSortDesc
		return <FontAwesomeIcon icon={icon} className='ms-1' />
	}
	return (
		<thead>
			<tr>
				{columns.map((column) => (
					<th
						className='clickable '
						key={column.label ?? column.key}
						onClick={() => raiseSort(column.path)}
					>
						{column.label}
						{renderSortIcon(column)}
					</th>
				))}
			</tr>
		</thead>
	)
}

export default TableHeader
