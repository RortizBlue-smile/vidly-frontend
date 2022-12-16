import React from 'react'
import lodash from 'lodash'

function TableBody({ data, columns }) {
	const renderCell = (item, column) => {
		return column.content ? column.content(item) : lodash.get(item, column.path)
	}
	const createKey = (item, column) => {
		return item._id + (column.path ?? column.key)
	}

	return (
		<tbody>
			{data.map((item) => (
				<tr key={item._id}>
					{columns.map((column) => (
						<td key={createKey(item, column)}>{renderCell(item, column)}</td>
					))}
				</tr>
			))}
		</tbody>
	)
}

export default TableBody
