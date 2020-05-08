
// Pieces
var Pieces = Array();

var rotVect = new vector(0,0);

function defaultRot(map,active){
	if(active){
		for(var c = 0; c < this.nCoord; c++){
			var C = this.coord[c];
			rotVect.setVect(C.x,C.y);
			rotVect.rotateRightAbout(this.center);
			if(map.isBlocked(rotVect.pos(map))){ return;}
			//if(rotVect.x < 0) return;
			//if(rotVect.x > map.x -1) return;
		}
	}
	for(var c = 0; c < this.nCoord; c++){
		this.coord[c].rotateRightAbout(this.center);
		//alert(this.coord[c].x+" "+map.x);
		if(active){
			while(this.coord[c].x < 0) this.right(map);
			while(this.coord[c].x > map.x - 1) this.left(map);
		}
	}
	this.rotStatus = (this.rotStatus + 1) % 4;
};

// 'L' Piece
var tempVect = new vector(0,0);
Pieces[0] = new tetrisPiece(tempVect,'Orange');
Pieces[0].addRelCoord(0,0);
Pieces[0].addRelCoord(0,-1);
Pieces[0].addRelCoord(0,1);
Pieces[0].addRelCoord(1,1);
Pieces[0].shiftStart(0,1);
Pieces[0].replaceRotate(defaultRot);


// 'C' Piece
tempVect = new vector(0,0);
Pieces[1] = new tetrisPiece(tempVect,'Yellow');
Pieces[1].addRelCoord(0,0);
Pieces[1].addRelCoord(0,1);
Pieces[1].addRelCoord(1,0);
Pieces[1].addRelCoord(1,1);
Pieces[1].shiftStart(0,1);


// 'S' Piece
tempVect = new vector(0,0);
Pieces[2] = new tetrisPiece(tempVect,'Green');
Pieces[2].addRelCoord(0,0);
Pieces[2].addRelCoord(1,0);
Pieces[2].addRelCoord(-1,1);
Pieces[2].addRelCoord(0,1);
Pieces[2].shiftStart(-1,1);
Pieces[2].replaceRotate(defaultRot);

// 'I' Piece
tempVect = new vector(0,0);
Pieces[3] = new tetrisPiece(tempVect,'LightBlue');
Pieces[3].addRelCoord(0,0);
Pieces[3].addRelCoord(0,-1);
Pieces[3].addRelCoord(0,1);
Pieces[3].addRelCoord(0,2);
Pieces[3].shiftStart(0,2);
Pieces[3].replaceRotate(defaultRot);

// 'Z' Piece
tempVect = new vector(0,0);
Pieces[4] = new tetrisPiece(tempVect,'Red');
Pieces[4].addRelCoord(0,0);
Pieces[4].addRelCoord(-1,0);
Pieces[4].addRelCoord(0,1);
Pieces[4].addRelCoord(1,1);
Pieces[4].shiftStart(-1,1);
Pieces[4].replaceRotate(defaultRot);

// 'F' Piece
tempVect = new vector(0,0);
Pieces[5] = new tetrisPiece(tempVect,'Blue');
Pieces[5].addRelCoord(0,0);
Pieces[5].addRelCoord(0,-1);
Pieces[5].addRelCoord(1,-1);
Pieces[5].addRelCoord(0,1);
Pieces[5].shiftStart(0,1);
Pieces[5].replaceRotate(defaultRot);


// 'T' Piece
tempVect = new vector(0,0);
Pieces[6] = new tetrisPiece(tempVect,'Purple');
Pieces[6].addRelCoord(0,0);
Pieces[6].addRelCoord(0,-1);
Pieces[6].addRelCoord(1,0);
Pieces[6].addRelCoord(-1,0);
Pieces[6].shiftStart(-1,0);
Pieces[6].replaceRotate(defaultRot);
