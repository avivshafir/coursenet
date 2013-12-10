
var Students = require('./data/models/student');

exports.getStudent = function(req, res) {

    var username = req.params.username;
    console.log('Retrieving student: ' + username);
	if (username) 
	{
	    Students.findOne({'username': username}, function (err, student) {
			res.setHeader("Content-Type", "text/plain");
			console.log("err = " + err);
			console.log("Found Student = " + student);
            res.send(student);
        });
	}
};

exports.getStudents = function(req, res) {
    Students.find({},function (err, items) {
        res.send(items);
    });
};

exports.addStudent= function (req,res)
{
	var student = req.body;
	console.log("in addStudent");
	console.log("student = " + JSON.stringify(student));

    Students.create(student , function(err){
        if(err){
            if(err.code === 11000){
                res.send('username In use already', 409);
            } else {
                res.json(err);
            }
            return;
        }
        console.log("added student to database");
        res.send(JSON.stringify(student));
    });
};


exports.updateStudent= function(req, res) {

    console.log("in updateStudent");
    console.log(req.body);

    var student = req.body;
	console.log("updating Student username = " + JSON.stringify(student));
	
    Students.update({'username':req.body.username}, student, {safe:true}, function (err, result) {
        if (err) {
            console.log('Error updating users students: ' + err);
            res.send({'error':'An error has occurred'});
        } else {
            console.log('' + result + ' document(s) updated');
            res.send(student);
        }
    });
}


exports.deleteStudent = function(req, res) {

    var username = req.body.username;
    console.log('Deleting student: ' + username);

    Students.remove({'username': username}, function (err, result) {
        if (err) {
            res.send({'error':'An error has occurred - ' + err});
        } else {
            console.log('' + result + ' document(s) deleted');
            res.send(req.body);
        }
    });  
};

