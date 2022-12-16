import React from 'react'

function ListGroup({
	items,
	onItemSelect,
	selectedItem,
	textProp = 'name',
	valueProp = '_id',
}) {
	return (
		<ul className='list-group'>
			{items.map((item) => (
				<li
					key={item[valueProp]}
					className={`list-group-item ${
						item.name === selectedItem.name && 'active'
					}`}
					onClick={() => {
						onItemSelect(item)
					}}
				>
					{item[textProp]}
				</li>
			))}
		</ul>
	)
}

export default ListGroup
