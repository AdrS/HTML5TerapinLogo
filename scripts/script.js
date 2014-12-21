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
	show_turtle: true,
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
		//TODO erase old turtle
		//http://stackoverflow.com/questions/17411991/html5-canvas-rotate-image
		if(this.show_turtle) {
			this.context.drawImage(this.logo, this.position.x - this.logo.width/2,
				this.height - this.position.y - this.logo.height/2);
		}
	},
	is_color: function(color) {
		var node = document.createElement('p');
		node.style.color = color;
		return node.style.color !== '';
	},
	BACK: function(distance) {//BK
		//moves turtle opposite direction
		this.FORWARD(-distance);
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
		var newX = this.position.x + distance*Math.cos(this.position.heading*Math.PI/180);
		var newY = this.position.y + distance*Math.sin(this.position.heading*Math.PI/180);
		if(newX < 0 || newX >= this.width || newY < 0 || this.newY >= this.height) {
			this.log_error('position is out of bounds');
			return;
		}
		if(this.pendown) {
			this.context.strokeStyle = this.color;
			this.context.beginPath();
			this.context.moveTo(this.position.x, this.height - this.position.y);
			this.context.lineTo(newX, this.height - newY);
			this.context.stroke();
		}
		this.position.x = newX;
		this.position.y = newY;
		this.draw_turtle();
	},
	HIDETURTLE: function() { //HT
		//make current turtle cursor disapear
		this.show_turtle = false;
	},
	HOME: function() {
		//moves cursor to home position
		this.position = Object.create(this.home);
	},
	LEFT: function(deg) { //LT
		//turns left specified number of degrees
		this.position.heading += deg;
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
		this.position.heading -= deg;
	},
	SETHEADING: function(deg) { //SETH
		//turns turtle to the right specifed number of degrees
		this.position.heading = deg;
	},
	SETPENCOLOR: function(color) { //SETPC
		//sets color of pen 0-BK, 1-W, 2-G, 3-V, 4-O, 5-B
		if(this.is_color(color)) {
			this.color = color;
		}
		else if(color === 0 || color === 'bk') {
			this.color = 'black';
		} else if(color === 1 || color === 'w') {
			this.color = 'white';
		} else if(color === 2 || color === 'g') {
			this.color = 'green';
		} else if(color === 3 || color === 'v') {
			this.color = 'violet';
		} else if(color === 4 || color === 'o') {
			this.color = 'orange';
		} else if(color === 'r') {
			this.color = 'red';
		} else if(color === 'y') {
			this.color = 'yellow';
		} else {
			this.log_error('\"' + color.toString() + '\" is not a valid color');
		}
	},
	SETXY: function(x, y) {
		//sets position of cursor
		if(x < 0 || x >= this.width || y < 0 || y >= this.height) {
			this.log_error('position is out of bounds');
			return;
		}
		this.position.x = x;
		this.position.y = y;
		this.draw_turtle();
	},
	SHOWTURTLE: function() { //ST
		this.show_turtle = true;
	},
	TOWARDS: function(x, y) {
		//sets heading toward point
	}
};
