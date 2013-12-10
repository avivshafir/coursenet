var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
	username : {type: String, unique: true},
	password : String,
	schoolname: String,
	email : String,
	status : String,
});


module.exports = StudentSchema;