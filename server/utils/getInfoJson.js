const lodash = require('lodash')

exports.getInfoJson = ({fields = [], objects = {}}) => {
    return lodash.pick(objects, fields)
}
