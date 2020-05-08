// Sherlock X - Rewritten Sherlock programs made for Javascript
// 		over PHP (so it would be much faster).
//
// Written by : Scott Sarsfield

//===============================================
//   Global Variables
//===============================================

// Game Settings
var dimx;	// Horizontal size
var dimy;	// Vertical size

// Snake Grid
var Blocked = new Array();
var Cell = new Array();

// Snake Queue
var snake = new Array();

// Other variables.
var dir = 1;   	// direction
var target = 0;	// location of target

var activeKeys = true;

// Score
var Level;

// Timer 
var timer;

// Score of highest leaderboard scorer. 
var minLevel,HighScoreForm;

var leaders = new Array();


//===============================================
//   SPLASH SCREEN FUNCTIONS
//===============================================

// Function: Creates the splash screen (display).
//
// Activated: By 'Back to Menu' button.
function splash(){

	// Not used for this game.

}


// Function: Changes the x-dimension.
function setDimX(x){
	dimx = x;
}

// And others...

//===============================================
//   LAUNCH FUNCTION
//===============================================

function launchGame(){

	//alert(HighScoreForm);
	
	$("body").append(
		$("<div />",{id:"gamescreen"}).append(
			$("<div />",{id:"gs_exit",text:"X"}).click(function(){$(this).parent().remove();}),
			$("<div />",{id:"gs_display"}),
			$("<div />",{id:"gs_control"}),
			$("<div />",{id:"counter"})
		)
	);
	startGame();
	return;
}
	
function startGame(){

	// Test conditions
	dimx = dimy = 50;

	$('#gs_launch').show();

	activeKeys = true;

	$(document).bind('keydown',(function(e){executeKey(e);}));

	initialize();

	timer = setInterval(function(){moveSnake();},50);	

	document.getElementById('gamescreen').scrollIntoView();	

	return;
}

//===============================================
//  INITIALIZATION
//===============================================

function initialize(){
	var pos;
	for(i = 0; i < dimy; i++)
		for(j = 0; j < dimx; j++){
			pos = i*dimx+j;	
			if((i == 0) || (j == 0) || (i == dimy - 1) || (j == dimx -1))
				Blocked[pos] = true;
			else
				Blocked[pos] = false;
		}

	init_table();
	init_buttons();

	snake = new Array();	

	var start = Math.floor(dimy/2)*dimx + Math.floor(dimx/2);
	//alert(start);
	block(start);
	snake.splice(0,0,start);
	dir = 1;

	Level = 0;
	nextLevel();

	return;
}

function init_table(){

	// Clear the display.	
	$('#gs_display').html("");
	
	var tbody = $("<tbody />");
	
	for (i = 0; i < dimy; i++){
		var tr = $("<tr />");
		for(j = 0; j < dimx; j++){
			var pos = i*dimx +j;
			Cell[pos] = $("<td />");
			tr.append(Cell[pos]);
		}
		tbody.append(tr);
	}
			
	$('#gs_display').append($("<table />").append(tbody));

	gs_resize();

	for(i = 0;i < dimy; i++)
		for(j = 0; j < dimx; j++){
			var pos = i*dimx+j;
			//alert(pos);
			if(Blocked[pos]) Cell[pos].addClass("wall");
		}

	return;
}

function gs_resize(){
	var horz = $('#gamescreen').width();
	var vert = $("#gamescreen").height() - 100;
	horz = (horz > vert) ? vert : horz;
	
	var bSize = Math.floor(parseInt(horz) / dimx);
	
	$('#gs_display td').css('width',bSize+'px');
	$('#gs_display td').css('height',bSize+'px');	
}

$(document).resize(gs_resize);

function init_buttons(){
	/*
	var addText = "";
	
	// Button for each direction.
	var x = Array(1,0,3,2);
	for(i = 0; i < 4; i++){
		addText += "<input type='button' class='dir_button' id='button"+x[i]+"' onclick='changeDirection("+x[i]+")' />";
		if(i==0)addText+="<br />";
	}

	$('#gs_control').html(addText);
	
	for(i = 0; i < 4; i++){
		$('#button'+i).css('background-image','url("arrow'+i+'.png")');
		touchAction('#button'+i,'touchstart','click',changeDirection,i);
		//$('#button'+i).css('background-image','url("favicon.png")');
//		$('#button'+i).attr('accesskey',keys[i+2]);
	}

	var x = $('#gs_control').css('width');
	var x2 = Math.floor(parseInt(x) / (8));
	
	$('#gs_control input').css('height',x2+'px');
	$('#gs_control input').css('width',x2+'px');

	$('#counter').show();
	$('#counter').html("<h3>1</h3");	
	*/

	return;
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

//===============================================
//   UPDATE / LOGIC FUNCTIONS
//===============================================	

function moveSnake(){
	// get next position
	var x = getNextPosition();

	// if it is blocked, game over.
	if(Blocked[x]) {gameOver();return;}

	// block the next position.
	snake.splice(0,0,x); block(x);

	// if the next position is the target, extend it
	if(x == target){nextLevel(x);}
	// otherwise unblock the cell
	else	unblock(snake.pop());
}

function getNextPosition(){
	var m;
	if (dir == 0) m = -1;
	if (dir == 1) m = -dimx;
	if (dir == 2) m = 1;
	if (dir == 3) m = dimx;

	return snake[0]+m;
}

function block(x){
	Blocked[x] = 1;
	setTimeout(function(){Cell[x].addClass("active");},1);
}

function unblock(x){
	Blocked[x] = 0;
	setTimeout(function(){Cell[x].removeClass("active");},1);
}

function nextLevel(x){

	// remove previous
	if(x)setTimeout(function(){Cell[x].removeClass('target');},1);

	// update the level
	Level++;
	$('#counter').html("<h3>"+Level+"</h3>");
	
	// establish new target
	var max = dimx*dimy - 1;
	while(Blocked[target] == 1) target = rand(0,max);
	setTimeout(function(){Cell[target].addClass("target");},1);
}

function changeDirection(x){
	if ((dir+x)%2 == 0) return;
	var t = dir;
	dir = x;
//	alert('dir change');
	if(Blocked[getNextPosition()]) dir = t;
}

//===============================================
//   KEYBOARD COMMANDS
//===============================================

function executeKey(event){
	key = event.which;

	if(!activeKeys) return;
	else event.preventDefault();

	if(key == 13 || key == 82) //'Space' and 'r' respectively
		launchGame();

	// Arrow Keys
	if(key == 37) changeDirection(0);
	if(key == 38) changeDirection(1);
	if(key == 39) changeDirection(2);
	if(key == 40) changeDirection(3);

	// WASD
	if(key == 65) changeDirection(0);
	if(key == 87) changeDirection(1);
	if(key == 68) changeDirection(2);
	if(key == 83) changeDirection(3);
	

	return;
}

//===============================================
//   DISPLAY FUNCTION
//===============================================

// Function: 	Sorts and displays the values from the displayed array.
//
// Activated:	Via update() and initialize()

function display(){
	
	// Not used here.
	//
	return;
}

//===============================================
//   GAME OVER FUNCTION
//===============================================

// Function:	Displays the User's Choice in the End Screen
//
// Activated: 	By update().

function gameOver(){
	//alert("You win!!!!\nIt took you "+nTurns+" turns.");
	clearInterval(timer);

	$(document).unbind('keydown');
	
	var gs_results = $("<div />",{id:"gs_results"});
	
	gs_results.append(
		$("<h2 />",{text:"You got to level "}).append(
			$("<br />"),
			$("<span />",{id:"num",text:Level})
		),
		$("<br />"),
		$("<input />",{type:"button",value:"Play Again"}).click(function(){
			$(this).parent().remove();
			startGame();
		})
	);
	
	$("#gs_display").append(gs_results);
	
	if(Level > minLevel){
		gs_results.append(HighScoreForm);
		activeKeys = false;
	}

	$('#user_score').val(Level);
	
	var x = $("#gs_display").width() - $("#gs_display table").width();
	
	x *= 0.6;
	
	$('#gs_results').css('left',x+'px');
	$('#gs_results').css('right',x+'px');
}

// LEEEEEROOOOOYY  JEEEEEEEEEENNNNNKIIIIIINNNNSS
$(document).ready(function(){
	splash();
});

//===============================================
//   TESTING FUNCTIONS
//===============================================
/*

function alertSection(start,end){
	var printOut = "Game Type: "
	printOut += nPoss + "\nTotal Possible: ";
	printOut += totalPossible + "\nStart Index: ";
	printOut += p + "\nEnd Index: ";
	printOut += np +"\nPossible (" + (end-start) +"):\n";

	for(i = start; i < end; i++)
		printOut += possible[i] + " ";

	alert(printOut);
}

function printBarriers(barr){
	var printOut = "";
	printOut += "||0|| ";
	for(i = 0; i<p;i++)
		printOut += possible[i] + " ";
	printOut += "\n||p(" + p + ")|| ";
	for(i = p; i<sel;i++)
		printOut += possible[i] + " ";
	printOut += "\n||sel(" + sel + ")|| ";
	for(i = sel; i<np;i++)
		printOut += possible[i] + " ";
	printOut += "\n||np(" + np + ")|| ";
	for(i = np; i<barr;i++)
		printOut += possible[i] + " ";
	printOut += "\n||barr(" + barr + ")|| ";
	for(i = barr; i<nPoss;i++)
		printOut += possible[i] + " ";
	printOut += "\n||" + nPoss + "||";

	printOut += "<br /><br />";
	for(i = 0; i < displayLimit;i++)
		printOut += displayed[i] + " ";

	//alert(printOut);
	$('#game_helper').html(printOut);
}
*/

