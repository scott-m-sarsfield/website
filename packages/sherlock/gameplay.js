// Sherlock X - Rewritten Sherlock programs made for Javascript
// 		over PHP (so it would be much faster).
//
// Written by : Scott Sarsfield

//===============================================
//   Global Variables
//===============================================

var possible = Array(); 	// Possible Numbers
var displayed = Array(); 	// Numbers displayed
var mode; 			// 1 - Numbers; 2 - Cards.
var nPoss; 			// # of all numbers/cards
var displayLimit; 		// # of numbers/cards shown at a time.

var sel; 	// index of first selected number
var p;   	// index of first 'possible' number
var np;  	// index of first 'not possible' number

var totalPossible; // total # of possible numbers


//===============================================
//   SPLASH FUNCTION
//===============================================

function splash(){
	
	// Not used for this game.

}

//===============================================
//   LAUNCH FUNCTION
//===============================================

function launchGame(M){

	mode = M;			// set the mode
	initialize();			// initialize
	$('#gs_display').show();	// show display
	$('#gs_control').show();	// ..and control
	
	choose();			// choose initial selection
	display();			// display selection
	
	return;
}

//===============================================
//  INITIALIZATION
//===============================================

function initialize(){

	// Clears the arrays.
	possible.length = 0;
	displayed.length = 0;

	// Sets the corresponding limits. 
	// (nPoss for codomain,displayLimit for shown)
	if (mode == 1){
		 nPoss = 100;
		 displayLimit = 25;
	}
	else if (mode == 2){
		 nPoss = 52;
		 displayLimit = 16;
	}

	for (i = 1; i<=nPoss;i++)
		possible[i-1] = i;

	// Sets the barriers.
	totalPossible = nPoss;
	p = 0;
	np = nPoss; // i.e. outside of the range

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

// Function: 	Based on whether the user clicks 'YES' or 'NO',
// 	     	this function adjusts the array divisions
// 	     	accordingly and updates the displayed selection.
//
// Activated: 	Via YES / NO buttons in the Control Panel.

function update(valShown){

	// If 'true', the first selected value is the
	// first possible value and the totalPossible
	// adjusts accordingly.
	if (valShown){
		p = sel;	
		totalPossible = np - sel;
	}
	// If 'false', the first selected value (of the
	// potentential values) becomes the edge of 
	// non-possible values.
	else{
		np = sel;
		totalPossible = sel - p;
	}
	
	// If there is only one possible value, game over.
	if(totalPossible == 1)
		endGame(possible[p]);

	// Otherwise, choose and display a new selection.
	else{
		choose();
		display();
		//alertSection(p,np);
	}

	return;
}

// Function: 	Selects values to be displayed on the Display
// 	     	Panel, in the process creating divisions among
// 	     	values in the array.
//
// Activated:	Via update() or initialize()

function choose(){

	// Determine how many of the possible values should 
	// be displayed at one time. (Binary Search is ideal,
	// but it must be within Display Limit)
	var nSel = Math.floor(totalPossible/2)
	if (nSel > displayLimit) nSel = displayLimit;

	// 'Selected' (sel) section starts at 'nSel' positions
	// away from the 'Not Possible' (np) section.
	sel = np - nSel;

	// Count (ct) tracks the number selected.
	var ct = 0;
	display.length = displayLimit;

	// Randomly select a value within the 'Possible' (p)
	// region [between p and np] until the 'Selected' region
	// is occupied.
	for(i = np-1; i >= sel; i--){

		// Randomly select one of the possible values.
		var pos = rand(p,i);

		// Swap that value with the front of the 'Selected' region.
		var tmp = possible[pos];
		possible[pos] = possible[i];
		possible[i] = tmp;

		// Add the value to those that will be displayed.
		displayed[ct++] = tmp;
	}

	var barr;  // barrier for the 'Not-Possible', but selected region.

	// The 'Barriered' region represents the not possible values
	// that were not selected to be displayed.

	// For the remainder of the values to be displayed, select a 
	// value from the 'Not Possible' (np) region [between np and p] until
	// the display quota has been met.
	for(barr = np ; ct < displayLimit; barr++){

		// Randomly select a value from 'not possible' values.
		var pos = rand(barr,nPoss+p-1) % nPoss;
		
		// Swap that value with the beginning.
		var tmp = possible[pos];
		possible[pos] = possible[barr%nPoss];
		possible[barr%nPoss] = tmp;

		// Add the value to those that will be displayed.
		displayed[ct++] = tmp;
	}
	//printBarriers(barr);
	return;
}

//===============================================
//   DISPLAY FUNCTION
//===============================================

// Function: 	Sorts and displays the values from the displayed array.
//
// Activated:	Via update() and initialize()

function display(){

	// Sort the 'displayed' array.
	displayed.sort(function(a,b) {return a-b});

	// Start with empty string.
	var addText = "";

	//== Numbers (1-100) ==

	if(mode == 1){
		// Table
		addText +="<table>";
		
		// Rows
		for(j = 0;j < 5;j++){
			addText +="<tr>";
		
			// Cells
			for(k=0;k<5;k++){
				var val = 5*j + k;
				addText += "<td>"+displayed[val]+"</td>";
			}
			addText+="</tr>";
		}
		addText+="</table>";
	}

	//== Cards ==

	if (mode == 2){
		// Table
		addText += "<table>";
		
		// Rows
		for(j = 0;j < 4;j++){
			addText += "<tr>";
			
			// Cells
			for(k=0;k<4;k++){
				var val = 4*j + k;
				addText +="<td><img src='./sherlock2/cards/"+displayed[val]+".png' /></td>";
			}
			addText += "</tr>";
		}
		addText +="</table>";
	}

	// Update the display.

	$('#gs_display').html(addText);

	$('#gs_display td').css("padding","20px");
	$('#gs_display td').css("height","20px");

	return;
}

//===============================================
//   GAME OVER FUNCTION
//===============================================

// Function:	Displays the User's Choice in the End Screen
//
// Activated: 	By update().

function endGame(res){

	// Numbers
	if (mode == 1)
		$('#gs_display').html("<h2>You Have</h2><h1>"+res+"</h1>");

	// Cards
	if (mode == 2){
		$('#gs_display').html("<h1>You Have</h1>");
		$('#gs_display').append("<br /><img src='./sherlock2/cards/"+res+".png' />");
	}

	// Hide Controls	
	$('#gs_control').hide();
	return;
}

// LEEEEEROOOOOYY  JEEEEEEEEEENNNNNKIIIIIINNNNSS
$(document).ready(function(){splash();});

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

