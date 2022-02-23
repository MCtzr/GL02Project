var TimeSlot = require('./TimeSlot');

class CourseTime{
	#courseName;
	#timeSlots = new Array();

	constructor(courseName) {
		this.#courseName = courseName;
	}

	toString() {
		var chaine = "\n >> Timetable for " + this.#courseName;
		this.#timeSlots.forEach(timeSlot => chaine += "\n   " + timeSlot);
		return chaine;
	}
	
	addTimeSlot(timeSlot) {
		this.#timeSlots.push(timeSlot);
	}
	
	getTimeSlot(){
		return this.#timeSlots;
	}

	getCourseName(){
		return this.#courseName;
	}
}

module.exports = CourseTime;