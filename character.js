function Character()
{
	this.tileFrom	= [mapW/2,mapH/2];
	this.tileTo		= [mapW/2,mapH/2];
	this.timeMoved	= 0;
	this.dimensions	= [tileW,tileH];
	this.position	= [mapW*tileW / 2, mapH*tileH / 2];
	this.delayMove	= playerSpeed;
	this.direction = directions.up;
	this.sprites = {};
	this.sprites[directions.up] = [{x:tw*1, y:th*8, w:tw, h:th}];
	this.sprites[directions.right] = [{x:tw*1, y:th*8, w:tw, h:th}];
	this.sprites[directions.left] = [{x:tw*0, y:th*8, w:tw, h:th}];
	this.sprites[directions.down] = [{x:tw*0, y:th*8, w:tw, h:th}];

}
Character.prototype.placeAt = function(x, y)
{
	this.tileFrom	= [x,y];
	this.tileTo		= [x,y];
	this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
};

Character.prototype.processMovement = function(t)
{
	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }

	if((t-this.timeMoved)>=this.delayMove)
	{
		this.placeAt(this.tileTo[0], this.tileTo[1]);

		var tileFloor = tileTypes[gameMap[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;
		if(tileFloor==floorTypes.ice)
		{
			if(this.canMoveDirection(this.direction))
			{
				this.moveDirection(this.direction, t);
			}
		}
		else if(tileFloor==floorTypes.conveyorL && this.canMoveLeft()) { this.moveLeft(t); }
		else if(tileFloor==floorTypes.conveyorR && this.canMoveRight()) { this.moveRight(t); }
		else if(tileFloor==floorTypes.conveyorU && this.canMoveUp()) { this.moveUp(t); }
		else if(tileFloor==floorTypes.conveyorD && this.canMoveDown()) { this.moveDown(t); }
	}

	// This makes it move more smoothly, I think
	else
	{
		this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
		this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);

		if(this.tileTo[0] != this.tileFrom[0])
		{
			var diff = (tileW / this.delayMove) * (t-this.timeMoved);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
		}
		if(this.tileTo[1] != this.tileFrom[1])
		{
			var diff = (tileH / this.delayMove) * (t-this.timeMoved);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}

		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);
	}
	//to here

	return true;
}

Character.prototype.canMoveTo = function(x,y)
{
	if(x<0 || x>=mapW || y<0 || y>=mapH) { return false; }
	if(openingTitleTick || gameEnd || freezeMovement) { return false; }
	if(tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.path &&
		tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.destructible &&
		tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.ice &&
		tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.conveyorD &&
		tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.conveyorU &&
		tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.conveyorL &&
		tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.conveyorR)
		{ return false; }
	// if(itemTypes[itemMap[toIndex(x,y)]].floor==floorTypes.solid) { return false; }
	return true;
}

Character.prototype.canMoveUp = function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]-1)};
Character.prototype.canMoveDown = function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]+1)};
Character.prototype.canMoveLeft = function() { return this.canMoveTo(this.tileFrom[0]-1, this.tileFrom[1])};
Character.prototype.canMoveRight = function() { return this.canMoveTo(this.tileFrom[0]+1, this.tileFrom[1])};
Character.prototype.canMoveDirection = function(d) 
		{ 
			switch(d)
			{
				case directions.up: 
					return this.canMoveUp();
				case directions.down: 
					return this.canMoveDown();
				case directions.left: 
					return this.canMoveLeft();
				default:
					return this.canMoveRight();
			}
		};

Character.prototype.moveLeft = function(t) 
{ 
	lastTileVisited = [this.tileTo[0],this.tileTo[1]];
	this.tileTo[0] -= 1; 
	if(tileTypes[gameMap[toIndex(this.tileTo[0],this.tileTo[1])]].floor == floorTypes.destructible)
	{
		setTileTo(this.tileTo[0],this.tileTo[1],1); playSnd(65);
	}
	this.timeMoved = t; this.direction = directions.left; 
};
Character.prototype.moveRight = function(t) 
{ 
	lastTileVisited = [this.tileTo[0],this.tileTo[1]]; 
	this.tileTo[0] += 1; 
	if(tileTypes[gameMap[toIndex(this.tileTo[0],this.tileTo[1])]].floor == floorTypes.destructible)
	{
		setTileTo(this.tileTo[0],this.tileTo[1],1); playSnd(65);
	}
	this.timeMoved = t; this.direction = directions.right; 
};
Character.prototype.moveUp = function(t) { 
	lastTileVisited = [this.tileTo[0],this.tileTo[1]]; 
	this.tileTo[1] -= 1; 
	if(tileTypes[gameMap[toIndex(this.tileTo[0],this.tileTo[1])]].floor == floorTypes.destructible)
	{
		setTileTo(this.tileTo[0],this.tileTo[1],1); playSnd(65);
	}
	this.timeMoved = t; this.direction = directions.up; 
};
Character.prototype.moveDown = function(t) { 
	lastTileVisited = [this.tileTo[0],this.tileTo[1]]; 
	this.tileTo[1] += 1; 
	if(tileTypes[gameMap[toIndex(this.tileTo[0],this.tileTo[1])]].floor == floorTypes.destructible)
	{
		setTileTo(this.tileTo[0],this.tileTo[1],1); playSnd(65);
	}
	this.timeMoved = t; this.direction = directions.down; 
};
Character.prototype.moveDirection = function(d, t) 
		{ 
			switch(d)
			{
				case directions.up: 
					return this.moveUp(t);
				case directions.down: 
					return this.moveDown(t);
				case directions.left: 
					return this.moveLeft(t);
				default:
					return this.moveRight(t);
			}
		};


