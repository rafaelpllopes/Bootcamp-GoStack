module.exports = (id, array) => {
    return array.findIndex(item => item.id == id)
}