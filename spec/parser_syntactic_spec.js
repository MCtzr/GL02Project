/*describe("Program Syntactic testing of VpfParser", function(){
	
	beforeAll(function() {
		const POI = require('../POI');

		const VpfParser = require('../VpfParser');
		this.analyzer = new VpfParser();
		
		this.pEmptyRating = new POI("Café d'Albert", 48.857735, 2.394987, []);

	});
	
	it("can read a name from a simulated input", function(){
		
		let input = ["name", "Café d'Albert"];
		expect(this.analyzer.name(input)).toBe("Café d'Albert");
		
	});


	it("can read a lat lng coordinate from a simulated input", function(){
		
		let input = ["latlng", "48.866205;2.399279"];
		expect(this.analyzer.latlng(input)).toEqual({ lat: "48.866205" , lng: "2.399279" });
		
		// there is something missing here
		
	});	
	
	xit("can read several rankings for a POI from a simulated input", function(){
		
		// there is something missing here and this.pEmptyRating will certainly be usesul there
		
	});

	it("can read a lat lng coordinate neg from a simulated input", function(){
		
		let input = ["latlng", "-48.866205;-2.399279"];
		expect(this.analyzer.latlng(input)).toEqual({ lat: "-48.866205" , lng: "-2.399279" });
		
	});

	it("add ratings to a POI", function(){
		
		let input = ["note", "-1"];
		expect(this.analyzer.note(input)).toEqual(undefined);
		
	});		
	
	
});*/