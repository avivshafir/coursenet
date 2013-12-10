var mongoose = require('mongoose');

mongoose.set('debug', true);

var CourseSchema = new mongoose.Schema({
   courseNumber : {type: Number, unique: true},
   title: String,
   description: String,
   category: { type: String, index: true, default: 1 }, //1 - mandatory 2 - not mandatory
   target: { type: String, default: 1 }, //1 - year 1 students
   points: String, 
   rating : {
   	avgDifficulty: { type: Number, default: 0 },
      totalDifficulty: { type: Number, default: 0 },
	   avgIntensity: { type: Number, default: 0 },
      totalIntensity: { type: Number, default: 0 },
	   avgEffectivness: { type: Number, default: 0 },
      totalEffectivness: { type: Number, default: 0 },
      numberOfVotes : { type: Number, default: 0 }
   },
   comments: [{ text: String, date: Date }]
});

module.exports = CourseSchema;