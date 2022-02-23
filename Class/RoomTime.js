var TimeSlot = require('./TimeSlot');

class RoomTime{
	#roomName;
	#timeSlots = new Array();
	#roomCapacity = 0;
	#roomOccupancy;
	#roomOccupancyMax;

	constructor(roomName) {
		this.#roomName = roomName;
	}

	toString() {
		var chaine = "\n >> Timetable for room '" + this.#roomName + "' with a capacity of " + this.#roomCapacity + " seats";
		this.#timeSlots.forEach(timeSlot => chaine += "\n   " + timeSlot);
		return chaine;
	}
	
	addTimeSlot(timeSlot) {
		if(timeSlot.getRoomName() == this.#roomName){
			this.#timeSlots.push(timeSlot);
			if (this.#roomCapacity<timeSlot.getCapacity())
				this.#roomCapacity = timeSlot.getCapacity();
		}
		else{
			console.log("#ERREUR : RoomTime > addTimeSlot()\n# Trying to add a TimeSlot for the room '" + timeSlot.getRoomName()
				+ "' \n# to the room '" + this.#roomName + "'");
		}
	}

	getTimeSlot(){
		return this.#timeSlots;
	}

	getRoomCapacity(){
		return this.#roomCapacity;
	}
}

module.exports = RoomTime;