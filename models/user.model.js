const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password,salt)
	
	next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
