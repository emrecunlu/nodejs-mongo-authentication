const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const url = require('url')

const register = (req, res) => {
	const user = new User(req.body)

	user
		.save()
		.then((result) => res.redirect('/user/login'))
		.catch((err) => res.redirect('/user/register'))
}

const login = async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user) {
		const validPassword = await bcrypt.compare(password, user.password)

		if (validPassword) {
			const token = jwt.sign({ email, password }, process.env.SECRET_KEY, {
				expiresIn: 60 * 60,
			})

			res.cookie('token', token)

			res.send({ token })
		} else {
			res.redirect('/user/login')
		}
	} else {
		res.redirect('/user/login')
	}
}

module.exports = {
	register,
	login,
}
