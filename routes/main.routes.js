const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.redirect('/user/register')
})

module.exports = routes