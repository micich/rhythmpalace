function drawPuzzleRoom1()
{
    title = '';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const puzzleRoom1MapW = 14;
    const puzzleRoom1MapH = 9;
    const puzzleRoom1GameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                0, 45,0, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 1, 40,64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 1, 0, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                56,1 ,0, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 0, 0, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 43,0, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 1, 70,64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            
    mapW = puzzleRoom1MapW;
    mapH = puzzleRoom1MapH;
    gameMap = puzzleRoom1GameMap;

    resetItemMap();
    resetAlphaMap();

	starting_pos = [1, 4];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

	puzzleRoom1Tick = false;
}



function drawPuzzleRoom1Tiles(currentFrameTime, currentSecond)
{
	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
			//draw gameMap
			var tile = tileTypes[gameMap[toIndex(x,y)]];
			ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				x*tileW, y*tileH + (tileH*2), tileW, tileH);


            //itemMap could go here if needed
            if(itemMap[toIndex(x,y)] >= 2)
            {
                var item = itemTypes[itemMap[toIndex(x,y)]];
                ctx.drawImage(tileset, item.sprite[0].x, item.sprite[0].y, item.sprite[0].w, item.sprite[0].h,
                    x*tileW, y*tileH + (tileH*2), tileW, tileH);
            }

            //draw glowing tiles
            if(alphaMap[toIndex(x,y)] > 0.0) { alphaMap[toIndex(x,y)] -= alphaReduction;
                ctx.fillStyle = `rgba(244,125,96,${alphaMap[toIndex(x,y)]})`;
                ctx.fillRect(x*tileW, y*tileH + (tileH*2), tileW, tileH); }
                else { alphaMap[toIndex(x,y)] = 0.0; }
                    
                    

		}
	}

	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		player.position[0], player.position[1]  + (tileH*2),
		player.dimensions[0], player.dimensions[1])

}

function processPuzzleRoom1Tiles(tick)
{
	if(tick)
	{
        if(thisTileIs() < 2 || thisTileIs() > 4) { playSnd(gameMap[toIndex(playerX(),playerY())]); } else { playSnd(1); }
        if(puzzle1Solved && collectTime) { 
            pickUpItem(); 
        }
        // if(puzzle1Solved && playerX() >= 3 && playerX() <= 12 && 
        //     playerY() >= 1 && playerY() <= 7) 
        //     { 
        //         alphaMap[toIndex(playerX(),playerY())] = startingAlpha; 
        //     }
		if(playerX() == 1 && playerY() == 1) { updateTextBar("\"Press SPACE to activate certain tiles.\"")}
        if(thisTileIs() == 43) {
            setPlayerTile(1); 
            updateTextBar("You got a KEY!");
            keysObtained++; 
            playBgSnd(152,'key1');
            setTileTo(0,4,50); //unlock lobby door
        }
		// movePlayer(7,12,19,12,true);
		// switchTile(8,9);
		// pickUpItem(2);
		// if(playerX() == 13 && playerY() == 6) { updateTextBar("It reads, \"Sometimes it pays to look backwards.\"")}
		// if(hasCastle1Key == false && thisTileIs() == 7) {updateTextBar("The door appears to be locked.")}
		// if(hasCastle1Key == true && thisTileIs() == 7) { setTileTo(playerX() - 1,playerY(),10); setPlayerTile(11); updateTextBar("You unlocked the door!")}
		if(playerX() == 0 && playerY() == 4 && puzzle1Solved)
		{ 
			// //move to new level
            lobbyTick = true;
            isLobby = true;
            isPuzzleRoom1 = false;
		}
	}
}









function dropPuzzle1()
{
    let i;
    let thisPuzzle = [
        0 ,64,64,64,64,64,0 ,0 ,
        0 ,0 ,0 ,64,0 ,64,64,0 ,
        0 ,64,0 ,64,0 ,64,64,0 ,
        0 ,64,64,64,0 ,0 ,64,64,
        0 ,0 ,0 ,64,0 ,64,64,0 ];
    let r = randomInt(3);

    if(r == 0 || r == 2 ) { i = thisPuzzle.length-1; }
    if(r == 1 || r == 3 ) { i = 0; }
    if(r == 0 || r == 1)
    {
        for(let y = 2; y <= 6; y++)
        {
            for(let x = 4; x <= 11; x++)
            {
                gameMap[toIndex(x,y)] = thisPuzzle[i];
                if(r == 0) { i--; } else { i++; }
            }
        }
    }
    if(r == 2 || r == 3)
    {
        for(let y = 2; y <= 6; y++)
        {
            for(let x = 11; x >= 4; x--)
            {
                gameMap[toIndex(x,y)] = thisPuzzle[i];
                if(r == 2) { i--; } else { i++; }
            }
        }
    }
    for(let x = 3; x <= 12; x++)
    {
        for(let y = 1; y <= 7; y++)
        {
            if(gameMap[toIndex(x,y)] == 64)
            {
                let r = randomInt(2);
                if(r == 0) { gameMap[toIndex(x,y)] = 2; }
                if(r == 1) 
                { 
                    gameMap[toIndex(x,y)] = 3; 
                    puzzle1Tiles.push([x,y]);
                }
                if(r == 2) { gameMap[toIndex(x,y)] = 4; }
            }
        }
    }
}


function puzzle1State()
{
    let state = 0;
    for(let x = 3; x <= 12; x++)
    {
        for(let y = 1; y <= 7; y++)
        {
            if(gameMap[toIndex(x,y)] == 13) //red quarter
            { state++; }
        }
    }
    if(gameMap[toIndex(2,2)] == 41 && state == puzzle1Tiles.length) { 
        setTileTo(2,7,1); setTileTo(2,2,1);
        alphaMap[toIndex(2,7)] = startingAlpha; 
        updateTextBar("The gate unlocked!");
        puzzle1Solved = true;
        collectTimerOn(collectionTime);
        //clear walls and activate alpha channel
        for(let x = 3; x <= 12; x++)
        {
            for(let y = 1; y <= 7; y++)
            {
                if(gameMap[toIndex(x,y)] == 13) { setItemTo(x,y,3); }
                else if(gameMap[toIndex(x,y)] == 0)
                { itemMap[toIndex(x,y)] = randomInt(2) + 2; }
                else { itemMap[toIndex(x,y)] = gameMap[toIndex(x,y)]; }
                gameMap[toIndex(x,y)] = 1;
                alphaMap[toIndex(x,y)] = startingAlpha;
            }
        }
    }
}