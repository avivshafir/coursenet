
var Courses = require('./data/models/course');

exports.getCourseByTitle = function(req, res) {

	var title = req.params.title;
    console.log('Retrieving course: ' + title);
    
    if(title)
    {
        Courses.findOne({'title': title}, function (err, item) {
            res.setHeader("Content-Type", "text/plain");
            console.log("err="+err);
            console.log("item="+item);
            res.send(item);
        }); 
    }
};


exports.getCourseByNumber = function(req, res) {

    var courseNumber = req.params.courseNumber;
    console.log('Retrieving course: ' + courseNumber);

    if(courseNumber)
    {
        Courses.findOne({'courseNumber': courseNumber}, function (err, item) {
            res.setHeader("Content-Type", "text/plain");
            console.log("err="+err);
            console.log("item="+item);
            res.send(item);
        }); 
    }
};


exports.getCoursesWithNoVotes = function (req,res){

    console.log('in coursesWithNoVotes js');
    Courses.where('rating.numberOfVotes').lt(1).exec(function (err,result){
        console.log(result);
        res.send(result);
    });
}


exports.getCourseMaxRating = function (req,res){

        Courses.find()
            .sort('rating.numberOfVotes', -1)
            .limit(1)
            .exec(function (err,result){
                console.log(result);
                res.send(result);
            });  
}


exports.getCourses = function(req, res) {
	Courses.find( {} , function (err, items) {
        res.send(items);
    });

};

exports.addCourse = function (req,res)
{
	var course = req.body;

	console.log("in addCourse");
	console.log("course = " + JSON.stringify(course));

    Courses.create(course , function(err){
        if(err){
            if(err.code === 11000){
                res.send('course title In use already', 409);
            } else {
                res.json(err);
            }
            return;
        }
        console.log("added course to database");
        res.send(JSON.stringify(course));
    });

};


exports.getCoursesWithPointsAndCategory = function (req,res)
{   
    console.log("in getCoursesWithPointsCategory");

    var category = req.params.category;
    var points = req.params.points;

    console.log(category);
    console.log(points);

    //make the query
    Courses.find({ 'category' : category , 'points' : points } , function (err,docs){
        console.log(docs);
        res.send(docs);
    });

};


exports.updateCourse = function (req, res) {

    console.log("in updateCourse");

	var course = req.body;

    console.log(req.params.title);
    console.log(JSON.stringify(course));
	
    Courses.update({ 'title': req.params.title }, course, function (err, result) {
        if (err) {
            console.log('Error updating course: ' + err);
            res.send({'error':'An error has occurred trying to update'});
        } else {
            console.log('' + result + ' document(s) updated');
            res.send(course);
        }
    });

};


exports.deleteCourse = function (req, res) {

	var title = req.body.title;

    console.log('Deleting course: ' + title);

    Courses.remove({'title': title}, function (err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('' + result + ' document(s) deleted');
            res.send(req.body);
        }
    });
};

