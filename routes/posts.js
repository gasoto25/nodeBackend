const router = require('express').Router();
const verify = require('../verifyToken');

router.get('/', verify, (req, res) => {
	res.json({
		posts: [
			{
				title: 'Darksouls',
				description: 'a very fun and challenging game',
			},
			{
				title: 'Darksouls 2',
				description: 'a fun and challenging game',
			},
			{
				title: 'Darksouls',
				description: 'a throw back to DS1',
			},
		],
	});
});

module.exports = router;
