var mongoose = require('mongoose');
var CourseSchema  = require('../schemas/course');

//Courses Collection
Courses = mongoose.model('Course', CourseSchema);

module.exports = Courses;