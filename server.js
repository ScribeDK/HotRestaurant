// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


// Table Reservations (DATA)
// =============================================================
var tableReservations = [

]

var tableWait = [

]
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function(req, res){

	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/Main.html'));
})

// Basic route that sends the user second to the AJAX Page
app.get('/all', function(req, res){

	res.sendFile(path.join(__dirname + '/Tables.html'));
})

// Basic route that sends the user third to the AJAX Page
app.get('/add', function(req, res){

	res.sendFile(path.join(__dirname + '/Reservation.html'));
})

// Search for all tables - provides JSON
app.get('/api/tables', function(req, res){

	res.json(tableReservations);

})

app.get('/api/wait', function(req, res){

	res.json(tableWait);

})

// Create New Characters - takes in JSON input
app.post('/api/newTable', function(req, res){
	
	console.log(req.body);
	
	var newTable = {
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		ID: req.body.ID
	};

	if (tableReservations.length == 5){
		tableWait.push(newTable)
		//console.log(characters);
		res.json(false);
	}
	else{
	//console.log(newCharacter);
	tableReservations.push(newTable)
	//console.log(characters);
	res.json(true);
	}
})

app.post('/api/clear', function(req, res){
	
	tableReservations.length = 0;

	tableWait.length = 0;
	
	//console.log(tableReservations);
	//console.log(tableWait);
	
	res.json();
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on: http://localhost:' + PORT);
})
