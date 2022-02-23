const { array } = require('vega');
const { internalField } = require('vega-lite');
var CourseTime = require('./CourseTime');
var RoomTime = require('./RoomTime');
var TimeSlot = require('./TimeSlot');
var scanf = require('scanf');
const fs = require('fs');

class Schedule{
	#roomTimes = new Map();
	#courseTimes = new Map();
	static schedule;

	Schedule(){

	}

	toString(){
		var chaine = "\n\n\t\t >> General Timetable << \n ------------------------------------------------------------";
		chaine += "\n\n ------------------------------------------------------------\n\n\t\t >>>> Timetable per UE <<<< \n\n ------------------------------------------------------------";
		for (var v of this.#courseTimes){chaine += "\n  " + v[1];}
		chaine += "\n\n ------------------------------------------------------------\n\n\t\t >>>> Timetable per room <<<< \n\n ------------------------------------------------------------";
		for (var v of this.#roomTimes){chaine += "\n  " + v[1];}
		chaine += "\n\n ------------------------------------------------------------";
		return chaine;
	}

	static getInstance(){
		if(this.schedule == null){
			this.schedule = new Schedule();
		}
		return this.schedule;
	}

	addCourseName(courseName){
		this.#courseTimes.set(courseName, new CourseTime(courseName));
	}

	addRoomName(roomName){
		this.#roomTimes.set(roomName, new RoomTime(roomName));
	}

	addTimeSlot(UE, type, capacity, dayTime, startHour, startMin, endHour, endMin, subGroupIndex, roomName){
		if(this.#courseTimes.get(UE) === undefined){
			this.addCourseName(UE);
		}
		if(this.#roomTimes.get(roomName) === undefined){
			this.addRoomName(roomName);
		}
		var timeSlot = new TimeSlot(type, capacity, dayTime, startHour, startMin, endHour, endMin, subGroupIndex, roomName)
		this.#courseTimes.get(UE).addTimeSlot(timeSlot);
		this.#roomTimes.get(roomName).addTimeSlot(timeSlot);
	}

	getCourseTime(UE){
		return this.#courseTimes.get(UE);
	}

	getRoomTime(roomName){
		return this.#roomTimes.get(roomName);
	}

	//Classify the Timeslots according to the courseType
	sortType(courseName,courseType){
		if (courseType==="all"){
			console.log(this.#courseTimes.get(courseName).toString());
		}else if (courseType==="C"){
			var courses=this.#courseTimes.get(courseName).toString();
				var courses1=courses.split(/[(\r\n)\r\n]+/);
				var exist=false;
				for(var i = 0; i < courses1.length; i++) {
					var condition=/1,C/g;
				
					if (condition.test(courses1[i])==true) {
						console.log(courses1[i]);
						exist=true;
					}
				}
				if(exist==false){
					console.log("This course does not have this courseType.");
				}


		}else if (courseType==="D"){
				var courses=this.#courseTimes.get(courseName).toString();
				var courses1=courses.split(/[(\r\n)\r\n]+/);
				var exist=false;
				for(var i = 0; i < courses1.length; i++) {
					var condition=/1,D/g;
				
					if (condition.test(courses1[i])==true) {
						console.log(courses1[i]);
						exist=true;
					}
				}
				if(exist==false){
					console.log("This course does not have this courseType.");
				}

		}else if (courseType==="T"){
			var courses=this.#courseTimes.get(courseName).toString();
				var courses1=courses.split(/[(\r\n)\r\n]+/);
				var exist=false;
				for(var i = 0; i < courses1.length; i++) {
					var condition=/1,T/g;
				
					if (condition.test(courses1[i])==true) {
						console.log(courses1[i]);
						exist=true;
					}
				}
				if(exist==false){
					console.log("This course does not have this courseType.");
				}
			}
	}

	// Features : SPEC01
	getCourseInfo(){
		console.log("\n\n\t\t >> Course informations << \n ------------------------------------------------------------");
		console.log("\n A course is identified in the cru file with a '+' symbol before its name.")
		console.log("\n >> Enter the course name : ");
		var courseName = scanf("%s");
		console.log("\n >> Enter the course type(C/D/T), \n If you want to search for all types under this course, taper 'all': ");
		var courseType = scanf("%s");
		if (courseType ==="all" || courseType === 'C' || courseType === 'D'|| courseType === 'T' ){
		//console.log(this.#courseTimes.get(courseName).toString());
		this.sortType(courseName,courseType);
		
		}else{
			console.log("\n course type error, please search again.");
			this.getCourseInfo();
		}
		console.log("\n ------------------------------------------------------------");
	}
	
	// Features : SPEC02
	getARoomCapacity(){
		console.log("\n\n\t\t >> Room capacity << \n ---------------------------------------------------");
		console.log("\n >> Enter the room name : ");
		var roomName = scanf("%s");
		if (roomName === 'EXT1'){
			console.log("\n >> Room Capacity of " + roomName + " : unlimited");
			console.log("\n ------------------------------------------------------------");
		}
		else {
			console.log("\n >> Room Capacity of " + roomName + " : " + this.#roomTimes.get(roomName).getRoomCapacity() + " students");
			console.log("\n ---------------------------------------------------");
		}
	}

	// Features : SPEC03
	freeRooms(){
		let freeRooms = new Array();
		console.log('\n\n\t >> Free rooms for a period given << \n ---------------------------------------------------');

		console.log("\n >> Enter the day of the research \n(Monday: \'L\', Tuesday: \'MA\', Wednesday: \'ME\', Thursday: \'J\', Friday: \'V\', Saturday: \'S\'*");
		let day = scanf('%s');
		while (day !=='L'|'MA'|'ME'|'J'|'V'|'S'){
			console.log("\n *** Error : The day entered is invalid ***\n >> Please enter again.");
			day = scanf('%s');
		}

		console.log("\n >> Enter the start period.");
		let timeStart = scanf('%d');

		console.log("\n >> Enter the end period.");
		let timeEnd = scanf('%d');
		var regex = new RegExp(/\d\d?/);
		while (regex.test(timeStart)===false||regex.test(timeEnd)===false){
			console.log("\n *** Error : The period entered is invalid ***\n Please enter again.");
			console.log("\n >> Enter the start period again.");
			timeStart = scanf('%d');
	
			console.log("\n >> Enter the end period again.");
			timeEnd = scanf('%d');
		}
		while (timeStart>=timeEnd||timeStart>=24){
			console.log("\n *** Error : The period entered is invalid ***\n Please enter again.");
			console.log("\n >> Enter the start period again.");
			timeStart = scanf('%d');
	
			console.log("\n >> Enter the end period again.");
			timeEnd = scanf('%d');
		}		
		for (const [key, value] of this.#roomTimes){
			let free = true;
			value.getTimeSlot().map((currElement, index) => {
				if (currElement.getDayTime() === day){
					if (!(currElement.getTimeStart()[0] + currElement.getTimeStart()[1]/100 >= timeEnd || currElement.getTimeEnd()[0] + currElement.getTimeEnd()[1]/100 <= timeStart)){
						free = false
					}
				}
				if (key === 'EXT1'){
					free = false;
				}	
			});
			if (free === true) {
				freeRooms.push(key);
			}
			
		}

		console.log("\n >> List of the free rooms : " + freeRooms);
		console.log("\n ---------------------------------------------------");				
	}				

	// Features : SPEC04
	createICalendar(){
		
		var listeEvent = new Array();
		var UE = "";
		var dayStart = new Array(3);
		var dayEnd = new Array(3);


		//Définition de la date de début de l'ICalendar
		console.log('\n\n\t >> Export TimeTable in iCalendar format << \n ------------------------------------------------------------');
		console.log('\n /!\\ You need to give two dates which are later than today\n');

		console.log('\n >> Enter the day you would start *between 1 and 31*');
		dayStart[0] = scanf('%d');
		if (dayStart[0]<10){dayStart[0]=`0${dayStart[0]}`};
		

		console.log('\n >> Enter the month you would start *between 1 and 12*');
		dayStart[1] = scanf('%d');
		if (dayStart[1]<10){dayStart[1]=`0${dayStart[1]}`};

		console.log('\n >> Enter the year you would start *YYYY format*');
		dayStart[2] = scanf('%s');


		//Définition de la date de début de l'ICalendar
		console.log('\n >> Enter the day you would end *between 1 and 31*');
		dayEnd[0] = scanf('%d');
		if (dayEnd[0]<10){dayEnd[0]=`0${dayEnd[0]}`};

		console.log('\n >> Enter the month you would end *between 1 and 12*');
		dayEnd[1] = scanf('%d');
		if (dayEnd[1]<10){dayEnd[1]=`0${dayEnd[1]}`};

		console.log('\n >> Enter the year you would end *YYYY format*');
		dayEnd[2] = scanf('%s');
		if (parseInt(dayStart[2])===parseInt(dayEnd[2])){
			if (dayStart[1]===dayEnd[1]){
				if (dayStart[0]>dayEnd[0]){
					console.log('\n *** Error : Date entered invalid, please enter again ***');
					this.createICalendar();
				}
			}
			else if (dayStart[1]>dayEnd[1]){
				console.log('\n *** Error: Date entered invalid, please enter again ***');
				this.createICalendar();
			}
		}
		else if (parseInt(dayStart[2])===parseInt(dayEnd[2])){
			console.log('\n *** Error : Date entered invalid, please enter again ***');
			this.createICalendar();
		}



		var value = 'BEGIN:VCALENDAR\nVERSION:2.0\n';

		//Création d'un array contenant l'ensemble des TimeSlots qu'il faudra définir dans l'ICalendar
		while (UE!='0'){
			console.log("\n >> Enter your UEs. (enter 0 to end)");
			UE = scanf('%s');
			if (UE != 0){
				this.#courseTimes.get(UE).getTimeSlot().map((Cours, i) => {
					console.log(Cours.toString());
				})
				console.log("\n >> Enter the types of course you do. (like \'T4\', \'D2\' or \'C1\'..., enter 0 to end)");
				var type = scanf('%s');
				while (type!='0'){
					this.#courseTimes.get(UE).getTimeSlot().map((Cours, i) => {
						if (Cours.getType() === type){
							//AJOUT DE TOUS LES EVENTS D'UN COURS
							var freq;
							if (Cours.getSubGroupIndex() == 'F1'){
								freq = '1';
							}
							else if (Cours.getSubGroupIndex() == 'F2'){
								freq = '2';
							}
							var day;
							if (Cours.getDayTime() === 'L'){
								day='MO';
							}
							else if (Cours.getDayTime() === 'MA'){
								day='TU';
							}
							else if (Cours.getDayTime() === 'ME'){
								day='WE';
							}
							else if (Cours.getDayTime() === 'J'){
								day='TH';
							}
							else if (Cours.getDayTime() === 'V'){
								day='FR';
							}
							else if (Cours.getDayTime() === 'S'){
								day='SA';
							}
							var time = new Array(6);
							

							if (Cours.getTimeStart()[0]-1<10){time[0]=`0${Cours.getTimeStart()[0]-1}`}
							else if (Cours.getTimeStart()[0]-1>10){(time[0]) = `${Cours.getTimeStart()[0]-1}`};

							if (Cours.getTimeStart()[1]<10){time[1]=`0${Cours.getTimeStart()[1]}`}
							else if (Cours.getTimeStart()[1]>10){(time[1]) = `${Cours.getTimeStart()[1]}`};

							if (Cours.getTimeEnd()[0]-1<10){time[2]=`0${Cours.getTimeEnd()[0]-1}`}
							else if (Cours.getTimeEnd()[0]-1>10){(time[2]) = `${Cours.getTimeEnd()[0]-1}`};

							if (Cours.getTimeEnd()[1]<10){time[3]=`0${Cours.getTimeEnd()[1]}`}
							else if (Cours.getTimeEnd()[1]>10){(time[3]) = `${Cours.getTimeEnd()[1]}`};

							time[4] = parseInt((Cours.getTimeEnd()[0]+Cours.getTimeEnd()[1]/100) - (Cours.getTimeStart()[0]+Cours.getTimeStart()[1]/100));
							time[5] = (Math.abs((Cours.getTimeEnd()[1])/6 - (Cours.getTimeStart()[1])/6)) * 6;

							if (time[5]<10){time[5]=`0${time[5]}`}
							else if (time[5]>10){time[5] = `${time[5]}`};

							value = `${value}BEGIN:VEVENT\nDURATION:PT${time[4]}H${time[5]}M\nDTSTART:${dayStart[2]}${dayStart[1]}${dayStart[0]}T${time[0]}${time[1]}00Z\nDTEND:${dayStart[2]}${dayStart[1]}${dayStart[0]}T${time[2]}${time[3]}00Z\nLOCATION:University of Technology of Troyes\nRRULE:FREQ=WEEKLY;BYDAY=${day};INTERVAL=${freq};UNTIL=${dayEnd[2]}${dayEnd[1]}${dayEnd[0]}T000000Z\nDESCRIPTION:${Cours.getType()} de ${UE}\nSUMMARY:${UE}\nEND:VEVENT\n`;
						
						}
					})
				type = scanf('%s');
				}
				
				
			}
			
		}
		
		const fsLibrary  = require('fs')

		value = `${value}END:VCALENDAR`;
		fsLibrary.writeFile('./results/ICalendar.ics', value, (error) => {
		    // In case of a error throw err exception.
		    if (error) throw err;
		});

		console.log('\n\n\t >> The file has been created << \n -----------------------------------------------');

	}

	// Features : SPEC05
	roomOccupancyRates(){
		//Begining of roomOccupancyRates.html
		var file = "<!DOCTYPE html>"
				  + "\n<html>"
				  + "\n\t<head>"
				  + "\n\t\t<title>CRU File > Room Occupancy Rates</title>"
				  + "\n\t\t<meta charset=\"utf-8\" />"

				  + "\n\n\t\t<script src=\"https://cdn.jsdelivr.net/npm/vega@5.21.0\"></script>"
				  + "\n\t\t<script src=\"https://cdn.jsdelivr.net/npm/vega-lite@5.2.0\"></script>"
				  + "\n\t\t<script src=\"https://cdn.jsdelivr.net/npm/vega-embed@6.20.2\"></script>"

				  + "\n\n\t\t<style media=\"screen\">"
				  + "\n\t\t\t/* Add space between Vega-Embed links  */"
				  + "\n\t\t\t.vega-actions a {"
				  + "\n\t\t\t\tmargin-right: 5px;"
				  + "\n\t\t\t}"
				  + "\n\t\t</style>"
				  + "\n\t</head>"
				  + "\n\t<body>"
				  + "\n\t\t<h1>Room Occupancy Rates</h1>"
				  + "\n\t\t<!-- Container for the visualization -->"
				  + "\n\t\t<div id=\"vis\"></div>"

				  + "\n\n\t\t<script>"
				  + "\n\t\t\t// Assign the specification to a local variable vlSpec."
				  + "\n\t\t\tvar vlSpec = {"
				  + "\n\t\t\t\t$schema: 'https://vega.github.io/schema/vega-lite/v5.json',"
				  + "\n\t\t\t\t\"data\": {"
				  + "\n\t\t\t\t\t\"values\": [";

		//get the values to add
		var valuesMap = new Map();

		function setValues(value, key, map) {
			if(key !== "EXT1"){
				var capacity = value.getRoomCapacity();
				if (capacity == 0){capacity = 1;}
				var v = 0;
				var i = 0;
				//Faire une boucle pour chaque créneau d'une salle
				value.getTimeSlot().forEach((timeSlot) => {
					v += timeSlot.getCapacity();
					i++;
				});
				valuesMap.set(key, v/i/capacity*100);
			}
		}

		function valuesToString(value, key, map) {
			values += "{\"Room\": \"" + `${key}` + "\", \"Occupancy (%)\": " + `${value}` + "},";
		}

		this.#roomTimes.forEach(setValues);

		var values = "\n\t\t\t\t\t\t";
		valuesMap.forEach(valuesToString);
		values = values.slice(0, values.length - 1); //we remove the last ','

		//Add the values to roomOccupancyChart.html
		file += values;

		//End of roomOccupancyChart.html
		file += "\n\t\t\t\t\t]"
		    	+ "\n\t\t\t\t},"
		        + "\n\t\t\t\t\"mark\": \"bar\","
		        + "\n\t\t\t\t\"encoding\": {"
		        + "\n\t\t\t\t\t\"y\": {\"field\": \"Room\", \"type\": \"nominal\", \"sort\": \"-x\"},"
		        + "\n\t\t\t\t\t\"x\": {\"field\": \"Occupancy (%)\", \"type\": \"quantitative\"},"
		        + "\n\t\t\t\t\t\"color\":{"
		        + "\n\t\t\t\t\t\t\"field\": \"Room\","
		        + "\n\t\t\t\t\t\t\"scale\": {"
		        + "\n\t\t\t\t\t\t\t\"range\":[\"#4457FF\", \"#42C0FF\", \"#FFA300\"]"
		        + "\n\t\t\t\t\t\t}"
		        + "\n\t\t\t\t\t}"
		        + "\n\t\t\t\t}"
		      	+ "\n\t\t\t};"

		      	+ "\n\n\t\t\t// Embed the visualization in the container with id `vis`"
		      	+ "\n\t\t\tvegaEmbed('#vis', vlSpec);"
		    	+ "\n\t\t</script>"
		  		+ "\n\t</body>"
				+ "\n</html>";
		
		const fsLibrary  = require('fs')
		  
		// Write file in 'capacityRoomChart.html' .
		var id = Math.floor(Math.random() * 100); //Generate a random integer between 0 and 100
		fsLibrary.writeFile('./results/' + id + 
			'roomOccupancyChart.html', file, (error) => {
		    	// In case of a error throw err exception.
		    	if (error) throw err;
		});

		console.log("roomOccupancyChart.html generated in the '/results' folder");

	}

	// Features : SPEC06
	capacityRoomChart(){
		//Begining of capacityRoomChart.html
		var file = "<!DOCTYPE html>"
				  + "\n<html>"
				  + "\n\t<head>"
				  + "\n\t\t<title>CRU File > Capacity Room Chart</title>"
				  + "\n\t\t<meta charset=\"utf-8\" />"

				  + "\n\n\t\t<script src=\"https://cdn.jsdelivr.net/npm/vega@5.21.0\"></script>"
				  + "\n\t\t<script src=\"https://cdn.jsdelivr.net/npm/vega-lite@5.2.0\"></script>"
				  + "\n\t\t<script src=\"https://cdn.jsdelivr.net/npm/vega-embed@6.20.2\"></script>"

				  + "\n\n\t\t<style media=\"screen\">"
				  + "\n\t\t\t/* Add space between Vega-Embed links  */"
				  + "\n\t\t\t.vega-actions a {"
				  + "\n\t\t\t\tmargin-right: 5px;"
				  + "\n\t\t\t}"
				  + "\n\t\t</style>"
				  + "\n\t</head>"
				  + "\n\t<body>"
				  + "\n\t\t<h1>Capacity Room Chart</h1>"
				  + "\n\t\t<!-- Container for the visualization -->"
				  + "\n\t\t<div id=\"vis\"></div>"

				  + "\n\n\t\t<script>"
				  + "\n\t\t\t// Assign the specification to a local variable vlSpec."
				  + "\n\t\t\tvar vlSpec = {"
				  + "\n\t\t\t\t$schema: 'https://vega.github.io/schema/vega-lite/v5.json',"
				  + "\n\t\t\t\t\"data\": {"
				  + "\n\t\t\t\t\t\"values\": [";
		
		//get the values to add
		var valuesMap = new Map();

		function setValues(value, key, map) {
			let capacity = value.getRoomCapacity();
			let v = valuesMap.get(capacity);
			if(v === undefined){
				valuesMap.set(capacity, 1);
			} else {
				valuesMap.set(capacity, v+1);
			}
		}

		function valuesToString(value, key, map) {
			values += "{\"capacity\": \"" + `${key}` + "\", \"number\": " + `${value}` + "},";
		}

		this.#roomTimes.forEach(setValues);

		var values = "\n\t\t\t\t\t\t";
		valuesMap.forEach(valuesToString);
		values = values.slice(0, values.length - 1); //we remove the last ','

		//Add the values to capacityRoomChart.html
		file += values;

		//End of capacityRoomChart.html
		file += "\n\t\t\t\t\t]"
		    	+ "\n\t\t\t\t},"
		        + "\n\t\t\t\t\"mark\": \"bar\","
		        + "\n\t\t\t\t\"encoding\": {"
		        + "\n\t\t\t\t\t\"y\": {\"field\": \"capacity\", \"type\": \"nominal\"},"
		        + "\n\t\t\t\t\t\"x\": {\"field\": \"number\", \"type\": \"quantitative\"},"
		        + "\n\t\t\t\t\t\"color\":{"
		        + "\n\t\t\t\t\t\t\"field\": \"capacity\","
		        + "\n\t\t\t\t\t\t\"scale\": {"
		        + "\n\t\t\t\t\t\t\t\"range\":[\"#4457FF\", \"#42C0FF\", \"#FFA300\"]"
		        + "\n\t\t\t\t\t\t}"
		        + "\n\t\t\t\t\t}"
		        + "\n\t\t\t\t}"
		      	+ "\n\t\t\t};"

		      	+ "\n\n\t\t\t// Embed the visualization in the container with id `vis`"
		      	+ "\n\t\t\tvegaEmbed('#vis', vlSpec);"
		    	+ "\n\t\t</script>"
		  		+ "\n\t</body>"
				+ "\n</html>";
		
		const fsLibrary  = require('fs')
		  
		// Write file in 'capacityRoomChart.html' .
		fsLibrary.writeFile('./results/capacityRoomChart.html', file, (error) => {
		    // In case of a error throw err exception.
		    if (error) throw err;
		});

		console.log("capacityRoomChart.html generated in the '/results' folder");
	}

	// Features : SPECNF01
	verifEnsembleSchedule(){
		console.log('\n\n\t >> Schedule analysis << \n ---------------------------------------');
		for (const [key, value] of this.#roomTimes){
			this.#roomTimes.get(key).getTimeSlot().map((ElmCompared, i) => {
				this.#roomTimes.get(key).getTimeSlot().map((SecElmCompared, j) => {
					if (key != 'EXT1'){
						if (ElmCompared.getDayTime() === SecElmCompared.getDayTime() && i!=j && i<j){
							if (!(ElmCompared.getTimeStart()[0] + ElmCompared.getTimeStart()[1]/100 >= SecElmCompared.getTimeEnd()[0] + SecElmCompared.getTimeEnd()[1]/100 || ElmCompared.getTimeEnd()[0] + ElmCompared.getTimeEnd()[1]/100 <= SecElmCompared.getTimeStart()[0] + SecElmCompared.getTimeStart()[1]/100)){
								console.log("\n >> Error : missmatch at for course : " + key + "\n- " + ElmCompared.toString() + "\n- " + SecElmCompared.toString());
							} else {
								console.log("\n >> Course " + key + " has no missmatch.");
							}
						}
					}
				})
			})	
		}
		console.log('\n\n\t >> End of analysis << \n ---------------------------------------');
	}
}	

module.exports = Schedule;