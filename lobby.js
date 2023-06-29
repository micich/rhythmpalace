function drawLobby()
{
	if(isBalcony) { title = 'Balcony'; }
	else { title = 'Lobby'; }
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

	guards = [];

    const lobbyMapW = 19;
	const lobbyMapH = 26;
	let m = 136;
	const lobbyGameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 50,0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 1, 1, 0, 0, 66,0, 0, 1, 1, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 1, 1, 0, 0, 57,0, 0, 1, 1, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 1, 1, 0, 0, 57,0, 0, 1, 1, 0, 0, 0, 0, 0, 
						  0, 0, 0, 0, 0, 1, 1, 0, 0, 57,0, 0, 1, 1, 0, 0, 0, 0, 0,
						  0, 0, 0, 0, 0, 1, 1, 0, 0, 52,0, 0, 1, 1, 0, 0, 0, 0, 0, 
						  0, 1, 1, 1, 1, 1, 1, 0, 0, 52,0, 0, 1, 1, 1, 1, 1, 1, 0, 
						  0, 1, 0, 0, 0, 0, 0, 0, 0, 52,0, 0, 0, 0, 0, 0, 0, 1, 0, 
						  0, 1, 0, 0, 0, 1, 111, 111, 111, 1, 111, 111, 111, 1, 0, 0, 0, 1, 0, 
						  0, 1, 0, 0, 0, 52,0, 0, 0, 0, 0, 0, 0,52, 0, 0, 0, 1, 0, 
						  0, 1, 0, 0, 1, 1, m, 1, m, 1, m, 1, m, 1, 1, 0, 0, 1, 0,
						  0, 1, 0, 56,1, m, 1, 53,1, 45,1, 53,1, m, 1, 56,0, 1, 0, 
						  0, 1, 0, 0, 1, 53,1, 1, 1, 1, 1, 1, 1, 53,1, 0, 0, 1, 0, 
						  0, 1, 0, 0, m, 1, 1, 1, 3, 6, 4, 1, 1, 1, m, 0, 0, 1, 0, 
						  0, 1, 0, 0, 1, 53,1, 1, 4, 3, 6, 1, 1, 53,1, 0, 0, 1, 0, 
						  0, 1, 0, 0, m, 1, 1, 1, 3, 6, 4, 1, 1, 1, m, 0, 0, 1, 0, 
						  0, 1, 0, 0, 1, 53,1, 1, 1, 1, 1, 1, 1, 53,1, 0, 0, 1, 0, 
						  0, 1, 0, 56,1, 1, m, 53,1, 1, 1, 53,1, m, 1, 56,0, 1, 0,
						  0, 1, 0, 0, 1, 1, 1, 1, m, m, m, 1, m, 1, 1, 0, 0, 1, 0, 
						  0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 
						  0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 
						  0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 
						  0, 1, 1, 1, 0, 0, 0, 0, 0, 56,0, 0, 0, 0, 0, 1, 1, 97, 0, 
						  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	const lobbyItemMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	if(!visitedBalcony)
	{
		for(let i = 0; i < lobbyItemMap.length; i++)
		{
			if(lobbyItemMap[i] == 1) { lobbyItemMap[i] = chooseFrom([3,4,5,6]); }
		}
	}
	mapW = lobbyMapW;
	mapH = lobbyMapH;
	gameMap = lobbyGameMap;
	itemMap = lobbyItemMap;
	

	resetAlphaMap();

	// checkeredTiles(1,1,140);

	dropLobbyPuzzles();

	if(keysUsed >= 1) { setTileTo(9,6,52); }
	if(keysUsed >= 2) { setTileTo(9,5,52); }
	if(keysUsed >= 3) { setTileTo(9,4,52); }

	//extra conditions based on stage completed
	if(!puzzle1Solved) { 
		viewport.endTile = [17, 25]
		viewport.offset = [-125, -875]
		viewport.startTile = [1, 16]
		starting_pos = [9, 23];

	}
	else if(!puzzle2Solved) { 
		//from puzzle 1 room
		viewport.endTile = [18, 20]
		viewport.offset = [-375, -375]
		viewport.startTile = [6, 6]
		starting_pos = [14,13];
		gameMap[toIndex(15,13)] = 48;
	}
	else if(!puzzle3Solved) { 
		//from puzzle 2 room
		viewport.endTile = [12, 20]
		viewport.offset = [125, -375]
		viewport.startTile = [0, 6]
		starting_pos = [4,13]; 
		gameMap[toIndex(15,13)] = 48;
		gameMap[toIndex(3,13)] = 48;
	}
	else if(isBalcony)
	{
		viewport.endTile = [18, 8]
		viewport.offset = [-325, 225]
		viewport.startTile = [5, 0]
		starting_pos = [13,1];
		gameMap[toIndex(15,13)] = 48;
		gameMap[toIndex(3,13)] = 48;
		gameMap[toIndex(15,19)] = 48; 
		swapTiles(136,1);
	}
	else { 
		//from puzzle 3 room
		gameMap[toIndex(9,13)] = 1;
		viewport.endTile = [18, 24]
		viewport.offset = [-375, -675]
		viewport.startTile = [6, 12]
		starting_pos = [14,19];
		gameMap[toIndex(15,13)] = 48;
		gameMap[toIndex(3,13)] = 48;
		gameMap[toIndex(15,19)] = 48; 
		swapTiles(136,1);
	}

	if(isBalcony) { lobbyPuzzleAlphaTick = true; }

	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);


	allowLobbyRhythms = false;
	dropGuards('lobby');
	lobbyTick = false;

	if(hasMic) { gameMap[toIndex(17,24)] = 1; }

}



function drawLobbyTiles(currentFrameTime, currentSecond)
{
	for(var y = viewport.startTile[1]; y <= viewport.endTile[1]; ++y)
	{
		for(var x = viewport.startTile[0]; x <= viewport.endTile[0]; ++x)
		{
			//draw gameMap
			var tile = tileTypes[gameMap[toIndex(x,y)]];
			ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				viewport.offset[0] + (x*tileW), viewport.offset[1] + (y*tileH), tileW, tileH);

			if(itemMap[toIndex(x,y)] >= 2)
			{
				var item = itemTypes[itemMap[toIndex(x,y)]];
				ctx.drawImage(tileset, item.sprite[0].x, item.sprite[0].y, item.sprite[0].w, item.sprite[0].h,
					viewport.offset[0] + (x*tileW), viewport.offset[1] + (y*tileH), tileW, tileH);
			}
			// ctx.fillText(gameMap[toIndex(x,y)],viewport.offset[0] + (x*tileW), viewport.offset[1] + (y*tileH))
            
			//draw glowing tiles (if puzzle solved)
            if(lobbyPuzzleAlphaTick)
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

function processLobbyTiles(tick)
{
	if(tick)
	{
		if(thisTileIs() == 97) { setTileTo(playerX(),playerY(),1); 
			playSnd(95);
			hasMic = true;
			secretsObtained++;
			updateTextBar("You got the King's MICROPHONE! Guards will now disappear when you step on them."); 
		}
		if(isBalcony) { pickUpItem(); }
		if(!allowLobbyRhythms) { if(thisTileIs() < 2 || thisTileIs() > 6) { playSnd(gameMap[toIndex(playerX(),playerY())]); } else { playSnd(1); }}
		else { playSnd(gameMap[toIndex(playerX(),playerY())]); }
		// if(puzzle2Solved) { movePlayer(5,16,13,16,true); }
		if(playerX() == 9 && playerY() == 13 && thisTileIs() == 45 ) { 
			if(!puzzle1Solved) { updateTextBar("It reads, \"Step onto the rhythms and press SPACE to turn the rests into notes.\""); }
			else { updateTextBar("\"Turn all of the tiles below into the NEW rhythm that you see.\""); } 
		}
		
		if(playerX()==9 && playerY()==7 && keysObtained > 0)
		{
			if(keysUsed == 0)
			{ setTileTo(9,6,52); keysObtained--; keysUsed++; updateTextBar("You unlocked the gate!"); playSnd(46); }
		}
		if(playerX()==9 && playerY()==6 && keysObtained > 0)
		{
			if(keysUsed == 1)
			{ setTileTo(9,5,52); keysObtained--; keysUsed++; updateTextBar("You unlocked the gate!"); playSnd(46); }
		}
		if(playerX()==9 && playerY()==5 && keysObtained > 0)
		{
			if(keysUsed == 2)
			{ setTileTo(9,4,52); keysObtained--; keysUsed++; updateTextBar("You unlocked the gate!"); playSnd(46);  }
		}
		
		if(playerX() == 15 && playerY() == 13 && !puzzle1Solved)
		{ 
            puzzleRoom1Tick = true;
			lobbyPuzzleAlphaTick = false;
            isLobby = false;
            isPuzzleRoom1 = true;
		}
		if(playerX() == 3 && playerY() == 13 && !puzzle2Solved)
		{ 
            puzzleRoom2Tick = true;
			lobbyPuzzleAlphaTick = false;
            isLobby = false;
            isPuzzleRoom2 = true;
		}
		if(playerX() == 15 && playerY() == 19 && !puzzle3Solved)
		{ 
            puzzleRoom3Tick = true;
			lobbyPuzzleAlphaTick = false;
            isLobby = false;
            isPuzzleRoom3 = true;
		}
		if(playerX()==9 && playerY()==3)
		{
			
			puzzleRoom4Tick = true;
			lobbyPuzzleAlphaTick = false;
            isLobby = false;
            isPuzzleRoom4 = true;
		}
		if(playerX()==14 && playerY()==1)
		{
			visitedBalcony = true;
			isLobby = false;
            isGallery = true;
            isBalcony = false;
			galleryTick = true;
			comingFromBalcony = true;
		}
	}
}



function lobbyPuzzle1State()
{
    let state = 0;
    for(let x = 8; x <= 10; x++)
    {
        for(let y = 15; y <= 17; y++)
        {
            if(gameMap[toIndex(x,y)] == 3) { state++; }
        }
    }
    if(state == 9)
    { return true; }
}

function lobbyPuzzle2State()
{
    let state = 0;
    for(let x = 7; x <= 11; x++)
    {
        for(let y = 15; y <= 17; y++)
        {
			if(gameMap[toIndex(x,y)] == 4) { state++; }
			// if(y == 15 && gameMap[toIndex(x,y)] == 3) { state++; }
			// if(y == 16 && gameMap[toIndex(x,y)] == 4) { state++; }
			// if(y == 17 && gameMap[toIndex(x,y)] == 2) { state++; }
        }
    }
    if(state == 12)
    { return true; }
}

function lobbyPuzzle3State()
{
	let state = 0;
	for(let x = 7; x <= 11; x++)
    {
        for(let y = 14; y <= 18; y++)
        {
			if(gameMap[toIndex(x,y)] == 6) { state++; }
			// if(y == 15 && gameMap[toIndex(x,y)] == 3) { state++; }
			// if(y == 16 && gameMap[toIndex(x,y)] == 4) { state++; }
			// if(y == 17 && gameMap[toIndex(x,y)] == 2) { state++; }
        }
    }
	if(state == 12)
    { return true; }

	// let solution = [6,4,3,2,3,4,6];
    // let state = 0;
	// let i = 0;
    // for(let x = 6; x <= 12; x++)
    // {
	// 	thisTile = solution[i];
    //     if(gameMap[toIndex(x,16)] == solution[i]) { state++; }
	// 	i++;
    // }
    // if(state == solution.length)
    // { return true; }
}


function dropLobbyPuzzles()
{
	//dropping puzzles
	if(!puzzle1Solved)
	{
		gameMap[toIndex(15,13)] = 56;
		for(let x = 8; x <= 10; x++)
		{
			for(let y = 15; y <= 17; y++)
			{
				let r = randomInt(1);
				if(r == 0) { gameMap[toIndex(x,y)] = 2; }
				else { gameMap[toIndex(x,y)] = 3; }
			}
		}
		
	}
	else if(!puzzle2Solved)
	{
		gameMap[toIndex(3,13)] = 56;
		for(let x = 7; x <= 11; x++)
		{
			for(let y = 15; y <= 17; y++)
			{
				if(x != 9)
				{
					let r = randomInt(2);
					if(r == 0) { gameMap[toIndex(x,y)] = 2; }
					else if(r == 1) { gameMap[toIndex(x,y)] = 3; }
					else { gameMap[toIndex(x,y)] = 4; }
				}
				else
				{
					gameMap[toIndex(x,y)] = 1;
				}
			}
		}
	}
	else if(!puzzle3Solved)
	{
		gameMap[toIndex(15,19)] = 56;
		for(let x = 7; x <= 11; x++)
		{
			for(let y = 14; y <= 18; y++)
			{
				if(x != 8 && x != 10 && y != 16)
				{
					let c = [3,4,6];
					gameMap[toIndex(x,y)] = c[randomInt(c.length-1)];
				}
				else { gameMap[toIndex(x,y)] = 1; }
			}
		}
	}
	else {
		for(let x = 8; x <= 10; x++)
		{
			for(let y = 15; y <= 17; y++)
			{
				gameMap[toIndex(x,y)] = 1;
			}
		}
	}
}