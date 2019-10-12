export const getFifoStr = str => {
	let fifoStr = ''

	for (let i = 0, strLength = str.length; i < strLength; i++) {
		fifoStr += str[i]

		if (str[i + 1] === ',') {
			return fifoStr
		}
	}

	return false
}

export const isValidInt = str => {
	for (let i = 0, strLength = str.length; i < strLength; i++) {
		if (str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57) {
			return false
		}
	}

	return true
}

// export const formatDateStr = obj => {
// 	let dateFormatted = obj.getMonth().toString() + obj.getDate().toString() + obj.getFullYear().toString()

// 	return dateFormatted
// }