const mongoose = require('mongoose');

module.exports = (async function () {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
	} catch (e) {
		console.log('Fail to connect database. ' + e.message);
	}
})();

module.exports.conn = mongoose.createConnection(process.env.MONGODB_URL);
