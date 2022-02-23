class TimeSlot{
	#type;
	#capacity;
	#dayTime;
	#timeStart;
	#timeEnd;
	#subGroupIndex;
	#roomName;

	constructor(type, capacity, dayTime, startHour, startMin, endHour, endMin, subGroupIndex, roomName){
		this.#type = type;
		this.#capacity = parseInt(capacity);
		this.#dayTime = dayTime;
		this.#timeStart = [parseInt(startHour), parseInt(startMin)];
		this.#timeEnd = [parseInt(endHour), parseInt(endMin)];
		this.#subGroupIndex = subGroupIndex;
		this.#roomName = roomName;
	}

	toString() {
		var chaine = "1," + this.#type + ",P=" + this.#capacity + ",H=" + this.#dayTime
		 + " " + this.#timeStart[0] + ":" + `${this.#timeStart[1]}`.padStart(2, '0') + "-" + this.#timeEnd[0]
		  + ":" + `${this.#timeEnd[1]}`.padStart(2, '0') + "," + this.#subGroupIndex + ",S=" + this.#roomName;
		return chaine;
	}

	getType(){
		return this.#type;
	}

	getCapacity(){
		return this.#capacity;
	}

	getDayTime(){
		return this.#dayTime;
	}

	getTimeStart(){
		return this.#timeStart;
	}

	getTimeEnd(){
		return this.#timeEnd;
	}

	getSubGroupIndex(){
		return this.#subGroupIndex;
	}

	getRoomName(){
		return this.#roomName;
	}

}

module.exports = TimeSlot;