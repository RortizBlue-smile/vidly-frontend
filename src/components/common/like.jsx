import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faRegular from '@fortawesome/free-regular-svg-icons'
import * as faSolid from '@fortawesome/free-solid-svg-icons'
function Like({ liked, onLike }) {
	const likeIconStyle = liked ? faSolid.faHeart : faRegular.faHeart
	return (
		<FontAwesomeIcon icon={likeIconStyle} onClick={onLike} cursor='pointer' />
	)
}

export default Like
