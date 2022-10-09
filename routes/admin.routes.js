const express = require('express')
const app = express()
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('admin')
})

module.exports = routes