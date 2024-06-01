const lodash = require('lodash')

exports.getInfoJson = ({fields = [], objects = {}}) => {
    return lodash.pick(objects, fields)
}

exports.removeUndefined = (obj) => {
    return lodash.omitBy(obj, lodash.isUndefined)
}