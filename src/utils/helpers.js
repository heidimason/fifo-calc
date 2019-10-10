export const getFifoVal = str => {
	let fifoVal = ''

	for (let i = 0, strLength = str.length; i < strLength; i++) {
		fifoVal += str[i]

		if (str[i + 1] === ',') {
			return parseInt(fifoVal)
		}
	}

	return false
}
