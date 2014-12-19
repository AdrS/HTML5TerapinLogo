var MYAPP = {
	canvas: null,
	context: null,
	command_text_area: null,
	run_button: null,
	command_line: null,
	init: function() {
		MYAPP.canvas = document.getElementById('canvas');
		MYAPP.command_line = document.getElementById('command');
		MYAPP.command_text_area = document.getElementById('commands');
		MYAPP.run_button = document.getElementById('run');
		if(!MYAPP.canvas || !MYAPP.command_line || !MYAPP.command_text_area || !MYAPP.run_button) {
			console.error('could not get element');
			return;
		}
		MYAPP.context = canvas.getContext('2d');
		if(!MYAPP.context) {
			console.error('could not canvas context');
			return;
		}
		MYAPP.canvas.width = document.body.clientWidth;
		MYAPP.canvas.height = 300;
		MYAPP.run_button.onclick = function() {
			console.log('ready');
		}
		MYAPP.command_line.onchange = function() { //enter pressed
			console.log('change');
		}
		MYAPP.command_line.onkeypress = function() {
			console.log("ky");
		}
	}
};
