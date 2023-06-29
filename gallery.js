function drawGallery()
{
	title = 'Gallery';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	guards = [];

    const galleryMapW = 17;
	const galleryMapH = 20;

	if(!galleryPuzzleTilesDropped) 
	{
		for(let i = 0; i < 8; i++)
		{
			gpt1[i] = chooseFrom([5,6,7,8]) + 120;
			gpt2[i] = chooseFrom([5,6,7,8]) + 120;
		}
		galleryPuzzleTilesDropped = true;
	}

	const galleryGameMap = 
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 1, 53,1, 0, 1, 53,1, 0, 0, 0, 0, 0, 
	0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 
	0, 1, 64,64,1, 0, 0, 1, 0, 1, 0, 0, 1, 64,64,1, 0, 
	0, 1, 64,64,1, 1, 1, 1, 0, 1, 1, 1, 1, 64,64,1, 0, 
	0, 1, 64,64,1, gpt1[0],gpt1[1],1, 1, 1, gpt2[0],gpt2[1],1, 64,64,1, 0, 
	0, 1, 64,64,1, gpt1[2],gpt1[3],1, 53,1, gpt2[2],gpt2[3],1, 64,64,1, 0, 
	0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 
	0, 58,0, 58,0, gpt1[4],gpt1[5],1, 0, 1, gpt2[4],gpt2[5], 0, 58,0, 58,0, 
	0, 1, 1, 1, 0, gpt1[6],gpt1[7],1, 0, 1, gpt2[6],gpt2[7], 0, 1, 1, 1, 0, 
	0, 1, 53,1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 53,1, 0, 
	0, 1, 1, 1, 60,54,54,1, 1, 1, 1, 1, 61,1, 1, 1, 0, 
	0, 1, 53,1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 53,1, 0, 
	0, 1, 1, 1, 50,0, 0, 1, 0, 1, 0, 0, 50,1, 1, 1, 0, 
	0, 1, 53,1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 53,1, 0, 
	0, 1, 1, 1, 61,1, 1, 1, 1, 1, 1, 1, 60,1, 1, 1, 0, 
	0, 1, 53,1, 0, 0,0, 1, 1, 1, 0, 0, 0, 1, 53,1, 0, 
	0, 1, 1, 1, 57,0,0,1, 1, 1, 0,0,50,1, 1, 1, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 56,0, 0, 0, 0, 0, 0, 0, 0] 
	mapW = galleryMapW;
	mapH = galleryMapH;
	gameMap = galleryGameMap;
	
	if(hasEye)
	{
		if(brokenTowerTile)
		{
			setTileTo(3,2,1);
			setTileTo(3,1,1);
			setTileTo(2,1,1);
			setTileTo(1,1,66);
		}
		else { setTileTo(3,2,65);}
	}

	if(!galleryPuzzleSolved)
	{
		let xs = [2,3,13,14]; let ys = [4,5,6,7];		
		for(let x = 0; x < xs.length; x++)
		{
			for(let y = 0; y < ys.length; y++)
			{
				gameMap[toIndex(xs[x],ys[y])] = chooseFrom([5,6,7,8]);
			}
		}
	}
	else
	{
		if(hasEye)
		{
			//is the secret door open?
			if(brokenSecretTile) {
				setTileTo(13,2,1); 
				setTileTo(13,1,1);
				setTileTo(14,1,1);
				setTileTo(15,1,66);
			}
			else { setTileTo(13,2,65); }
		}


		gameMap[toIndex(2,4)] = gpt1[0] - 120; gameMap[toIndex(3,4)] = gpt1[1] - 120;
		gameMap[toIndex(2,5)] = gpt1[2] - 120; gameMap[toIndex(3,5)] = gpt1[3] - 120;
		gameMap[toIndex(2,6)] = gpt1[4] - 120; gameMap[toIndex(3,6)] = gpt1[5] - 120;
		gameMap[toIndex(2,7)] = gpt1[6] - 120; gameMap[toIndex(3,7)] = gpt1[7] - 120;
		gameMap[toIndex(13,4)] = gpt2[0] - 120; gameMap[toIndex(14,4)] = gpt2[1] - 120;
		gameMap[toIndex(13,5)] = gpt2[2] - 120; gameMap[toIndex(14,5)] = gpt2[3] - 120;
		gameMap[toIndex(13,6)] = gpt2[4] - 120; gameMap[toIndex(14,6)] = gpt2[5] - 120;
		gameMap[toIndex(13,7)] = gpt2[6] - 120; gameMap[toIndex(14,7)] = gpt2[7] - 120;
	}
	if(visitedBalcony) { setTileTo(15,1,48); }


	resetItemMap();
	resetAlphaMap();

	if(keysUsed >= 1) { setTileTo(6,12,1); }
	if(keysUsed >= 2) { setTileTo(5,12,1); }
	if(keysUsed >= 3 && !puzzle8Solved) { setTileTo(4,18,50); }

	//need to remember which gates have been unlocked


	//PUZZLE ROOM 5 DOOR = 12,14
	//PUZZLE ROOM 7 DOOR = 12,18
	//PUZZLE ROOM 6 DOOR = 4,14
	//PUZZLE ROOM 8 DOOR = 4,18

	//opening
	if(!puzzle5Solved && !puzzle7Solved)
	{
		starting_pos = [8,18];
		viewport.endTile = [16,19];
		viewport.offset = [16,19];
		viewport.startTile = [0,11];
	}
	//puzzle room 5 door
	else if(!puzzle7Solved && puzzle5Solved)
	{
		gameMap[toIndex(12,14)] = 48;
		starting_pos = [13,14];
		viewport.endTile = [16,19];
		viewport.offset = [-325,-425];
		viewport.startTile = [5,7];
		comingFrom = 0;
	}
	//puzzle room 7 door
	else if(puzzle7Solved && !puzzle5Solved)
	{
		starting_pos = [13,18];
		gameMap[toIndex(12,18)] = 48;
		viewport.endTile = [16,19];
		viewport.offset = [-325,-625];
		viewport.startTile = [5,11];
		comingFrom = 0;
	}
	else if(puzzle7Solved && puzzle5Solved && !puzzle6Solved)
	{
		if(comingFrom == 5) 
		{ 
			starting_pos = [13,14];
			viewport.endTile = [16,19];
			viewport.offset = [-325,-425];
			viewport.startTile = [5,7];
		}
		else if(comingFrom == 7)
		{
			starting_pos = [13,18];
			viewport.endTile = [16,19];
			viewport.offset = [-325,-625];
			viewport.startTile = [5,11];
		}
		else
		{ 
			starting_pos = [8,18];
			viewport.endTile = [16,19];
			viewport.offset = [16,19];
			viewport.startTile = [0,11];	
		}
		gameMap[toIndex(12,14)] = 48;
		gameMap[toIndex(12,18)] = 48;
		comingFrom = 0;
	}
	else if(!puzzle8Solved && puzzle6Solved)
	{
		gameMap[toIndex(12,14)] = 48;
		gameMap[toIndex(12,18)] = 48;
		gameMap[toIndex(4,14)] = 48;
		starting_pos = [3,14];
		viewport.endTile = [11,19];
		viewport.offset = [175,-425];
		viewport.startTile = [0,7];
	}
	else if(puzzle5Solved && puzzle6Solved && puzzle7Solved && puzzle8Solved)
	{
		gameMap[toIndex(12,14)] = 48;
		gameMap[toIndex(12,18)] = 48;
		gameMap[toIndex(4,14)] = 48;
		gameMap[toIndex(4,18)] = 48;
		starting_pos = [3,18];
		viewport.endTile = [11,19];
		viewport.offset = [175,-625];
		viewport.startTile = [0,11];
	}

	if(comingFromBalcony)
	{
		comingFromBalcony = false;
		setTileTo(13,1,1);
		setTileTo(14,1,111);
		setTileTo(13,2,1);

		if(brokenTowerTile)
		{
			setTileTo(3,1,1);
			setTileTo(2,1,111);
			setTileTo(1,1,66);	
		}


		starting_pos = [14,1];
		viewport.endTile = [16,8];
		viewport.offset = [-375,225];
		viewport.startTile = [6,0];
	}

	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

	dropGuards('gallery');
	galleryTick = false;

}



function drawGalleryTiles(currentFrameTime, currentSecond)
{
	for(var y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y)
	{
		for(var x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x)
		{
			//draw gameMap
			var tile = tileTypes[gameMap[toIndex(x,y)]];
			ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				viewport.offset[0] + (x*tileW), viewport.offset[1] + (y*tileH), tileW, tileH);

            //draw glowing tiles (if puzzle solved)
            if(galleryPuzzleAlphaTick || hasMic)
            {
                if(alphaMap[toIndex(x,y)] > 0.0) { alphaMap[toIndex(x,y)] -= alphaReduction;
                ctx.fillStyle = `rgba(244,125,96,${alphaMap[toIndex(x,y)]})`;
                ctx.fillRect(viewport.offset[0] + (x*tileW), viewport.offset[1] + (y*tileH), tileW, tileH); }
				else { alphaMap[toIndex(x,y)] = 0.0; }
            }
		}
	}

	drawGuards(0,0);

	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1],
		player.dimensions[0], player.dimensions[1])
}

function processGalleryTiles(tick)
{
	if(tick)
	{
		if((thisTileIs() < 2 || thisTileIs() > 11) && !galleryPuzzleSolved) { playSnd(gameMap[toIndex(playerX(),playerY())]); } 
		else { 
			if(!galleryPuzzleSolved) { playSnd(1); }
			else { playSnd(gameMap[toIndex(playerX(),playerY())]); }
		}
		//PUZZLE ROOM 5 DOOR = 12,14
		//PUZZLE ROOM 7 DOOR = 12,18
		//PUZZLE ROOM 6 DOOR = 4,14
		//PUZZLE ROOM 8 DOOR = 4,18
		if(playerX() == 7 && playerY() == 12 && gameMap[toIndex(6,12)] == 54 && keysObtained >= 1) { gameMap[toIndex(6,12)] = 1; keysObtained--; keysUsed++; playSnd(46); }  
		if(playerX() == 6 && playerY() == 12 && gameMap[toIndex(5,12)] == 54 && keysObtained >= 1) { gameMap[toIndex(5,12)] = 1; keysObtained--; keysUsed++; playSnd(46); } 
		if(playerX() == 3 && playerY() == 18 && gameMap[toIndex(4,18)] == 57 && keysObtained >= 1) { gameMap[toIndex(4,18)] = 50; keysObtained--; keysUsed++; playSnd(46); } 
		if(playerX() == 12 && playerY() == 14 && !puzzle5Solved)
		{ 
            puzzleRoom5Tick = true;
            isGallery = false;
            isPuzzleRoom5 = true;
		}
		if(playerX() == 12 && playerY() == 18 && !puzzle7Solved)
		{ 
            puzzleRoom7Tick = true;
            isGallery = false;
            isPuzzleRoom7 = true;
		}
		if(playerX() == 4 && playerY() == 14 && !puzzle6Solved)
		{ 
            puzzleRoom6Tick = true;
            isGallery = false;
            isPuzzleRoom6 = true;
		}
		if(playerX() == 4 && playerY() == 18 && !puzzle8Solved)
		{ 
            puzzleRoom8Tick = true;
            isGallery = false;
            isPuzzleRoom8 = true;
		}
		if(playerX() == 13 && playerY() == 2)
		{
			if(!brokenSecretTile) { 
				brokenSecretTile = true;
				setTileTo(13,1,1);
				setTileTo(14,1,111);
				playSnd(95); 
			}
			if(!visitedBalcony) { setTileTo(15,1,66); }
		}
		if(playerX() == 3 && playerY() == 2)
		{
			if(!brokenTowerTile) { 
				playSnd(95); 
				brokenTowerTile = true;
				setTileTo(3,1,1);
				setTileTo(2,1,111);
				setTileTo(1,1,66);	
			}
		}
		if(playerX() == 15 && playerY() == 1)
		{
			isGallery = false;
			isBalcony = true;
			isLobby = true;
			lobbyTick = true;
		}
		if(playerX() == 1 && playerY() == 1)
		{
			isGallery = false;
			isTowerStairs = true;
			towerStairsTick = true;
			stopBgSnd('gallery'); stopBgSnd('key1'); stopBgSnd('key5'); stopBgSnd('key7'); stopBgSnd('key6'); stopBgSnd('key8'); 
			playSnd(143); playSnd(137);
		}
	}
}


function galleryPuzzleState()
{
    let state1 = 0, state2 = 0;
	if(gameMap[toIndex(2,4)] == gpt1[0]-120) { state1++; }
	if(gameMap[toIndex(3,4)] == gpt1[1]-120) { state1++; }
	if(gameMap[toIndex(2,5)] == gpt1[2]-120) { state1++; }
	if(gameMap[toIndex(3,5)] == gpt1[3]-120) { state1++; }
	if(gameMap[toIndex(2,6)] == gpt1[4]-120) { state1++; }
	if(gameMap[toIndex(3,6)] == gpt1[5]-120) { state1++; }
	if(gameMap[toIndex(2,7)] == gpt1[6]-120) { state1++; }
	if(gameMap[toIndex(3,7)] == gpt1[7]-120) { state1++; }

	if(gameMap[toIndex(13,4)] == gpt2[0]-120) { state2++; }
	if(gameMap[toIndex(14,4)] == gpt2[1]-120) { state2++; }
	if(gameMap[toIndex(13,5)] == gpt2[2]-120) { state2++; }
	if(gameMap[toIndex(14,5)] == gpt2[3]-120) { state2++; }
	if(gameMap[toIndex(13,6)] == gpt2[4]-120) { state2++; }
	if(gameMap[toIndex(14,6)] == gpt2[5]-120) { state2++; }
	if(gameMap[toIndex(13,7)] == gpt2[6]-120) { state2++; }
	if(gameMap[toIndex(14,7)] == gpt2[7]-120) { state2++; }

	if(state1 == 8 && state2 == 8) {
		let xs = [2,3,13,14]; let ys = [4,5,6,7];		
		for(let x = 0; x < xs.length; x++)
		{
			for(let y = 0; y < ys.length; y++)
			{
				alphaMap[toIndex(xs[x],ys[y])] = startingAlpha;
			}
		}
		
		if(hasEye) { gameMap[toIndex(13,2)] = 65; 
			updateTextBar('You hear a muffled cracking sound...'); }
		else { updateTextBar('You hear a muffled cracking sound, but see nothing.'); }
		galleryPuzzleSolved = true;
		galleryPuzzleAlphaTick = true;
		playSnd(95); playSnd(144);
	}
}