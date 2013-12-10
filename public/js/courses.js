
$(document).ready(function()
{
	$('#getAllCoursesForm').on('submit',function(event)
	{
		event.preventDefault();
		$('#listcourses').load("courses");
	
	});

	$('#getCourseByTitleForm').on('submit',function(event)
	{
		event.preventDefault();
		var title = $('#title').val();
		console.log("coursename=" + title);
		$.get("courses/getCourseByTitle/" + title , function (data) {	
			console.log("get data="+  data);
			$('#course').html(data);
		});
	});

	$('#getCourseByNumberForm').on('submit',function(event)
	{
		event.preventDefault();
		var courseNumber = $('#number').val();
		console.log("coursename=" + courseNumber);
		$.get("courses/getCourseByNumber/" + courseNumber , function (data) {	
			console.log("get data="+  data);
			$('#courseByNumber').html(data);
		});
	});

	$('#addACourseForm').on('submit',function(event)
	{
		event.preventDefault();

		var title = $('#titleA').val();
		var description = $('#description').val();
		var category = $('#category').val();
		var target = $('#target').val();
		var points = $('#points').val();
		var courseNumber = $('#courseNumber').val();
		
		console.log("title="+title);
		$.post("courses/",{"courseNumber" : courseNumber , "title":title, "description":description, "category":category, "target":target, "points":points}, function (data)
		{
			console.log(".get data=" + data);
			$('#courseadded').html(data);		
		});
	
	});

	$('#deleteACourseForm').on('submit',function(event)
	{
		event.preventDefault();
		var title = $('#titleD').val();

		$.ajax({
		     url: 'courses/' + title,
		     type: 'DELETE',
		     data: {title : title},
		     success: function (data) {
		     		$('#coursedeleted').html(JSON.stringify(data));
		         	console.log("delete data =" + JSON.stringify(data));
	     		}
  		});
	});

	$('#updateACourseForm').on('submit',function(event)
	{
		event.preventDefault();

		var oldtitle = $('#titleU').val();
		var newtitle = $('#newtitle').val();
		var description = $('#descriptionU').val();
		var category = $('#categoryU').val();
		var target = $('#targetU').val();
		var points = $('#pointsU').val();

		$.ajax({
		     url: 'courses/' + oldtitle,
		     type: 'PUT',
		     data: {"title":newtitle, "description":description, "category":category, "target":target, "points":points}, 
		     success: function (data) {
		     		$('#courseupdated').html(JSON.stringify(data));
		         	console.log("delete data=" + JSON.stringify(data));
	     		}
  		});
	}); 


	$('#ratingForm').on('submit',function(event)
	{
		event.preventDefault();

		//get current averages by getting course by title from server
		var title = $('#title').html();
		title = $.trim(title);
		console.log(title);


		$.get("courses/getCourseByTitle/" + title , function (course) {	
			console.log("course = "+  course);

			//parse to json object
			var course = $.parseJSON(course);

			//get all form values
			var formDiff = $("#Difficulty").val();
			var formInten = $("#Intensity").val();
			var formEffec = $("#Effectivness").val();

			numUserDiff = parseInt(formDiff);
			numUserInten = parseInt(formInten);
			numUserEffec = parseInt(formEffec);

			course.rating.numberOfVotes++;
			course.rating.totalDifficulty = course.rating.totalDifficulty + numUserDiff;
			course.rating.totalEffectivness = course.rating.totalEffectivness + numUserEffec;
			course.rating.totalIntensity = course.rating.totalIntensity + numUserInten;

			console.log(course.rating.totalEffectivness);
			console.log(course.rating.totalIntensity);
			console.log(course.rating.totalDifficulty);

			course.rating.avgEffectivness = course.rating.totalEffectivness / course.rating.numberOfVotes;
			course.rating.avgIntensity  = course.rating.totalIntensity / course.rating.numberOfVotes;
			course.rating.avgDifficulty  = course.rating.totalDifficulty / course.rating.numberOfVotes;
	
			course.rating.avgEffectivness = Math.round(course.rating.avgEffectivness);
			course.rating.avgIntensity = Math.round(course.rating.avgIntensity);
			course.rating.avgDifficulty = Math.round(course.rating.avgDifficulty);

			delete course['_id'];

			console.log(course.rating);

			//update html
	        $("#avgDifficulty").html(course.rating.avgDifficulty); 
	        $("#avgEffectivness").html(course.rating.avgEffectivness);  
	        $("#avgIntensity").html(course.rating.avgIntensity);  

			//now send to server new averges to update database
			$.ajax({
			     url: 'courses/' + course.title,
			     type: 'PUT',
			     data: course, 
			     success: function (data) {
			         	console.log("updated data = " + JSON.stringify(data));			         	
			         	$('#ratingSubmitted').html('<img style="padding-top:25px;" src="images/sent.png" id="ratingSubmittedImage" alt="ratingsent">&nbsp;Rating Sent!');
		     	 }
			});
		});
	}); 

	$('#getCourseByPointsAndCategory').on('submit',function(event)
	{
		event.preventDefault();

		var category = $('#categoryS').val();
		var points = $('#pointsS').val();

		console.log(category);
		console.log(points);

		$.ajax({
		     url: '/course/courseByCategoryAndPoints/' + category + '/' + points,
		     type: 'GET',
		     success: function (data) {
		     		$('#courseByPointsAndCategory').html(JSON.stringify(data));
	     		}
  		});
	}); 
	

	$('#getCoursesWithNoVotes').on('submit',function(event)
	{
		event.preventDefault();
		console.log('in getCoursesWithNoVotes jquery')
		$.ajax({
		     url: '/courses/complexQuerys/coursesWithNoVotes' ,
		     type: 'GET',
		     success: function (data) {
		     		$('#coursesWithNoVotes').html(JSON.stringify(data));
	     		}
  		});
	}); 


	$('#getCourseWithHighestRating').on('submit',function(event)
	{
		event.preventDefault();
		console.log('in getCourseWithHighestRating jquery')
		$.ajax({
		     url: '/courses/complexQuerys/courseWithHighestRating' ,
		     type: 'GET',
		     success: function (data) {
		     		$('#highestRatedCourse').html(JSON.stringify(data));
	     		}
  		});
	}); 


	$('#clearCoursesNoVotes').on('click',function(event)
	{
		event.preventDefault();
		$('#coursesWithNoVotes').empty();
	});



	$('#clearHighestRatedCourse').on('click',function(event)
	{
		event.preventDefault();
		$('#highestRatedCourse').empty();
	});

	$('#clearCourseAfterGetByNumber').on('click',function(event)
	{
		event.preventDefault();
		$('#getCourseByNumberForm')[0].reset();
		$('#courseByNumber').empty();
	});

	$('#clearCourseAfterGet').on('click',function(event)
	{
		event.preventDefault();
		$('#getCourseByTitleForm')[0].reset();
		$('#course').empty();
	});

	$('#clearCourseAfterAdd').on('click',function(event)
	{
		event.preventDefault();
		$('#addACourseForm')[0].reset();
		$('#courseadded').empty();
	});

	$('#clearCourses').on('click',function(event)
	{
		event.preventDefault();
		$('#getAllCoursesForm')[0].reset();
		$('#listcourses').empty();
	});

	$('#clearCourseAfterUpdate').on('click',function(event)
	{
		event.preventDefault();
		$('#updateACourseForm')[0].reset();
		$('#courseupdated').empty();
	});


	$('#clearTitleAfterDeleted').on('click',function(event)
	{
		event.preventDefault();
		$('#deleteACourseForm')[0].reset();
		$('#coursedeleted').empty();
	});

	$('#clearTitleAfterSorted').on('click',function(event)
	{
		event.preventDefault();
		$('#getCourseByPointsAndCategory')[0].reset();
		$('#courseByPointsAndCategory').empty();
	});


});