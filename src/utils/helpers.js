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
