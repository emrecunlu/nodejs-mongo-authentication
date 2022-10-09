const express = require('express')
const routes = express.Router()
const user = require('../controller/user.controller')

routes.get('/register', (req, res) => {
    res.render('index', {
        title: 'User | Register Page'
    })
})

routes.get('/login', (req, res) => {
    res.render('login', {
        title: 'User | Login Page'
    })
})

routes.post('/register', user.register)
routes.post('/login', user.login)



module.exports = routes