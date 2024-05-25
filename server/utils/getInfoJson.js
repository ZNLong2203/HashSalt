const lodash = require('lodash')

const getInfoJson = ({fields = [], objects = {}}) => {
    return lodash.pick(objects, fields)
}

module.exports = getInfoJson