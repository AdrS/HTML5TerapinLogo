var MYAPP = {
	canvas: null,
	context: null,
	command_text_area: null,
	run_button: null,
	command_line: null,
	error_log: null,
	position: null,
	home: null,
	width: 0,
	height: 0,
	pendown: true,
	log_error: function(error) {
		console.error(error);
		error_log.value = error_log.value + error + '\n';
	},
	init: function() {
		canvas = document.getElementById('canvas');
		command_line = document.getElementById('command');
		command_text_area = document.getElementById('commands');
		run_button = document.getElementById('run');
		error_log = document.getElementById('errors');
		if(!canvas || !command_line || !command_text_area || !run_button || !error_log) {
			console.error('could not get element');
			return;
		}
		context = canvas.getContext('2d');
		if(!context) {
			console.error('could not canvas context');
			return;
		}
		canvas.width = width = document.body.clientWidth;
		canvas.height = height = 300;
		home = { x: (width/2), y: (height/2), heading: 90};
		position = Object.create(home);
		run_button.onclick = function() {
			console.log('ready');
		}
		command_line.onchange = function() { //enter pressed
			console.log('change');
		}
		command_line.onkeypress = function() {
			console.log("ky");
		}
	},
	BACK: function(distance) {//BK
		//moves turtle opposite direction
	},
	CLEAN: function() {
		//erases all graphics, does not affect turtle heading
	},
	CLEARGRAPHICS: function() { //CG
		//clears current graphics, puts turtule home
	},
	FORWARD: function(distance) { //FD
		//moves turtule forward
	},
	HIDETURTLE: function() { //HT
		//make current turtle cursor disapear
	},
	HOME: function() {
		//moves cursor to home position
	},
	LEFT: function(deg) { //LT
		//turns left specified number of degrees
		heading += deg;
	},
	PENDOWN: function() { //PD
		//puts pendown
		pendown = true;
	},
	PENERASE: function() { //PE
		//turns pen into eraser mode
		//set color to background color
	},
	PENUP: function() { //PU
		//raises pen
		pendown = false;
	},
	RIGHT: function(deg) { //RT
		//turns turtle to the right specified number of degrees
		heading -= deg;
	},
	SETHEADING: function(deg) { //SETH
		//turns turtle to the right specifed number of degrees
		heading = deg;
	},
	SETXY: function(x, y) {
		//sets position of cursor
	},
	TOWARDS: function(x, y) {
		//sets heading toward point
	}
};
