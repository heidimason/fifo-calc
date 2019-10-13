// Check if value is a character between 0 and 9
export const isValidChar = str => {
	for (let i = 0, strLength = str.length; i < strLength; i++) {
		if (str.charCodeAt(i) < 48 || str.charCodeAt(i) > 57) {
			return false
		}
	}

	return true
}
