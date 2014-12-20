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
	color: '#000000',
	background_color: '#ffffdd',
	logo: null,
	terapin_image_url: 'terapin.png',
	log_error: function(error) {
		console.error(error);
		this.error_log.value = this.error_log.value + error + '\n';
	},
	init: function() {
		this.canvas = document.getElementById('canvas');
		this.command_line = document.getElementById('command');
		this.command_text_area = document.getElementById('commands');
		this.run_button = document.getElementById('run');
		this.error_log = document.getElementById('errors');
		if(!this.canvas || !this.command_line || !this.command_text_area || !this.run_button || !this.error_log) {
			console.error('could not get element');
			return;
		}
		this.context = canvas.getContext('2d');
		if(!this.context) {
			console.error('could not canvas context');
			return;
		}
		this.canvas.width = this.width = document.body.clientWidth;
		this.canvas.height = this.height = 300;
		this.home = { x: (this.width/2), y: (this.height/2), heading: 90};
		this.position = Object.create(this.home);
		this.logo = new Image();
		this.logo.src = this.terapin_image_url;
		var that = this;
		this.logo.onload = function() {
			that.CLEARGRAPHICS();
			that.context.fillStyle = that.color;
			that.run_button.onclick = function() {
				console.log('ready');
			}
			that.command_line.onchange = function() { //enter pressed
				console.log('change');
			}
			that.command_line.onkeypress = function() {
				console.log("ky");
			}
		}
	},
	draw_turtle: function() {
		//this.context.save();
		//TODO draw turtle with correct heading
		//http://stackoverflow.com/questions/17411991/html5-canvas-rotate-image
		this.context.drawImage(this.logo, this.width - this.position.x - this.logo.width/2, this.height - this.position.y - this.logo.height/2);
	},
	BACK: function(distance) {//BK
		//moves turtle opposite direction
	},
	CLEAN: function() {
		//erases all graphics, does not affect turtle heading
		this.context.fillStyle = this.background_color;
		this.context.fillRect(0,0,this.width,this.height);
		this.draw_turtle();
	},
	CLEARGRAPHICS: function() { //CG
		//clears current graphics, puts turtule home
		this.CLEAN()
		this.position = Object.create(this.home);
		this.draw_turtle();
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
		this.heading += deg;
	},
	PENDOWN: function() { //PD
		//puts pendown
		this.pendown = true;
	},
	PENERASE: function() { //PE
		//turns pen into eraser mode
		//set color to background color
	},
	PENUP: function() { //PU
		//raises pen
		this.pendown = false;
	},
	RIGHT: function(deg) { //RT
		//turns turtle to the right specified number of degrees
		this.heading -= deg;
	},
	SETHEADING: function(deg) { //SETH
		//turns turtle to the right specifed number of degrees
		this.heading = deg;
	},
	SETXY: function(x, y) {
		//sets position of cursor
	},
	TOWARDS: function(x, y) {
		//sets heading toward point
	}
};
