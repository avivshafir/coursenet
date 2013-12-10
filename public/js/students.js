
$(document).ready(function()
{
	$('#getAllStudentsForm').on('submit',function(event)
	{
		event.preventDefault();
		$('#liststudents').load("students");
	
	});


	$('#getStudentByUserNameForm').on('submit',function(event)
	{
		event.preventDefault();	
		var username = $('#studentusername').val();
		console.log("username = " + username);
		$.get("students/" + username , function (data) {	
			console.log("get data = " +  data);
			$('#student').html(data);		
		});	
	});

	$('#addAStudentForm').on('submit',function(event)
	{
		event.preventDefault();
		var username = $('#username').val();
		var password = $('#password').val();
		var email = $('#email').val();
		var schoolname = $('#schoolname').val();
		var status = $('#status').val();

		$.post("students/",{"username":username, "password":password, "email":email, "schoolname":schoolname, "status":status},function(data)
		{
			console.log(".get data=" + data);
			$('#studentadded').html(data);		
		});
		
	});

	$('#deleteAStudentForm').on('submit',function(event)
	{
		event.preventDefault();
		var username = $('#username_To_delete').val();

		$.ajax({
	     url: 'students/:' + username,
	     type: 'DELETE',
	     data: {'username' : username},
	     success: function (data) {
	     		$('#studentdeleted').html(JSON.stringify(data));
	         	console.log("delete data =" + JSON.stringify(data));
     		}
  		});
	});

	$('#updateAStudentForm').on('submit',function(event)
	{
		event.preventDefault();

		var username = $('#username_to_update').val();
		var password = $('#passwordU').val();
		var email = $('#emailU').val();
		var schoolname = $('#schoolnameU').val();
		var status = $('#statusU').val();

		//console.log(username + " " + password + " " + email + " " + schoolname + " " + status);

		$.ajax({
		     url: 'students/:' + username,
		     type: 'PUT',
		     data: {'username' :username, 'password' :password, 'email' :email, 'schoolname':schoolname, 'status':status}, 
		     success: function (data) {
		     		$('#studentupdated').html(JSON.stringify(data));
		         	console.log("delete data = " + JSON.stringify(data));
	     		}
  		});
	});

	$('#clearStudentAfterGet').on('click',function(event)
	{
		event.preventDefault();
		$('#getStudentByUserNameForm')[0].reset();
		$('#student').empty();
	});

	$('#clearStudentAfterAdd').on('click',function(event)
	{
		event.preventDefault();
		$('#addAStudentForm')[0].reset();
		$('#studentadded').empty();
	});

	$('#clearStudents').on('click',function(event)
	{
		event.preventDefault();
		$('#getAllStudentsForm')[0].reset();
		$('#liststudents').empty();
	});

	$('#clearStudentAfterUpdate').on('click',function(event)
	{
		event.preventDefault();
		$('#updateAStudentForm')[0].reset();
		$('#studentupdated').empty();
	});


	$('#clearUserNameAfterDeleted').on('click',function(event)
	{
		event.preventDefault();
		$('#deleteAStudentForm')[0].reset();
		$('#studentdeleted').empty();
	});




});