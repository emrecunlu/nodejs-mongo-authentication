const jwt = require('jsonwebtoken')

const adminAuthMiddleware = (req, res, next) => {
	const token = req.cookies.token

	if (token) {
		jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
			if (err) {
				res.redirect('/user/login')
			} else {
				next()
			}
		})
	} else {
		res.redirect('/user/login')
	}
}

module.exports = {
	adminAuthMiddleware,
}
