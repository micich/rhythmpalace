function Guard()
{
	this.tileFrom	= [mapW/2,mapH/2];
	this.tileTo		= [mapW/2,mapH/2];
	this.timeMoved	= 0;
	this.dimensions	= [tileW,tileH];
	this.position	= [mapW*tileW / 2, mapH*tileH / 2];
	this.delayMove	= playerSpeed;
	this.direction = directions.up;
	this.sprites = {};
	this.sprites[directions.up] = [{x:tw*1, y:th*13, w:tw, h:th}];
	this.sprites[directions.right] = [{x:tw*1, y:th*13, w:tw, h:th}];
	this.sprites[directions.left] = [{x:tw*2, y:th*13, w:tw, h:th}];
	this.sprites[directions.down] = [{x:tw*2, y:th*13, w:tw, h:th}];

}
Guard.prototype.placeAt = function(x, y)
{
	this.tileFrom	= [x,y];
	this.tileTo		= [x,y];
	this.position	= [((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
};

Guard.prototype.processMovement = function(t)
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

Guard.prototype.canMoveTo = function(x,y)
{
	if(x<0 || x>=mapW || y<0 || y>=mapH) { return false; }
    if(gameMap[toIndex(x,y)] != 1)
	// if(tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.path &&
	// 	tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.destructible &&
	// 	tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.ice &&
	// 	tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.conveyorD &&
	// 	tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.conveyorU &&
	// 	tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.conveyorL &&
	// 	tileTypes[gameMap[toIndex(x,y)]].floor!=floorTypes.conveyorR)
		{ return false; }
	// if(itemTypes[itemMap[toIndex(x,y)]].floor==floorTypes.solid) { return false; }
	return true;
}

Guard.prototype.canMoveUp = function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]-1)};
Guard.prototype.canMoveDown = function() { return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]+1)};
Guard.prototype.canMoveLeft = function() { return this.canMoveTo(this.tileFrom[0]-1, this.tileFrom[1])};
Guard.prototype.canMoveRight = function() { return this.canMoveTo(this.tileFrom[0]+1, this.tileFrom[1])};
Guard.prototype.canMoveDirection = function(d) 
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

Guard.prototype.moveLeft = function(t) 
{ 
	lastTileVisited = [this.tileTo[0],this.tileTo[1]];
    gameMap[toIndex(lastTileVisited[0],lastTileVisited[1])] = 1;
	this.tileTo[0] -= 1; 
	setTileTo(this.tileTo[0],this.tileTo[1],136);
	this.timeMoved = t; this.direction = directions.left; 
};
Guard.prototype.moveRight = function(t) 
{ 
	lastTileVisited = [this.tileTo[0],this.tileTo[1]];
    gameMap[toIndex(lastTileVisited[0],lastTileVisited[1])] = 1; 
	this.tileTo[0] += 1; 
	setTileTo(this.tileTo[0],this.tileTo[1],136);
	this.timeMoved = t; this.direction = directions.right; 
};
Guard.prototype.moveUp = function(t) { 
	lastTileVisited = [this.tileTo[0],this.tileTo[1]];
    gameMap[toIndex(lastTileVisited[0],lastTileVisited[1])] = 1;
	this.tileTo[1] -= 1; 
    setTileTo(this.tileTo[0],this.tileTo[1],136);
	this.timeMoved = t; this.direction = directions.up; 
};
Guard.prototype.moveDown = function(t) { 
	lastTileVisited = [this.tileTo[0],this.tileTo[1]]; 
    gameMap[toIndex(lastTileVisited[0],lastTileVisited[1])] = 1;
	this.tileTo[1] += 1; 
	setTileTo(this.tileTo[0],this.tileTo[1],136);
	this.timeMoved = t; this.direction = directions.down; 
};
Guard.prototype.moveDirection = function(d, t) 
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



function dropGuards(t) {
    {
        guards = [];
        if(t == 'lobby') 
        {
            let locations;
            if(!puzzle1Solved) { locations = [[6,14],[12,14]]; }
            else if(!puzzle2Solved) { locations = [[6,14],[12,14],[6,18],[12,18]]; }
            else if(!puzzle3Solved) { locations = [[6,14],[12,14],[6,18],[12,18], [8,13], [8,19]]; }
            else { locations = [[8,15],[8,16],[8,17],[9,15],[9,17],[10,15],[10,16],[10,17],[13,12]]; }
            if(length != undefined)
			{
				for(let i = 0; i < locations.length; i++)
				{
					//Character 
					let g = new Guard();
					g.position[0] = locations[i][0]; g.position[1] = locations[i][1];
					g.placeAt(g.position[0],g.position[1]);
					guards.push(g);
				}
			}
        }
		if(t == 'puzzle4') 
        {
            let locations = [[4,8],[6,8],[8,8],[10,8]];
            for(let i = 0; i < locations.length; i++)
            {
                //Character 
                let g = new Guard();
                g.position[0] = locations[i][0]; g.position[1] = locations[i][1];
                g.placeAt(g.position[0],g.position[1]);
                guards.push(g);
            }
        }
        if(t == 'gallery') 
        {
            let locations = [[6,1],[10,1],[6,5],[10,5],[2,16],[14,16],[8,12]];
            for(let i = 0; i < locations.length; i++)
            {
                //Character 
                let g = new Guard();
                g.position[0] = locations[i][0]; g.position[1] = locations[i][1];
                g.placeAt(g.position[0],g.position[1]);
                guards.push(g);
            }
        }
		if(t == 'towerstairs') 
        {
			let locations = [];
			for(let x = 0; x < mapW; x++)
			{
				for(let y = 0; y < mapH; y++)
				{
					if(gameMap[toIndex(x,y)] == 136) { locations.push([x,y]); }
				}
			}
			if(locations.length != undefined)
			{
				for(let i = 0; i < locations.length; i++)
				{
					//Character 
					let g = new Guard();
					g.position[0] = locations[i][0]; g.position[1] = locations[i][1];
					g.placeAt(g.position[0],g.position[1]);
					guards.push(g);
				}
			}
        }
		if(t == 'tower') 
        {
            let locations = [[3,7],[11,7], [7,3], [7,11]];
            for(let i = 0; i < locations.length; i++)
            {
                //Character 
                let g = new Guard();
                g.position[0] = locations[i][0]; g.position[1] = locations[i][1];
                g.placeAt(g.position[0],g.position[1]);
                guards.push(g);
            }
        }
		if(t == 'crypt') 
        {
            for(let x = 1; x <= 12; x++)
            {
				if(gameMap[toIndex(x,1)] == 146) { 
					//Character 
					let g = new Guard();
					g.position[0] = x; g.position[1] = 1;
					g.placeAt(g.position[0],g.position[1]);
					guards.push(g);
					gameMap[toIndex(x,1)] = 1;
					alphaMap[toIndex(x,1)] = startingAlpha;
				}

            }
        }
		if(t == 'throne') 
        {
			let locations = [];
			for(let x = 0; x < mapW; x++)
			{
				for(let y = 0; y < mapH; y++)
				{
					if(gameMap[toIndex(x,y)] == 136) { locations.push([x,y]); }
				}
			}
			if(locations.length != undefined)
			{
				for(let i = 0; i < locations.length; i++)
				{
					//Character 
					let g = new Guard();
					g.position[0] = locations[i][0]; g.position[1] = locations[i][1];
					g.placeAt(g.position[0],g.position[1]);
					guards.push(g);
				}
			}
        }
		if(t == 'intro') 
        {
			let locations = [];
			for(let x = 0; x < mapW; x++)
			{
				for(let y = 0; y < mapH; y++)
				{
					if(gameMap[toIndex(x,y)] == 136) { locations.push([x,y]); }
				}
			}
			if(locations.length != undefined)
			{
				for(let i = 0; i < locations.length; i++)
				{
					//Character 
					let g = new Guard();
					g.position[0] = locations[i][0]; g.position[1] = locations[i][1];
					g.placeAt(g.position[0],g.position[1]);
					guards.push(g);
				}
			}
        }
		if(t == 'slide')
		{
			let locations = [];
			for(let x = 0; x < mapW; x++)
			{
				for(let y = 0; y < mapH; y++)
				{
					if(gameMap[toIndex(x,y)] == 136) { locations.push([x,y]); }
				}
			}
			if(locations.length != undefined)
			{
				for(let i = 0; i < locations.length; i++)
				{
					//Character 
					let g = new Guard();
					g.position[0] = locations[i][0]; g.position[1] = locations[i][1];
					g.placeAt(g.position[0],g.position[1]);
					guards.push(g);
				}
			}
		}

    }


}

//enter 0 for viewport scanning OR a Y offset
function drawGuards(xdelta,ydelta) {
	if(guards.length != undefined)
	{
		if(xdelta == 0 && ydelta == 0) // viewport scanning true
		{
			for(let i = 0; i < guards.length; i++)
			{
				//draw character
				sprite = guards[i].sprites[guards[i].direction];
				ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
					viewport.offset[0] + guards[i].position[0], viewport.offset[1] + guards[i].position[1],
				guards[i].dimensions[0], guards[i].dimensions[1])
			}
		}
		else
		{
			for(let i = 0; i < guards.length; i++)
			{
				//draw character
				sprite = guards[i].sprites[guards[i].direction];
				ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
					guards[i].position[0] + xdelta, guards[i].position[1] + ydelta,
				guards[i].dimensions[0], guards[i].dimensions[1])
			}
		}

	}

}

function moveGuards(tick) {

			if(guards.length != undefined)
			{
				for(let i = 0; i < guards.length; i++)
				{
					if(!guards[i].processMovement(currentFrameTime) && keyTick)
					{
						let r = randomInt(3);
						if(r==0 && guards[i].canMoveUp()) { guards[i].moveUp(currentFrameTime); }
						if(r==1 && guards[i].canMoveDown()) { guards[i].moveDown(currentFrameTime); }
						if(r==2 && guards[i].canMoveLeft()) { guards[i].moveLeft(currentFrameTime); }
						if(r==3 && guards[i].canMoveRight()) { guards[i].moveRight(currentFrameTime); }
					}
					else
					{
						if(Math.abs(guards[i].position[0] - player.position[0]) < 10 && Math.abs(guards[i].position[1] - player.position[1]) < 10)
						{
							if(!hasMic)
							{
								playSnd(144); playSnd(135);
								if(isLobby) { drawLobby(); clearTextBar(); }
								else if(isPuzzleRoom4) { clearTextBar(); 
									keysUsed = 0;
									galleryTick = true;
									isGallery = true;
									isPuzzleRoom4 = false;
									stopBgSnd('bglobby'); stopBgSnd('key2'); stopBgSnd('key3'); stopBgSnd('puzzle4');
									playSnd(143); playSnd(137);
									playBgSnd(156,'gallery');
								}
								else if(isGallery) { drawGallery(); }
								else if(isTowerStairs) {
									towerFloorNumber = towerFloorNumber - 1; 
									drawTowerStairs(); 
								}
								else if(isTower) { dropOverlay(); dropFinalTowerPuzzle(); dropGuards('tower'); }
								else if(isCrypt) { 
									isLobby2 = true;
									lobby2Tick = true;
									isCrypt = false;
									comingFromCrypt = true;
								}
								else if(isSlide) {
									playSnd(143);
									stopBgSnd('slide1'); stopBgSnd('slide2'); 
									stopBgSnd('slide3'); stopBgSnd('slide4');
									secretSlideEntrance = false; starting_pos = [6,231]; drawSlide();
								}
								else if(isPuzzleRoom9) { drawPuzzleRoom9(); }
								else if(isThrone) { 
									
									drawThrone(); puzzle10Active = false;
									kingBuild = [1,4,8,12];
									for(let i = 0; i < alphaMap.length; i++) { alphaMap[i] = startingAlpha; }
								}
								setTimeout(() => {
									player.position[0] = starting_pos[0];
									player.position[1] = starting_pos[1];
									player.placeAt(player.position[0], player.position[1]);
								}, 125);
							}
							else
							{
								guardToStrike = i;
								guardTick = true;
							}
						}
					}
				}

			}

}


function clearGuard(tick)
{
	if(tick && guardToStrike != null && guardTick)
	{
		guardTick = false;
		guards.splice(guardToStrike,1);
		guardToStrike = null;
		playSnd(randomInt(5) + 13);
		alphaMap[toIndex(playerX(),playerY())] = startingAlpha;
		rhythmsObtained++;
	}
}