var TimeSlot = require('./Class/TimeSlot');
const Schedule = require('./Class/Schedule.js');

//-----------------------------------------------------//
//              >> Parser :  CruParser   <<            //
//-----------------------------------------------------//

var CruParser = function(sTokenize, sParsedSymb){
	// The list of TimeSlot parsed from the input file.
	this.parsedTimeSlot = [];
	this.symb = ["EDT.CRU","+","P=","H=","F","S=","//","$"];
	this.showTokenize = sTokenize;
	this.showParsedSymbols = sParsedSymb;
	this.errorCount = 0;
}

//-----------------------------------------------------//
//             >> Parser :  Procedures   <<            //
//-----------------------------------------------------//


// tokenize : tranform the data input into a list
CruParser.prototype.tokenize = function(data){
	var separator = /(\r\n|,P=|,H=| |:|-|,S=|,|\/\/)/;
	data = data.split(separator);
	data = data.filter((val, idx) => !val.match(separator)); 					
	return data;
}

// parse : analyze data by calling the first non terminal rule of the grammar
CruParser.prototype.parse = function(data){
	var tData = this.tokenize(data);
	if(this.showTokenize){
		console.log(tData);
	}
	this.listTimeSlot(tData);
}

// Parser operand
CruParser.prototype.errMsg = function(msg, input){
	// this.errorCount++;
	// console.log("Parsing Error ! on "+ input +" -- msg : "+msg);
}

// Read and return a symbol from input
CruParser.prototype.next = function(input){
	var curS = input.shift();
	if(this.showParsedSymbols){
		console.log(curS);
	}
	return curS
}

// accept : verify if the arg s is part of the language symbols.
CruParser.prototype.accept = function(s){
	var idx = this.symb.indexOf(s);
	// index 0 exists
	if(idx === -1){
		this.errMsg("symbol |"+ s +"| unknown", [""]);
		return false;
	}
	return idx;
}

// checkChar : check whether the arg elt is on the head of the list
CruParser.prototype.checkChar = function(s, input){
	if(this.accept(input[0].charAt(0)) == this.accept(s)){
		return true;	
	}
	return false;
}

// expectChar : expect the next symbol to be s.
CruParser.prototype.expectChar = function(s, input){
	if(s == input[0].charAt(0)){
		return true;
	}else{
		this.errMsg("symbol "+ s +" doesn't match", input);
	}
	return false;
}

// seekChar : reach the selected character
CruParser.prototype.seekChar = function(s, input){
	while(s != input[0].charAt(0)){
		this.next(input);
	}
}

// seekChars : reach the selected characters
CruParser.prototype.seekChars = function(s1, s2, input){
	var continuer = true;
	while(input[1] != undefined && continuer == true){
		this.next(input);
		if(s1 == input[0] || s2 == input[0].charAt(0)){
			continuer = false;
		}
	}
}

//-----------------------------------------------------//
//                 >> Parser :  Rules  <<              //
//-----------------------------------------------------//

// <liste_timeSlot>
CruParser.prototype.listTimeSlot = function(input){
	this.seekChar("+", input);
	this.timeSlot(input);
}

// <timeSlot>
CruParser.prototype.timeSlot = function(input){

	if(this.checkChar("+", input)){
		this.expectChar("+", input);
	
		var ue = input[0].substring(1); //on enlève le 1er caractère de la chaîne "+UEXX", donc on enlève le + et on ne garde que "UEXX"
		
	//Récupérer le nom de l'UE dans une variable en enlevant le +
		var continuer = true;

		while(continuer == true){
			//atteindre le prochain +
			this.seekChars("1", "+", input);
			if(input[0] == "1"){
				var schedule = Schedule.getInstance();
					   //addTimeSlot(UE, type, capacity, dayTime, startHour, startMin, endHour, endMin, subGroupIndex, roomName)
					   if(ue != "UVUV"){
						schedule.addTimeSlot(ue, input[1], input[2], input[3], input[4], input[5], input[6], input[7], input[8], input[9]);
					   }
					} else{
				continuer = false;
			}
		}
		
		if(input.length > 0){
			this.timeSlot(input);
		}
		return true;
	}else{
		return false;
	}

}

module.exports = CruParser;