function drawPuzzleRoom6()
{
    title = '';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const puzzleRoom6MapW = 14;
    const puzzleRoom6MapH = 9;
    const puzzleRoom6GameMap = [0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0,
                                0, 1, 64, 64, 64, 64, 64, 64, 0,  0,  0,  0,  43, 0,
                                0, 1, 64, 64, 64, 64, 64, 64, 0,  0,  0,  0,  55, 0,
                                0, 1, 64, 64, 64, 64, 64, 64, 0,  0,  0,  0,  55, 0,
                                56,1, 64, 64, 64, 64, 64, 64, 0,  0,  0,  0,  55,0,
                                0, 1, 64, 64, 64, 64, 64, 64, 0,  0,  0,  0,  55, 0,
                                0, 1, 64, 64, 64, 64, 64, 64, 0,  0,  0,  0,  55, 0,
                                0, 40,64, 64, 64, 64, 64, 64, 1,  1,  1,  1,  1,0,
                                0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0];
                            
    mapW = puzzleRoom6MapW;
    mapH = puzzleRoom6MapH;
    gameMap = puzzleRoom6GameMap;


    //decide map in advance
    let r = randomInt(1);
    if(r == 1) 
    { 
        setTileTo(8,7,0); setTileTo(9,7,0); setTileTo(10,7,0); setTileTo(11,7,0); setTileTo(12,7,43); 
        setTileTo(8,1,1); setTileTo(9,1,1); setTileTo(10,1,1); setTileTo(11,1,1); setTileTo(12,1,1);
        setTileTo(1,7,1); setTileTo(1,1,40);
    }

    let thisSequence = scrambleArray([0,1,2,3,4]);
    let choices = [
        [4,6,7,3],
        [6,7,3,8],
        [7,3,8,4],
        [3,8,4,5],
        [8,4,5,6]
    ];
    for(let i = 0; i < thisSequence.length; i++)
    { puzzle6Arrays.push(choices[thisSequence[i]]); }
    for(let y = 2; y <= 6; y++)
    {
        for(let x = 8; x <= 11; x++)
        {
            gameMap[toIndex(x,y)] = puzzle6Arrays[y-2][x-8] + 80;
        }
    }
    resetItemMap();
    resetAlphaMap();
    
	starting_pos = [1, 4];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

	puzzleRoom6Tick = false;

}



function drawPuzzleRoom6Tiles(currentFrameTime, currentSecond)
{
	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
			//draw gameMap
			var tile = tileTypes[gameMap[toIndex(x,y)]];
			ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				x*tileW, y*tileH + (tileH), tileW, tileH);


            //itemMap
            if(itemMap[toIndex(x,y)] >= 2)
            {
                var item = itemTypes[itemMap[toIndex(x,y)]];
                ctx.drawImage(tileset, item.sprite[0].x, item.sprite[0].y, item.sprite[0].w, item.sprite[0].h,
                    x*tileW, y*tileH + (tileH), tileW, tileH);
            }

            //draw glowing tiles (if puzzle solved)
            if(alphaMap[toIndex(x,y)] > 0.0) { alphaMap[toIndex(x,y)] -= alphaReduction;
            ctx.fillStyle = `rgba(244,125,96,${alphaMap[toIndex(x,y)]})`;
            ctx.fillRect(x*tileW, y*tileH + (tileH), tileW, tileH); }
            else { alphaMap[toIndex(x,y)] = 0.0; }    

		}
	}

	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		player.position[0], player.position[1]  + (tileH),
		player.dimensions[0], player.dimensions[1])

}

function processPuzzleRoom6Tiles(tick)
{
	if(tick)
	{
        // if(thisTileIs() >= 2 && thisTileIs() <= 22)
        // { player.delayMove = 500; }
        // else { player.delayMove = 250; }

        if(thisTileIs() < 2 || thisTileIs() > 22) { 
            playSnd(gameMap[toIndex(playerX(),playerY())]); 
        } 
		else { 
			playSnd(1);
		}
        if(puzzle6Solved && collectTime) { pickUpItem(); }
        if(thisTileIs() == 43) { 
            // playSnd(43);
            setPlayerTile(1); 
            updateTextBar("You got a KEY! But the room has shifted...");
            playBgSnd(159,'key6');
            //CHANGE ROOM ORDER
            for(let y = 1; y <= 7; y++) {
                for(let x = 2; x <= 11; x++) {
                    if(x >= 8 && x <= 11) { gameMap[toIndex(x,y)] = chooseFrom([4,5,6,7,8,3]); }
                    alphaMap[toIndex(x,y)] = startingAlpha;
                }
            }

            finalPuzzle6XPos = randomInt(9) + 2;
            for(let y = 1; y <= 7; y++)
            {
                gameMap[toIndex(1,y)] = gameMap[toIndex(finalPuzzle6XPos,y)] + 80;
            }
            
            gotPuzzle6Key = true;

            keysObtained++; 
            setTileTo(0,4,50); //unlock lobby door
        }

		if(playerX() == 0 && playerY() == 4 && puzzle6Solved)
		{ 
			// //move to new level
            galleryTick = true;
            isGallery = true;
            isPuzzleRoom6 = false;
		}
	}
}









function dropPuzzle6()
{
    theseYs = scrambleArray([1,2,3,4,5,6,7]);
    theseYs.pop();
    theseYs.pop();
    theseXoffsets = [randomInt(2),randomInt(2),randomInt(2),randomInt(2),randomInt(2)]
    for (let n = 0; n < theseYs.length; n++) 
    {
        for(let x = theseXoffsets[n]; x <= theseXoffsets[n]+3; x++)
        {
            if(x == theseXoffsets[n]) { puzzle6StartTiles.push([theseXoffsets[n]+2,theseYs[n]]); }
            gameMap[toIndex(x+2,theseYs[n])] = puzzle6Arrays[n][x-theseXoffsets[n]];  
        }
    }
    for(let i = 0; i < gameMap.length; i++)
    {
        if(gameMap[i] == 64) { gameMap[i] = chooseFrom([4,5,6,7,8,3])}
    }
}


function puzzle6State()
{
    //if this is the first red tile
    if(puzzle6TilesActivated == 0)
    {
        //if player matches with a start point, begin puzzle
        for (let t = 0; t < puzzle6StartTiles.length; t++) 
        {
            if(playerY() == puzzle6StartTiles[t][1] && playerX() == puzzle6StartTiles[t][0] && thisTileIs() < 10)
            {
                gameMap[toIndex(playerX(), playerY())] += 10
                puzzle6TilesActivated++;
                currentY = playerY();
                currentX = playerX();
            }
        }
        playSnd(gameMap[toIndex(playerX(),playerY())] + 160);
    }
    else if(playerY() == currentY && playerX() == currentX + 1)
    {
        currentX += 1;
        gameMap[toIndex(playerX(), playerY())] += 10;
        playSnd(gameMap[toIndex(playerX(),playerY())] + 160);
        puzzle6TilesActivated++;
        if(puzzle6TilesActivated == 4)
        {

            for(let p = 0; p < puzzle6Arrays.length; p++)
            {
                if(gameMap[toIndex(8,p+2)] == puzzle6Arrays[p][0]+80 && 
                gameMap[toIndex(playerX(),playerY())] == puzzle6Arrays[p][3]+10)
                {
                    for(let x = 0; x < 4; x++)
                    {
                        alphaMap[toIndex(playerX()+(x-3),playerY())] = startingAlpha;
                        // console.log(gameMap[toIndex(x+8,p+2)]);
                        gameMap[toIndex(x+8,p+2)] = 0;
                        alphaMap[toIndex(x+8,p+2)] = startingAlpha;
                    }
                    gameMap[toIndex(12,p+2)] = 1;
                    alphaMap[toIndex(12,p+2)] = startingAlpha;
                    // puzzle6Arrays.splice(p,1);
                    puzzle6StartTiles[p] = [0,0];
                }
            }
            playSnd(randomInt(4) + 146); 
            swapTiles(14,4);
            swapTiles(15,5);
            swapTiles(16,6);
            swapTiles(17,7);
            swapTiles(18,8);
            swapTiles(19,9);
            swapTiles(13,3);
            swapTiles(12,2);
            puzzle6TilesActivated = 0;
            currentX = 0;
            currentY = 0;
        }
    }
    else
    {
        swapTiles(14,4);
        swapTiles(15,5);
        swapTiles(16,6);
        swapTiles(17,7);
        swapTiles(18,8);
        swapTiles(19,9);
        swapTiles(13,3);
        swapTiles(12,2);
        puzzle6TilesActivated = 0;
        currentX = 0;
        currentY = 0;
        playSnd(135);
    }


}

function finalPuzzle6State()
{
    if(playerX() == finalPuzzle6XPos && playerY() == 1 && puzzle6TilesActivated == 0 && thisTileIs() < 10)
    {
        gameMap[toIndex(playerX(), playerY())] += 10;
        puzzle6TilesActivated++;
        currentY = playerY();
    }
    else if(playerX() == finalPuzzle6XPos && playerY() == currentY + 1)
    {
        currentY += 1;
        gameMap[toIndex(playerX(), playerY())] += 10;
        puzzle6TilesActivated++;
        if(puzzle6TilesActivated == 7)
        {
            for(let y = 1; y <= 7; y++)
            { 
                gameMap[toIndex(1,y)] = 1;
                gameMap[toIndex(finalPuzzle6XPos,y)] -= 10; 
                for(let x = 2; x <= 11; x++)
                {
                    alphaMap[toIndex(x,y)] = startingAlpha;
                    if(y >= 2 && y <= 6)
                    { gameMap[toIndex(x,y)] += 110; }
                }
            }
            puzzle6Solved = true;
            clearTextBar();
            rhythmsToItems(); collectTimerOn(collectionTime);
        }
    }
    else
    {
        swapTiles(14,4);
        swapTiles(15,5);
        swapTiles(16,6);
        swapTiles(17,7);
        swapTiles(18,8);
        swapTiles(19,9);
        swapTiles(13,3);
        swapTiles(12,2);
        puzzle6TilesActivated = 0;
        currentX = 0;
        currentY = 0;
        playSnd(135);
    }

}