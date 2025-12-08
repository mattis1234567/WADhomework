function isEmptyArray(arr) {
    return !Array.isArray(arr) || !arr.length;
}

module.exports = {isEmptyArray};