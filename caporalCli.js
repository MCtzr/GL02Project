const fs = require('fs');
const colors = require('colors');
const CruParser = require('./CruParser.js');
const Schedule = require('./Class/Schedule.js');

const vg = require('vega');
const vegalite = require('vega-lite');

const cli = require("@caporal/core").default;

//-----------------------------------------------------//
//            >> FrameWork : CaporalCli <<             //
//-----------------------------------------------------//

cli
	.version('cru-parser-cli')
	.version('0.07')


	
	//-----------------------------------------------------//
	//              >> Command :  readMe <<                //
	//-----------------------------------------------------//

	.command('readMe',"Display the informations in the ReadMe file")
    .action(({logger}) => {
        fs.readFile("README.md", "utf-8", function (err,data){
            console.log(data)
        })
    })

	//-----------------------------------------------------//
	//   SPEC01      >> Command :  searchCourse <<         //
	//-----------------------------------------------------//

	.command('searchCourse', '')
	.argument('<file>', "The file to analyze")
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator : cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({args, options, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}

			var parser = new CruParser(options.showTokenize, options.showSymbols);
			parser.parse(data);

			var schedule = Schedule.getInstance();
			schedule.getCourseInfo();
		});
			
	})

	//-----------------------------------------------------//
	//   SPEC02      >> Command : displaySchedule <<       //
	//-----------------------------------------------------//

	.command('displaySchedule', '')
	.argument('<file>', 'The file to analyze')
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator : cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({args, options, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
	  	
	  		var parser = new CruParser(options.showTokenize, options.showSymbols);
			parser.parse(data);

			var schedule = Schedule.getInstance();
			console.log(schedule.toString());
		});
			
	})

	//-----------------------------------------------------//
	//   SPEC02      >> Command :  capacityRoom <<         //
	//-----------------------------------------------------//

	.command('capacityRoom', '')
	.argument('<file>', "The file to analyze")
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator : cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({args, options, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
	  	
	  		var parser = new CruParser(options.showTokenize, options.showSymbols);
			parser.parse(data);

			var schedule = Schedule.getInstance();
			schedule.getARoomCapacity();
		});
			
	})

	//-----------------------------------------------------//
	//   SPEC03    >> Command :  roomAvalaible <<          //
	//-----------------------------------------------------//

	.command('roomAvailable', '')
	.argument('<file>', "The file to analyze")
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator : cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({args, options, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
	  	
	  		var parser = new CruParser(options.showTokenize, options.showSymbols);
			parser.parse(data);

			var schedule = Schedule.getInstance();
			schedule.freeRooms();
		});
			
	})

	//-----------------------------------------------------//
	//   SPEC04       >> Command :  iCalendar  <<          //
	//-----------------------------------------------------//

	.command('iCalendar', '')
	.argument('<file>', "The file to analyze to generate the .ics file")
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator : cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({args, options, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
	  	
	  		var parser = new CruParser(options.showTokenize, options.showSymbols);
			parser.parse(data);

			var schedule = Schedule.getInstance();
			schedule.createICalendar();
		});
			
	})

	//-----------------------------------------------------//
	//   SPEC05       >> Command :  roomOccupancyChart <<  //
	//-----------------------------------------------------//

	.command('roomOccupancyChart', '')
	.argument('<file>', "The file to analyze in order to generate the roomOccupancy's chart")
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator : cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({args, options, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
	  	
	  		var parser = new CruParser(options.showTokenize, options.showSymbols);
			parser.parse(data);

			var schedule = Schedule.getInstance();
			schedule.roomOccupancyRates();
		});
			
	})

	//-----------------------------------------------------//
	//   SPEC06     >> Command :  roomCapacityChart <<     //
	//-----------------------------------------------------//

	.command('roomCapacityChart', '')
	.argument('<file>', "The file to analyze in order to generate the roomCapacity's chart")
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator : cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({args, options, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
	  	
	  		var parser = new CruParser(options.showTokenize, options.showSymbols);
			parser.parse(data);

			var schedule = Schedule.getInstance();
			schedule.capacityRoomChart();
		});
			
	})

	//-----------------------------------------------------//
	//   SPECNF01   >> Command :  checkScheduleQuality <<  //
	//-----------------------------------------------------//

	.command('checkScheduleQuality', '')
	.argument('<file>', "The file to analyze")
	.option('-s, --showSymbols', 'log the analyzed symbol at each step', { validator : cli.BOOLEAN, default: false })
	.option('-t, --showTokenize', 'log the tokenization results', { validator: cli.BOOLEAN, default: false })
	.action(({args, options, logger}) => {
		
		fs.readFile(args.file, 'utf8', function (err,data) {
			if (err) {
				return logger.warn(err);
			}
	  	
	  		var parser = new CruParser(options.showTokenize, options.showSymbols);
			parser.parse(data);

			var schedule = Schedule.getInstance();
			schedule.verifEnsembleSchedule();
		});
			
	})
	
cli.run(process.argv.slice(2));