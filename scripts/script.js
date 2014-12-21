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
	current_line: 0,
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
			that.draw_turtle();
			that.context.fillStyle = that.color;
			that.run_button.onclick = function() {
				that.run_commands(that.command_text_area.value);
			}
			that.command_line.onchange = function() { //enter pressed
				that.run_commands(that.command_line.value);
				that.command_line.value = '';
			}
			that.command_line.onkeypress = function() {
				console.log("ky");
			}
		}
	},
	assert_num_args: function(chunk, num) {
		if(chunk.length !== num + 1) {
			this.log_error('line ' + this.current_line.toString() + ' '+chunk[0] + ' takes '
				+ num.toString() + ' parameters, not ' + (chunk.length - 1).toString());
			return false;
		}
		return true;
	},
	assert_int: function(num) {
		var num2 = parseInt(num);
		if(isNaN(num2) || !isFinite(num2)) {
			this.log_error('line ' + this.current_line.toString() + ' \"' + num.toString() + '\" is not a valid number');
			return false;
		}
		return true;
	},
	run_commands: function(unparsed) {
		console.log("running ...");
		var lines = unparsed.split('\n');
		var chunks = null;
		for(this.current_line = 0; this.current_line < lines.length; this.current_line++) {
			chunks = lines[this.current_line].trim();
			if(chunks === '') {
				continue;
			}
			chunks = chunks.split(/\s+/g); //what if there is a string literal???
			console.log(chunks);
			chunks[0] = chunks[0].toUpperCase();
			switch (chunks[0]) {
			case 'FORWARD':
			case 'FD':
				if(!this.assert_num_args(chunks, 1) || !this.assert_int(chunks[1])) return;
				this.FORWARD(parseInt(chunks[1]));
				break;
			case 'BACK':
			case 'BK':
				if(!this.assert_num_args(chunks, 1) || !this.assert_int(chunks[1])) return;
				this.BACK(parseInt(chunks[1]));
				break;
			case 'CLEAN':
				if(!this.assert_num_args(chunks, 0)) return;
				this.CLEAN();
				break;
			case 'CG':
			case 'CLEARGRAPHICS':
				if(!this.assert_num_args(chunks, 0)) return;
				this.CLEARGRAPHICS();
				break;
			case 'HIDETURTLE':
			case 'HT':
				if(!this.assert_num_args(chunks, 0)) return;
				this.HIDETURTLE();
				break;
			case 'HOME':
				if(!this.assert_num_args(chunks, 0)) return;
				this.HOME();
				break;
			case 'PENDOWN':
			case 'PD':
				if(!this.assert_num_args(chunks, 0)) return;
				this.PENDOWN();
				break;
			case 'PENUP':
			case 'PU':
				if(!this.assert_num_args(chunks, 0)) return;
				this.PENUP();
				break;
			case 'PENERASE':
			case 'PE':
				if(!this.assert_num_args(chunks, 0)) return;
				this.PENERASE();
				break;
			case 'SHOWTURTLE':
			case 'ST':
				if(!this.assert_num_args(chunks, 0)) return;
				this.SHOWTURTLE();
				break;
			case 'LEFT':
			case 'LT':
				if(!this.assert_num_args(chunks, 1) || !this.assert_int(chunks[1])) return;
				this.LEFT(parseInt(chunks[1]));
				break;
			case 'RIGHT':
			case 'RT':
				if(!this.assert_num_args(chunks, 1) || !this.assert_int(chunks[1])) return;
				this.RIGHT(parseInt(chunks[1]));
				break;
			case 'SETHEADING':
			case 'SETH':
				if(!this.assert_num_args(chunks, 1) || !this.assert_int(chunks[1])) return;
				this.SETHEADING(parseInt(chunks[1]));
				break;
			case 'SETPENCOLOR':
			case 'SETPC':
				if(!this.assert_num_args(chunks, 1)) return;
				this.SETPENCOLOR(chunks[1]);
				break;
			case 'SETXY':
				if(!this.assert_num_args(chunks, 2) || !this.assert_int(chunks[1]) || !this.assert_int(chunks[2])) return;
				this.SETXY(parseInt(chunks[1]), parseInt(chunks[2]));
				break;
			case 'TOWARDS':
				if(!this.assert_num_args(chunks, 2) || !this.assert_int(chunks[1]) || !this.assert_int(chunks[2])) return;
				this.TOWARDS(parseInt(chunks[1]), parseInt(chunks[2]));
				break;
			default:
				this.log_error('\"' + chunks[0].toString() + '\" is not a valid command');
				return;
			}
			this.draw_turtle();
		}
	},
	draw_turtle: function() {
		//TODO erase old turtle
		//http://stackoverflow.com/questions/17411991/html5-canvas-rotate-image
		if(this.show_turtle) {
			this.context.save();
			this.context.translate(this.position.x, this.height - this.position.y);
			this.context.rotate((90 - this.position.heading)*Math.PI/180);
			this.context.drawImage(this.logo, -this.logo.width/2, -this.logo.height/2);
			this.context.restore();
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
	},
	CLEARGRAPHICS: function() { //CG
		//clears current graphics, puts turtule home
		this.CLEAN()
		this.position = Object.create(this.home);
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
		this.color = this.background_color;
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
	},
	SHOWTURTLE: function() { //ST
		this.show_turtle = true;
	},
	TOWARDS: function(x, y) {
		//sets heading toward point
		var dx = x - this.position.x;
		var dy = y - this.position.y;
		if(dy === 0 && dx === 0) {
			console.log('already at point');
		} else {
			this.position.heading = Math.atan2(dy,dx)*180/Math.PI;
		}
	}
};
