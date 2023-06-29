function drawLobby2()
{
	title = 'Lobby';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	guards = [];
	// gameEnd = true;

    const lobby2MapW = 19;
	const lobby2MapH = 20;
	let d1 =[]; t1 =[];
	if(!comingFromCrypt)
	{
		let r = randomInt(2);
		if(r==0) { d1 = [139,0,0]; t1 = [137,1,1]; }
		else if(r==1) { d1 = [0,139,0]; t1 = [1,137,1];}
		else if(r==2) { d1 = [0,0,139]; t1 = [1,1,137]; }
	}
	else
	{
		d1 = [0,0,0]; t1 = [1,1,1];
	}

	var lobby2GameMap = [
						  0, 0, 0, 0, 0, 0, 0, 0, 0, 52,0, 0, 0, 0, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 0, 0, 0, 0, 52,0, 0, 0, 0, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 0, 0, 0, 0, 52,0, 0, 0, 0, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 0, 0, 0, 0, 52,0, 0, 0, 0, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 48,48,48,48,48,48,48,48,48, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 52,0, 0, 0, 0, 0, 0, 0,52, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
						  0, 0, 0, 48,1, 1, 1, 53,1, 66, 1, 53,1, 1, 1, 48,0, 0, 0, 
						  0, 0, 0, 0, 1, 53,1, 1, 1, 1, 1, 1, 1, 53,1, 0, 0, 0, 0, 
						  0, 0, 0, 0, 1, 1, 1, 1, 1,1,1, 1, 1, 1, 1, 0, 0, 0, 0, 
						  0, 0, 0, 0, 1, 53,1, 1, 1,1,1,1, 1, 53,t1[0], d1[0], 0, 0, 0, 
						  0, 0, 0, 0, 1, 1, 1, 1, 1,1,1, 1, 1, 1, 1, 0, 0, 0, 0, 
						  0, 0, 0, 0, 1, 53,1, 1, 1, 1, 1, 1, 1, 53,1, 0, 0, 0, 0, 
						  0, 0, 0, 50,1, 1, 1, 53,1, 1, 1, 53,1, 1, 1, 48,0, 0, 0,
						  0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 0, 0, d1[1], t1[1], 1, t1[2], d1[2], 0, 0, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	mapW = lobby2MapW;
	mapH = lobby2MapH;
	gameMap = lobby2GameMap;

	resetAlphaMap();

	
	if(comingFromCrypt) { gameMap[toIndex(9,7)] = 1; }
	starting_pos = [9,7];
	viewport.endTile = [17, 14]
	viewport.offset = [-125, -75]
	viewport.startTile = [1, 0]


	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);


	lobby2Tick = false;
}



function drawLobby2Tiles(currentFrameTime, currentSecond)
{
	for(var y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y)
	{
		for(var x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x)
		{
			//draw gameMap
			var tile = tileTypes[gameMap[toIndex(x,y)]];
			ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				viewport.offset[0] + (x*tileW), viewport.offset[1] + (y*tileH), tileW, tileH);

			if(x == playerX() && y == playerY()) { alphaMap[toIndex(x,y)] = 0; }
			else { alphaMap[toIndex(x,y)] = 1-(4-getDistance(playerX(),playerY(),x,y)); }
			// if(alphaMap[toIndex(x,y)] > 0.0) { alphaMap[toIndex(x,y)] -= alphaReduction;
			ctx.fillStyle = `rgba(0,0,0,${alphaMap[toIndex(x,y)]})`;
			ctx.fillRect(viewport.offset[0] + (x*tileW), viewport.offset[1] + (y*tileH), tileW, tileH);
			// else { alphaMap[toIndex(x,y)] = 0.0; }
			
	
		}
	}


	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1],
		player.dimensions[0], player.dimensions[1])

	
}

function processLobby2Tiles(tick)
{
	if(tick)
	{
		if(thisTileIs() != 66 && gameMap[toIndex(9,7)] == 66) { setTileTo(9,7,1); playSnd(40); }
		if(thisTileIs() == 50)
		{
			if(playerX()== 3 && playerY()==13 )
			{
				isPuzzleRoom9 = true;
				isLobby2 = false;
				puzzleRoom9Tick = true;
			}
			else
			{
				isLobby2 = false;
				isCrypt = true;
				cryptTick = true;
			}
			
		}
	}
}