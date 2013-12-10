var mongoose = require('mongoose');
var StudentSchema  = require('../schemas/student');

//Students Collection
var Students = mongoose.model('Students', StudentSchema);

module.exports = Students;