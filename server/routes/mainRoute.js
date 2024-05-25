const express = require('express')
const router = express.Router()

const auth = require('./access/auth')

router.use('/auth', auth)

module.exports = router