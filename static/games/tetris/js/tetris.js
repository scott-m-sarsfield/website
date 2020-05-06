// Tetris - Javascript and JQuery
//
// Written by : Scott Sarsfield

//===============================================
//   Global Variables
//===============================================

function TetrisGame(){
	this.styles = {
		gridBorder:"#000"
	};

	// jQuery-controlled grids
	this.play = this.next = null;

	// pieces...
	this.currPiece = null;
	this.currVect = new vector(0,0); // where does 'vector' come from?
	this.nextPiece = null;

	// ghost piece
	this.gVect = new vector(0,0);
	this.ghost = new tetrisPiece(this.gVect,'inherit');

	// misc vectors (need better names...)
	this.adj = new vector(0,0);
	this.tV = new vector(0,0);

	// score / Level
	this.score = 0;
	this.level = 0;

	// pace
	this.paces = new Array(600,500,450,400,350,325,300,275,250,225,200);
	this.pace = this.paces[0];

	// timer
	this.timer = null;

	// keyboard function flag
	this.activeKeys = true;

}

TetrisGame.prototype.splash = function splash(){

	var elmDisplay = $("#gs_display");
	var elmControl = $("#gs_control");
	var elmLaunch = $("#gs_launch");

	elmDisplay.html($("<img />",{
		id:"instr",
		src:"img/splash.png",
		alt:"Google the instructions..."
	}).css({
		boxShadow:'none',
		width:'100%'
	}));

	elmControl.html($("<input />",{
		id:"start",
		type:"button",
		value:"PLAY"
	}).click(this.launchGame.bind(this)));

	elmLaunch.hide();

};

//===============================================
//   LAUNCH FUNCTION
//===============================================

TetrisGame.prototype.launchGame = function launchGame(){

	var elmLaunch = $("#gs_launch");

	this.setupEnvironments();

	elmLaunch.show();

	this.initializeKeyboard();

	this.initialize();


	elmLaunch[0].scrollIntoView();
	this.setPace(this.paces[0]);

	this.nextTurn();

	return;
};

TetrisGame.prototype.setPace = function setPace(milliseconds){
	this.pace = milliseconds;
	window.clearInterval(this.timer);
	this.timer = setInterval(function(){this.fallDown();}.bind(this), this.pace);
};
TetrisGame.prototype.pauseTimer = function pauseTimer(){
	window.clearInterval(this.timer);
};
TetrisGame.prototype.resumeTimer = function resumeTimer(){
	this.setPace(this.pace);
};

TetrisGame.prototype.setupEnvironments = function setupEnvironments(){

	// Test conditions
	this.play = new environment(15,25);
	this.next = new environment(5,6);
};

TetrisGame.prototype.initializeKeyboard = function initializeKeyboard(){
	activeKeys = true;

	this.obtainKeyboard(this.executeKey,this);
};

//===============================================
//  INITIALIZATION
//===============================================

TetrisGame.prototype.initialize = function initialize(){

	var gameScreen = $("#gamescreen");

	if(!gameScreen.hasClass('active')){
		gameScreen.addClass('active');

		var screen = $("<div />").css({
			position:'fixed',
			zIndex:15,
			left:0,
			right:0,
			top:0,
			bottom:0,
			background:'#000',
			opacity:0.6
		});
		screen.click(function(){
			gameScreen.removeClass('active');
			screen.remove();
			splash();
		});
		gameScreen.parent().append(screen);
	}

	this.init_table();
	this.init_buttons();
	this.initPause();


	// initialize score.
	this.level = 1;
	this.score = 0;

	return;
};

TetrisGame.prototype.makeTables = function makeTables(){
	var addText = "";
	addText += "<div id='main_grid'><table>";

	var y = this.play.y;
	var x=  this.play.x;

	for (i = 0; i < y; i++){
		addText += "<tr>";
		for(j = 0; j < x; j++){
			var pos = (i * x) + j;
			addText += "<td id='cell" + pos +"'></td>";
		}
		addText += "</tr>";
	}
	addText += "</table></div>";

	addText += "<div id='side_grid'>";

	addText += "<h3>Score</h3><div id='counter'></div><br />";
	addText += "<h3>Level</h3><div id='level'></div>";
	addText += "<br /><h3>Next Piece</h3>";


	addText += "<div id='preview'></div>";
	addText += "<br /></div>";

	return addText;
};

TetrisGame.prototype.init_table = function init_table(){

	var elmDisplay = $("#gs_display");

	// Clear the display.
	elmDisplay.empty();

	$('#gs_display').append(this.makeTables());

	var displayScreen = $("#gamescreen");

	var horz = displayScreen.css('width');
	var vert = displayScreen.css('height');

	var hSize = Math.floor(parseInt(horz) / this.play.x);
	var vSize = Math.floor(parseInt(vert) / this.play.y);

	// block size
	var bSize =	(hSize < vSize) ? hSize : vSize;

	var mainGrid = $("#main_grid");
	var cells = mainGrid.find("td");//$("#main_grid td");

	var sideGrid = $("#side_grid");
	var preview = sideGrid.find("#preview");

	cells.css('width',bSize+'px');
	cells.css('height',bSize+'px');

	horz = sideGrid.css('width');

	// side grid should be as tall as the main grid.
	sideGrid.css('height', mainGrid.css('height'));

	// the preview box should be a square.
	preview.css('height', preview.css('width'));

	return;
};

TetrisGame.prototype.init_buttons = function init_buttons(){
	/*

	var addText = "";

	addText += "<input type='button' id='rotateButton' />";
	addText += "<br />";
	addText += "<input type='button' id='leftButton' />";
	addText += "<input type='button' id='rightButton' />";
	addText += "<br />";
	addText += "<input type='button' id='downButton' />";
	addText += "<input type='button' id='dropButton' />";
	addText += "<br />";
	addText += "<input type='button' id='pauseButton' />";

	$('#side_grid').append(addText);

	$('#rotateButton').bind('click',function(){movement(0);});
	$('#leftButton').bind('click',function(){movement(1);});
	$('#rightButton').bind('click',function(){movement(2);});
	$('#downButton').bind('click',function(){movement(3);});
	$('#dropButton').bind('click',function(){movement(4);});
	$('#pauseButton').bind('click',function(){pauseGame();});


	touchAction('#rotateButton','touchstart','click',function(){movement(0);});
	touchAction('#leftButton','touchstart','click',function(){movement(1);});
	touchAction('#rightButton','touchstart','click',function(){movement(2);});
	touchAction('#downButton','touchstart','click',function(){movement(3);});
	touchAction('#dropButton','touchstart','click',function(){movement(4);});
	touchAction('#pauseButton','touchstart','click',function(){pauseGame();});

	SquareSize('#side_grid','#rotateButton',0.40);
	SquareSize('#side_grid','#leftButton',0.25);
	SquareSize('#side_grid','#rightButton',0.25);
	SquareSize('#side_grid','#downButton',0.25);
	SquareSize('#side_grid','#dropButton',0.25);
	SquareSize('#side_grid','#pauseButton',0.40);
	$('#side_grid #rotateButton').css('background-image',"url('img/tet_arrow_rot.png')");
	$('#side_grid #leftButton').css('background-image',"url('img/tet_arrow_left.png')");
	$('#side_grid #rightButton').css('background-image',"url('img/tet_arrow_right.png')");
	$('#side_grid #downButton').css('background-image',"url('img/tet_arrow_down.png')");
	$('#side_grid #dropButton').css('background-image',"url('img/tet_arrow_drop.png')");
	$('#side_grid #pauseButton').css('background-image',"url('img/tet_pause.png')");
	*/

	$('#counter').show();


	return;
};

function SquareSize(pID,cID,percent){
	var x = $(pID).css('width');
	var x2 = Math.floor(percent * parseInt(x));

	$(cID).css('height',x2+'px');
	$(cID).css('width',x2+'px');
}
//===============================================
//   MISC. HELP FUNCTIONS
//===============================================

// rand() - Returns a random number between 'start' and 'end' inclusive.
function rand(start,end){
	var val;
	val = (end+1) - start;
	return Math.floor((Math.random()*val)+start);
}

function max(i,j){
	if(i > j) return i;
	else	return j;
}

//===============================================
//   UPDATE / LOGIC FUNCTIONS
//===============================================

// To fix later.

TetrisGame.prototype.movement = function movement(sit){

	if(!this.currPiece){
		console.error("No current piece");
		return;
	}

	this.unfixPiece();

	var success;
	var currPiece = this.currPiece, play = this.play;

	if(sit === 0) success = currPiece.rotate(play,true);
	if(sit == 1) success = currPiece.left(play);
	if(sit == 2) success = currPiece.right(play);
	if(sit == 3) success = currPiece.down(play);
	if(sit == 4) success = this.dropPiece();

	this.ghostImage();
	this.fixPiece();

	return success;
	//	alert(currPiece);
};


TetrisGame.prototype.dropPiece = function dropPiece(){
	while(this.movement(3));
	this.nextTurn();
};

TetrisGame.prototype.fallDown = function fallDown(){
	if(!this.movement(3)) this.nextTurn();
};


TetrisGame.prototype.ghostImage = function ghostImage(){
	var spot;
	var c,
		ghost = this.ghost,
		gVect = this.gVect,
		currPiece = this.currPiece,
		play = this.play;

	for (c = 0; c < ghost.nCoord; c++){
		spot = (ghost.coord[c]).pos(play);
		$('#main_grid #cell'+spot).css('box-shadow','none');
	}

	gVect.setVect(currPiece.center.x,currPiece.center.y);
	ghost.changeCenter(gVect);
	ghost.nCoord = 0;

	for (c = 0; c < currPiece.nCoord; c++){
		//alert(c);
		if(ghost.coord[c] === undefined){
			ghost.addCoord(0,0);
		}
		else{
			ghost.nCoord++;
		}
		ghost.coord[c].setVect(currPiece.coord[c].x,currPiece.coord[c].y);
	}
	while(ghost.down(play));

	for (var d = 0; d < ghost.nCoord; d++){
		spot = (ghost.coord[d]).pos(play);
		$('#main_grid #cell'+spot).css('box-shadow','1pt 1pt 5pt white inset');
	}
};


TetrisGame.prototype.nextTurn = function nextTurn(){
	// check to see if the user has lost
	// note: cannot lose with score of 0.

	var play = this.play;

	if(this.checkLoss() && this.score !== 0){
		this.gameOver();
		return;
	}

	// de-ref piece and ghost.
	this.currPiece = null;
	this.ghost.nCoord = 0;

	if(this.score === 0){
		this.nextPiece = Pieces[rand(0,6)];
		this.score += 10;
	}
	else	{
		this.incScore(0);
		this.incLevel();
	}

	// set the current and next pieces.
	this.currPiece = this.nextPiece;
	this.nextPiece = Pieces[rand(0,6)];

	this.fixPrev(); // fix what?

	this.currPiece.startPos(this.play); // ?
	this.fixPiece(); // how?
	this.checkRows(this.play); // for what?

	// display score and level.
	$('#counter').html("<h3>"+this.score+"</h3>");
	$('#level').html("<h2>"+(this.level+1)+"</h2>");

	// start by lowering the piece.
	this.currPiece.down(play);
};

TetrisGame.prototype.incScore = function incScore(type,multiplier){

	if(type === 0)
	this.score += 5;

	if(type == 1)
	this.score+= 50 * multiplier;
};

TetrisGame.prototype.incLevel = function incLevel(){

	// get rank
	var rank = Math.floor(this.score / 200);

	// high limit is max enumerated pace.
	var hi_lim = this.paces.length - 1;

	var Pace;
	if(rank > hi_lim){
		Pace = this.paces[hi_lim] - 5 * ( rank - hi_lim );
		if(Pace === 0) Pace = 5;
	}
	else{
		Pace = this.paces[rank];
	}
	if(this.level != rank){
		this.level = rank;
		this.setPace(Pace);
	}

};

TetrisGame.prototype.checkLoss = function checkLoss(){
	if(!this.currPiece) return false;

	var n = this.currPiece.nCoord;
	var co = this.currPiece.coord;

	for(var c = 0; c < n; c++){
		if(co[c].y < 0) return true;
	}
	return false;
};

TetrisGame.prototype.checkRows = function checkRows(map){
	var m = 0;
	for(j = map.y; j >= 0; j--){
		//alert('check row '+j);
		var flag = true;
		for (i = 0; i < map.x; i++)
		if (!map.isBlocked(j*map.x+i)) flag = false;
		if (flag){
			for(k = j; k >= 0; k--)
			for(i = 0; i < map.x; i++){
				var pos = k*map.x + i;
				map.Blocked[pos] = map.Blocked[pos-map.x];
				this.transfer(pos-map.x,pos);
			}
			j++;
			this.incScore(1,++m);
		}
	}
};

//===============================================
//   KEYBOARD COMMANDS
//===============================================
TetrisGame.prototype.executeKey = function executeKey(e){
	key = (e.keyCode)? e.keyCode: e.which;
	key = e.which;

	e.preventDefault();

	// Pause (ESC)
	if(key == 27) this.pauseGame();

	// Arrow Keys
	if(key == 37) this.movement(1);
	if(key == 38) this.movement(0);
	if(key == 39) this.movement(2);
	if(key == 40) this.movement(3);
	if(key == 32) this.movement(4);

	// WASD
	if(key == 65) this.movement(1);
	if(key == 87) this.movement(0);
	if(key == 68) this.movement(2);
	if(key == 83) this.movement(3);

	return false;
};

TetrisGame.prototype.pauseKey = function pauseKey(event){
	key = event.which;
	event.preventDefault();
	if(key == 27) this.resumeGame();
	if(key == 13) this.resumeGame();
	if(key == 32) this.resumeGame();
};

//===============================================
//   DISPLAY FUNCTION
//===============================================

TetrisGame.prototype.transfer = function transfer(from,to){
	var color,border,bs;
	if (from >= 0){
		color = $('#main_grid #cell'+from).css('background-color');
		border = $('#main_grid #cell'+from).css('border-color');
		bs = $('#main_grid #cell'+from).css('box-shadow');
	}
	else{
		color = 'inherit';
		border = dummyGame.styles.gridBorder;
		bs = 'none';
	}

	var cell = $('#main_grid #cell'+to);
	cell.css('background-color',color);
	cell.css('border-color',border);
	cell.css('box-shadow',bs);
};


TetrisGame.prototype.unfixPiece = function unfixPiece(){
	var cp = this.currPiece;

	if(!cp){
		//console.trace();
		return;
	}

	for(var c = 0; c < cp.nCoord; c++){
		var spot = (cp.coord[c]).pos(this.play);
		if (spot < 0) continue;
		this.play.unblock(spot);
		var cell = $('#main_grid #cell'+spot);
		cell.css({
			backgroundColor:'inherit',
			borderColor:this.styles.gridBorder,
			boxShadow:'none'
		});
	}
};

TetrisGame.prototype.fixPiece = function fixPiece(){
	var currPiece = this.currPiece;

	for(var c = 0; c < currPiece.nCoord; c++){
		var spot = (currPiece.coord[c]).pos(this.play);
		if (spot < 0) continue;
		this.play.block(spot);
		var cell = $('#main_grid #cell'+spot);
		cell.css({
			backgroundColor:currPiece.color,
			borderColor:'black',
			boxShadow:"1pt 1pt 5pt white inset"
		});
	}
};

TetrisGame.prototype.fixPreviewBoxModel = function fixPreviewBoxModel(){
	var preview = $('#preview');
	var previewTable = preview.children('table');

	var pHeight = parseInt(preview.css('height'));
	var pWidth = parseInt(preview.css('width'));

	// divide preview window into 6 rows.
	var NUMBER_OF_ROWS_IN_PREVIEW = 6;
	var blockSize = pHeight / NUMBER_OF_ROWS_IN_PREVIEW;

	$('#preview td').css({
		width: blockSize + 'px',
		height: blockSize + 'px'
	});

	// height of table needs to be measured after...
	// (naive design)

	var ptHeight = parseInt(previewTable.css('height'));
	var ptWidth = parseInt(previewTable.css('width'));

	// ensure that table is centered within preview box.
	// --> this seems like something that should automatically
	// --- be fixed in CSS...
	var vMargin = pHeight - ptHeight;
	previewTable.css({
		marginTop: (vMargin / 2) + 'px',
		marginBottom: (vMargin / 2) + 'px'
	});//'margin-top',(t/2)+'px');

	var hMargin = pWidth - ptWidth;
	previewTable.css({
		marginLeft: (hMargin / 2) + 'px',
		marginRight: (hMargin / 2) + 'px'
	});
};

TetrisGame.prototype.fixPrev = function fixPrev(){

	var np = this.nextPiece;
	np.startPos(this.play);

	var elmPreview = $("#preview");

	// render the preview table in the element.
	elmPreview.html(np.preview.genTable());

	var adj = this.adj, tV = this.tV;

	adj.setVect(
		-np.start.x,
		np.preview.y - np.start.y - 1
	);

	var cent = np.center;

	var n = np.nCoord,
		co = np.coord;

	for (var c = 0; c < n; c++){
		tV.setVect(
			co[c].x,
			co[c].y
		);

		tV.setVect(
			tV.x-cent.x+adj.x,
			tV.y-cent.y+adj.y
		);
		var pos = tV.pos(np.preview);
		var cell = $('#preview #cell'+pos);
		cell.css({
			backgroundColor:np.color,
			border:"solid 2pt black",
			boxShadow:"1pt 1pt 5pt white inset"
		});
	}
	this.fixPreviewBoxModel();
};

// Function: 	Sorts and displays the values from the displayed array.
//
// Activated:	Via update() and initialize()

function display(){

	// Not used here.
	//
	return;
}

//===============================================
//   PAUSE / RESUME FUNCTIONS
//===============================================

TetrisGame.prototype.initPause = function initPause(){

	var elmGrid = $("#main_grid");
	var elmPause = $("<div />",{id:"pause"});
	var elmScreen = $("<div />",{id:"screen"});

	elmGrid.append([elmPause,elmScreen]);

	var elms = [
		$("<h2 />",{text:"Pause"}),
		$("<input />",{
			type:"button",
			value:"Resume"
		}).click(function(){
			this.resumeGame();
		}.bind(this))
	];

	elmPause.empty().append(elms).hide();
	elmScreen.hide();
};

TetrisGame.prototype.obtainKeyboard = function obtainKeyboard(fn,_this){
	console.log(_this);
	fn = fn.bind(_this);
	$(document).unbind('keydown').bind('keydown',(function(e){
		fn(e);
		return false;
	}));

	$(document).unbind('keyup').bind('keyup',function(e){
		e.preventDefault();
		return false;
	});
};

TetrisGame.prototype.releaseKeyboard = function releaseKeyboard(){
	$(document).unbind('keydown');
};


TetrisGame.prototype.pauseGame = function pauseGame(){
	this.pauseTimer();
	this.obtainKeyboard(this.pauseKey,this);

	$('#screen').show();
	$('#pause').show();

	var x = parseInt($('#main_grid').css('width'));

	x = Math.floor(x / 8);

	$('#pause').css('left',x+'px');
	$('#pause').css('right',x+'px');
};

TetrisGame.prototype.resumeGame = function resumeGame(){
	this.obtainKeyboard(this.executeKey,this);

	$('#screen').hide();
	$('#pause').hide();

	document.getElementById('gs_launch').scrollIntoView();

	this.resumeTimer();
};


//===============================================
//   GAME OVER FUNCTION
//===============================================

// Function:	Displays the User's Choice in the End Screen
//
// Activated: 	By update().

TetrisGame.prototype.gameOver = function gameOver(){
	this.pauseTimer();
	this.releaseKeyboard();

	var elmDisplay = $("#gs_display");

	var elmResults = $("<div />",{id:"gs_results"});
	elmDisplay.append(elmResults);

	var addText = "";
	addText += "<h2>You got <span id='num'>";
	addText += this.score + " ";
	addText += "</span></h2>";
	addText +="<br />";
	elmResults.html(addText);

	$('#user_score').val(this.score);

	var x = parseInt(elmDisplay.css('width'));

	x = Math.floor(x / 8);

	elmResults.css('left',x+'px');
	elmResults.css('right',x+'px');
};


var dummyGame = new TetrisGame();

// LEEEEEROOOOOYY  JEEEEEEEEEENNNNNKIIIIIINNNNSS
$(document).ready(function(){
	dummyGame.splash();
	$("#restart").click(function(){dummyGame.launchGame();});
});
