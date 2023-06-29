// 000000 = wall = 0
// ffffff = ord path = 1
// 00ffd9 = puzzle tiles = choose(2,3,4)
// 007bff = button = 40
// ff8400 = key = 43
// ff0000 = locked gate = 55
// fff200 = scroll = 45
// 88ff00 = door = 50

// e48484 = puzzle segment = 0

// mapW = 14
// mapH = 9
// player start - 1,4

function drawPuzzleRoom8()
{
    title = '';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const puzzleRoom8MapW = 14;
    const puzzleRoom8MapH = 9;
    const puzzleRoom8GameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                0, 1, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 1, 64,64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 1, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                56,1 ,64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 1, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 1, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 1, 64,64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            
    mapW = puzzleRoom8MapW;
    mapH = puzzleRoom8MapH;
    gameMap = puzzleRoom8GameMap;

    puzzle8Order = randomInt(1);
    if(puzzle8Order == 1) {
        setTileTo(1,1,40);
    }
    else if(puzzle8Order == 0)
    {
        setTileTo(1,7,40);
    }

    resetItemMap();
    resetAlphaMap();

	starting_pos = [1, 4];
    lastTileVisited = starting_pos;
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

	puzzleRoom8Tick = false;
}



function drawPuzzleRoom8Tiles(currentFrameTime, currentSecond)
{
	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
			//draw gameMap
			var tile = tileTypes[gameMap[toIndex(x,y)]];
			ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				x*tileW, y*tileH + (tileH*2), tileW, tileH);


            //itemMap
            if(itemMap[toIndex(x,y)] >= 2)
            {
                var item = itemTypes[itemMap[toIndex(x,y)]];
                ctx.drawImage(tileset, item.sprite[0].x, item.sprite[0].y, item.sprite[0].w, item.sprite[0].h,
                    x*tileW, y*tileH + (tileH*2), tileW, tileH);
            }
            
            //draw glowing tiles (if puzzle solved)
            if(puzzle8Solved)
            {
                if(alphaMap[toIndex(x,y)] > 0.0) { alphaMap[toIndex(x,y)] -= alphaReduction;
                ctx.fillStyle = `rgba(244,125,96,${alphaMap[toIndex(x,y)]})`;
                ctx.fillRect(x*tileW, y*tileH + (tileH*2), tileW, tileH); }
                else { alphaMap[toIndex(x,y)] = 0.0; }
            }
            else
            {
                if(alphaMap[toIndex(x,y)] > 0.0) { 
                    alphaMap[toIndex(x,y)] -= alphaReduction;
                    ctx.fillStyle = `rgba(0,0,0,${alphaMap[toIndex(x,y)]})`;
                    ctx.fillRect(x*tileW, y*tileH + (tileH*2), tileW, tileH);  
                } 
                else { alphaMap[toIndex(x,y)] = 0.0; } 
            }
                    

		}
	}

	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		player.position[0], player.position[1]  + (tileH*2),
		player.dimensions[0], player.dimensions[1])

}

function processPuzzleRoom8Tiles(tick)
{
	if(tick)
	{
        if(thisTileIs() >= 3 && thisTileIs() <= 22) {
            playSnd(gameMap[toIndex(playerX(),playerY())] + 160);  
        }
        else if(thisTileIs() == 2) { playSnd(1); }
        else { playSnd(gameMap[toIndex(playerX(),playerY())]); }

        if(!hasEye && playerX() >= 2)
        {
            player.delayMove = 500;
        }
        else { player.delayMove = 250; }
        if(puzzle8Solved) { pickUpItem(); }
        if((playerX() >= 2 && playerX() <= 12 && !hasEye) &&
            (gameMap[toIndex(lastTileVisited[0],lastTileVisited[1])] != gameMap[toIndex(playerX(),playerY())]) &&
            gameMap[toIndex(lastTileVisited[0],lastTileVisited[1])] != 81 && thisTileIs() != 81 && 
            gameMap[toIndex(lastTileVisited[0],lastTileVisited[1])] != 1 && thisTileIs() != 1)
        { 
            playSnd(144); playSnd(135);
            movePlayerToTile(1,4);
            for(let y = 1; y < 8; y++)
            {
                for(let x = 1; x < 13; x++)
                {
                    alphaMap[toIndex(x,y)] = startingAlpha; 
                }
            } 
        }

        // if(puzzle8Solved && playerX() >= 3 && playerX() <= 12 && 
        //     playerY() >= 1 && playerY() <= 7) 
        //     { 
        //         alphaMap[toIndex(playerX(),playerY())] = startingAlpha; 
        //     }
        if(thisTileIs() == 81)
        {
            scramblePuzzle8Tiles();
        }
        if(playerX() == 5 && playerY() == 4 && !hasEye && gameMap[toIndex(6,6)] != 1)
        {
            setTileTo(6,4,1);
            playSnd(randomInt(4) + 146); 
        }
        if(thisTileIs() == 95) { 
            setPlayerTile(1); 
            playSnd(95);
            playBgSnd(160,'key8');
            updateTextBar("You got the King's EYEGLASSES! New paths will be revealed, if you look closely.");
            hasEye = true;
            puzzle8Solved = true;
            drawFinalPuzzle8(); 
            rhythmsToItems();
            for(let x = 1; x <= 12; x++ )
            {
                for(let y = 1; y <= 7; y++) { alphaMap[toIndex(x,y)] = startingAlpha;}
            }
            setTileTo(0,4,50); //unlock lobby door
        }
		if(playerX() == 0 && playerY() == 4 && puzzle8Solved)
		{ 
			// //move to new level
            galleryTick = true;
            isGallery = true;
            isPuzzleRoom8 = false;
		}
	}
}









function dropPuzzle8()
{
    let possibleTiles = scrambleArray([8,3,4,5,6,7]);
    t1 = possibleTiles[0];
    t2 = possibleTiles[1];
    t3 = possibleTiles[2];
    t4 = possibleTiles[3];
    //x = 2 to x = 12, y = 1 to y = 7
    let thisChoice = [
            81,t1,t1,t2,t3,81,t3,t2,t3,t4,t3,
            t2,t4,81,t3,t3,t1,t1,81,t2,t2,t2,
            t2,t4,t3,t4,0,0,0, t1,t3,t4,81,
            81,t3,t2,t4,0, 95,0, 81,t2,t1,t1,
            t1,t4,81,t4,0,0,0, t3,t4,t1,t2,
            t1,t4,t2,81,t1,t1,t1,t4,t2,81,t3,
            81,t2,t3,t2,t4,t2,81,t3,t3,t3,t2
    ];
    let i = 0;
    if(puzzle8Order==0)
    {
        for(let y = 1; y < 8; y++)
        {
            for(let x = 2; x < 13; x++)
            {
                gameMap[toIndex(x,y)] = thisChoice[i];
                i++;
            }
        }
    }
    else if(puzzle8Order==1)
    {
        for(let y = 7; y > 0; y--)
        {
            for(let x = 2; x < 13; x++)
            {
                gameMap[toIndex(x,y)] = thisChoice[i];
                i++;
            }
        }  
    }

}


function drawFinalPuzzle8()
{
    let n = null;
    let thisChoice = [
        65,n, n, 0, n, 65,n, n, 0, n, 0, 
        0, 0, 65,n, n, 0, 0, 65,n, n, n, 
        0, 0, 0, 0, 0,0,0,0, n, 0, 65,
        0, 0, n, n, 65,n, 0,0, n, 0, n, 
        0, 0, 65,0, 0,0,0,0, 0, 0, n, 
        0, 0, n, 65,n, n, 0, 0, n, 65,n, 
        0, 0, 0, n, 0, n, 65,n, n, 0, 0
    ];
    let i = 0;
    if(puzzle8Order==0)
    {
        for(let y = 1; y < 8; y++)
        {
            for(let x = 2; x < 13; x++)
            {
                if(thisChoice[i] == null) { gameMap[toIndex(x,y)] = gameMap[toIndex(x,y)]; }
                else { gameMap[toIndex(x,y)] = thisChoice[i]; }
                i++;
            }
        }
    }
    else if(puzzle8Order==1)
    {
        for(let y = 7; y > 0; y--)
        {
            for(let x = 2; x < 13; x++)
            {
                if(thisChoice[i] == null) { gameMap[toIndex(x,y)] = gameMap[toIndex(x,y)]; }
                else { gameMap[toIndex(x,y)] = thisChoice[i]; }
                i++;
            }
        }  
    }
}

function scramblePuzzle8Tiles()
{
    let newT1, newT2, newT3, newT4;
    let possibleTiles = scrambleArray([8,3,4,5,6,7]);
    newT1 = possibleTiles[0];
    newT2 = possibleTiles[1];
    newT3 = possibleTiles[2];
    newT4 = possibleTiles[3];
    //x = 2 to x = 12, y = 1 to y = 7
    let i = 0;
    for(let y = 1; y < 8; y++)
    {
        for(let x = 2; x < 13; x++)
        { 
            if(gameMap[toIndex(x,y)] == t1) { gameMap[toIndex(x,y)] = newT1; }
            else if(gameMap[toIndex(x,y)] == t2) { gameMap[toIndex(x,y)] = newT2; }
            else if(gameMap[toIndex(x,y)] == t3) { gameMap[toIndex(x,y)] = newT3; }
            else if(gameMap[toIndex(x,y)] == t4) { gameMap[toIndex(x,y)] = newT4; }
        }
    }
    t1 = newT1;
    t2 = newT2;
    t3 = newT3;
    t4 = newT4;

}