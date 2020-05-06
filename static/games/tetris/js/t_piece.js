// Tetris Piece File

// Help function
function max(i, j){
	if(i > j){ return i;}
	else {return j;}
}

var nEnv = 0;

function environment(dimx,dimy){

	this.x = dimx;
	this.y = dimy;

	nEnv++;

	this.setEnv = setEnv;
	function setEnv(x,y){
		this.x = x;
		this.y = y;
	}

	this.Blocked = [];
	for(var i = 0; i < this.x*this.y; i++)
		{this.Blocked[i] = false;}

	this.block = block;
	function block(pos){
		this.Blocked[pos] = true;
	}

	this.unblock = unblock;
	function unblock(pos){
		this.Blocked[pos] = false;
	}

	this.isBlocked = isBlocked;
	function isBlocked(pos){
		return this.Blocked[pos];
	}

	this.toString = toString;
	function toString(){
		var addText = "Environment:\n";
		addText += "\tWidth: "+this.x+"\n";
		addText += "\tHeight: "+this.y+"\n";
		return addText;
	}

	this.genTable = genTable;
	function genTable(){
		var addText = "<table>";
		for(var i = 0; i < this.y; i++){
			addText += "<tr>";
			for(var j = 0; j < this.x; j++){
				addText+="<td id='cell"+(i*this.x+j)+"'></td>";
			}
			addText += "</tr>";
		}
		addText += "</table>";
		return addText;
	}
}

var nVect = 0;

function vector(x,y){
	this.x = x;
	this.y = y;

	nVect++;

	this.setVect = setVect;
	function setVect(nx,ny){
		this.x = nx;
		this.y = ny;
	}

	this.pos = pos;
	function pos(map){
		return this.y*map.x + this.x;
	}

	this.left = left;
	function left(){
		this.x--;
	}

	this.right = right;
	function right(){
		this.x++;
	}

	this.up = up;
	function up(){
		this.y--;
	}

	this.down = down;
	function down(){
		this.y++;
	}

	this.rotateLeftAbout = rotateLeftAbout;
	function rotateLeftAbout(origin){
		var dX = this.y - origin.y;
		var dY = this.x - origin.x;

		this.x = origin.x + dX;
		this.y = origin.y - dY;
	}

	this.rotateRightAbout = rotateRightAbout;
	function rotateRightAbout(origin){
		var dX = this.y - origin.y;
		var dY = this.x - origin.x;

		this.x = origin.x - dX;
		this.y = origin.y + dY;
	}

	this.toString = toString;
	function toString(){
		var addText = "Vector (";
		addText += this.x + ",";
		addText += this.y + ")";
		return addText;
	}
}

var nPiece = 0;

function tetrisPiece(center,color){

	nPiece++;

	this.center = center;
	this.color = color;

	this.rotStatus = 0;
	this.nCoord = 0;
	this.coord = Array();

	this.replaceRotate = replaceRotate;
	function replaceRotate(rotFunct){
		this.rotate = rotFunct;
	}

	// Start position - bottom left section of piece should start at
	// 		    top center.
	this.start = new vector(0,0);

	this.shiftStart = shiftStart;
	function shiftStart(xs,ys){
		this.start.setVect(xs,ys);
	}

	this.nV = new vector(0,0);

	this.startPos = startPos;
	function startPos(map){
		// Fix rotation first
		while(this.rotStatus !== 0){ this.rotate(map,false);}
		this.nV.setVect(Math.floor(map.x/2),0);
		this.nV.x -= this.start.x;
		this.nV.y -= this.start.y + 1;
		this.changeCenter(this.nV);
	}

	// Change Center
	//
	this.changeCenter = changeCenter;
	function changeCenter(newCenter){
		for(var c = 0; c < this.nCoord; c++){
			this.coord[c].x += newCenter.x - this.center.x;
			this.coord[c].y += newCenter.y - this.center.y;
		}
		this.center.setVect(newCenter.x,newCenter.y);
	}

	this.addRelCoord = addRelCoord;
	function addRelCoord(x,y){
	//	alert('in addrelcoord');
		if(this.coord[this.nCoord] === undefined){
			this.coord[this.nCoord] = new vector(0,0);}
		this.coord[this.nCoord].setVect(this.center.x+x,this.center.y+y);
		this.nCoord++;
		this.updatePreview();
	}

	this.addCoord = addCoord;
	function addCoord(x,y){
		if(this.coord[this.nCoord] === undefined)
			this.coord[this.nCoord] = new vector(0,0);
		this.coord[this.nCoord].setVect(x,y);
		this.nCoord++;
		//alert(this);
		this.updatePreview();
	}


	this.left = left;
	function left(map){
		for (var c = 0; c < this.nCoord; c++){
			if(this.coord[c].x === 0){ return false;}
			if(map.isBlocked(this.coord[c].pos(map)- 1)) return false;
		}
		for (c = 0; c < this.nCoord; c++){
			this.coord[c].left();
		}
		this.center.left();

		return true;
	}

	this.right = right;
	function right(map){
		var c;
		for (c = 0; c < this.nCoord; c++){
			if(this.coord[c].x == map.x - 1) return false;
			if(map.isBlocked(this.coord[c].pos(map)+ 1)) return false;
		}
		for (c = 0; c < this.nCoord; c++) {this.coord[c].right();}
		this.center.right();

		return true;
	}

	this.down = down;
	function down(map){
		var c;
		for (c = 0; c < this.nCoord; c++){
			if(this.coord[c].y == map.y - 1) return false;
			if(map.isBlocked(this.coord[c].pos(map)+map.x)) return false;
		}
		for (c = 0; c < this.nCoord; c++)
			this.coord[c].down();
		this.center.down();

		return true;
	}

	// Rotate Right
	this.rotate = rotate;
	function rotate(map){

		// Do nothing
	}

	this.preview = new environment(0,0);

	this.updatePreview = updatePreview;
	function updatePreview(){
		var mx = 0,my = 0,Mx = 0,My = 0;
		for (var c = 0; c < this.nCoord; c++){
			var spec = this.coord[c];
			mx = max(this.center.x - spec.x,mx);
			Mx = max(spec.x-this.center.x,Mx);
			my = max(this.center.y - spec.y,my);
			My = max(spec.y-this.center.y,My);
		}

		this.preview.setEnv(mx+Mx+1,my+My+1);
	}



	this.toString = toString;
	function toString(){
		var addText = "Tetris Piece (";
		addText += this.color;
		addText += ")\n\t";
		addText += this.center;
		addText += "\n";
		for (var c = 0; c < this.nCoord; c++){
			addText += "\t" + this.coord[c] + "\n";
		}
		return addText;
	}
}
