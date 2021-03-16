const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { resgisterValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
	const { error } = resgisterValidation(req.body);
	const emailExist = await User.findOne({ email: req.body.email });

	if (error) return res.status(400).send(error.details[0].message);
	if (emailExist) return res.status(400).send('Email already exists');

	// hash passwords

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	});

	try {
		await user.save();
		res.send({ user: user._id });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/login', async (req, res) => {
	const { error } = loginValidation(req.body);
	const user = await User.findOne({ email: req.body.email });

	if (error) return res.status(400).send(error.details[0].message);
	if (!user) return res.status(400).send('Email or Password is Incorrect');
	// Compare Passwords
	const validPass = await bcrypt.compare(req.body.password, user.password);

	if (!validPass)
		return res.status(400).send('Email or Password is Incorrect');

	//Creating JWT
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);
});

module.exports = router;
