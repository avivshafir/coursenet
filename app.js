
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var students = require('./students');
var courses = require('./courses');

//CONNECT TO MONGODB DATABASE
var dbURL = 'mongodb://localhost/courseNetDataBase';
var mongoose = require('mongoose');
var db = mongoose.connect(dbURL);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.use('/public', express.static(__dirname + '/public'));
app.get('/',express.static(__dirname + '/public/'));

//students routes
app.get('/students',students.getStudents);
app.post('/students',students.addStudent);
app.get('/students/:username',students.getStudent);
app.put('/students/:username',students.updateStudent)
app.delete('/students/:username',students.deleteStudent);


//courses routes
app.get('/courses',courses.getCourses);
app.get('/courses/getCourseByTitle/:title', courses.getCourseByTitle);
app.get('/courses/getCourseByNumber/:courseNumber', courses.getCourseByNumber);
app.post('/courses',courses.addCourse);
app.put('/courses/:title',courses.updateCourse)
app.delete('/courses/:title', courses.deleteCourse);
app.get('/course/courseByCategoryAndPoints/:category/:points',courses.getCoursesWithPointsAndCategory);
app.get('/courses/complexQuerys/coursesWithNoVotes',courses.getCoursesWithNoVotes);
app.get('/courses/complexQuerys/courseWithHighestRating',courses.getCourseMaxRating);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
