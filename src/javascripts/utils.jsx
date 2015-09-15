export default {
    truncate(value, length) {
        length = length || 80

        if (value && length < value.length) {
            let rawTruncatedStr = value.substr(0, length)
            let whitespaceIndex = value.lastIndexOf(' ')

            if (whitespaceIndex > -1) {
                rawTruncatedStr = rawTruncatedStr.substr(0, rawTruncatedStr.lastIndexOf(' '))
            }
            return rawTruncatedStr + '...'
        } else {
            return value
        }
    }
}
