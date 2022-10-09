const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
var cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const mainRoutes = require('./routes/main.routes')
const adminRoutes = require('./routes/admin.routes')
const {adminAuthMiddleware} = require('./middleware/auth')
const morgan = require('morgan')

dotenv.config()

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => app.listen(process.env.PORT || 3000))
	.catch((err) => console.log(err))

app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use('/', mainRoutes)
app.use('/user', userRoutes)
app.use('/admin', adminAuthMiddleware, adminRoutes)
