module.exports = text => {
    let textArray = text.split(',')
    textArray = textArray.map(task => task.trim())

    return textArray
}