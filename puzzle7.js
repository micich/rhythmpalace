function drawPuzzleRoom7()
{
    title = '';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const puzzleRoom7MapW = 14;
    const puzzleRoom7MapH = 10;
    const puzzleRoom7GameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                0, 79, 0, 64,64,64,64,64,64,64,64,64,64,0,
                                0, 62, 0, 64,64,64,64,64,64,64,64,64,64,0,
                                0, 62, 0, 64,64,64,64,64,64,64,64,64,64,0,
                                0, 55,0, 64,64,64,64,64,64,64,64,64,64,0,
                                0, 55,0, 64,64,64,64,64,64,64,64,64,64,0,
                                0, 55,0, 64,64,64,64,64,64,64,64,64,64,0,
                                0, 55,0, 64,64,64,64,64,64,64,64,64,64,0,
                                0, 43,0, 40,1, 1, 1, 1, 1, 1, 1, 1, 1, 56,        
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            
    mapW = puzzleRoom7MapW;
    mapH = puzzleRoom7MapH;
    gameMap = puzzleRoom7GameMap;

    resetItemMap();
    resetAlphaMap();

	starting_pos = [12, 8];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

	puzzleRoom7Tick = false;
}



function drawPuzzleRoom7Tiles(currentFrameTime, currentSecond)
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

function processPuzzleRoom7Tiles(tick)
{
	if(tick)
	{
        if(thisTileIs() >= 112 && thisTileIs() <= 121 && !gotPuzzle7Key)
        { player.delayMove = 500; }
        else { player.delayMove = 250; }

        if((thisTileIs() == 66 || thisTileIs() == 79) && gotPuzzle7Key) { playSnd(randomInt(4) + 146); }
        else { if(thisTileIs() != 66 && thisTileIs() != 79 && thisTileIs() != 43 && thisTileIs() != 1) { playSnd(gameMap[toIndex(playerX(),playerY())] + 50); } else { playSnd(1); }}
        if(puzzle7Solved && collectTime)
        {
            pickUpItem();
        }

        if(thisTileIs() == 66 || (thisTileIs() == 79 && gotPuzzle7Key)) { 
            if(!gotPuzzle7Key)
            {
                puzzle7State();
                movePlayerToTile(playerX(),playerY()+7); 
            }
            else
            {
                movePlayer(1,1,3,1,false)
                movePlayer(3,8,4,2,false)
                movePlayer(4,8,5,3,false)
                movePlayer(5,8,6,4,false)
                movePlayer(6,8,7,5,false)
                movePlayer(7,8,8,6,false)
                movePlayer(8,8,7,3,false)
                movePlayer(7,1,8,4,false)
                movePlayer(8,1,9,5,false)
                movePlayer(9,1,10,6,false)
                movePlayer(10,1,11,7,false)
                movePlayer(11,1,12,8,false)
                movePlayer(12,6,7,3,false)
                alphaMap[toIndex(playerX(),playerY())] = startingAlpha;
            }
        }
        if(thisTileIs() == 79 && !gotPuzzle7Key) { 
            movePlayerToTile(1,1);
            playSnd(randomInt(4) + 146);
            for(let x = 3; x < 13; x++) { gameMap[toIndex(x,1)] = 1; alphaMap[toIndex(x,1)] = startingAlpha; }
            gameMap[toIndex(1,1)] = 1; alphaMap[toIndex(1,1)] = startingAlpha;
        }
        if(thisTileIs() == 43) { 
            gotPuzzle7Key = true;
            setPlayerTile(1); 
            puzzle7Warps = scrambleArray([3,4,5,6,7,8,9,10,11]);
            puzzle7Warps.push(12);
            updateTextBar("You got a KEY! But the room has shifted...");
            playBgSnd(158,'key7');
            puzzle7Solved = true;
            setTileTo(1,1,79);
            setTileTo(12,8,79);
            setTileTo(3,1,79);
            setTileTo(11,1,79);
            for(let x = 3; x < 13; x++)
            {
                for(let y = 1; y < 9; y++)
                { 
                    alphaMap[toIndex(x,y)] = startingAlpha; 
                }
            }
            let warps = [[4,2],[5,3],[6,4],[7,5],[8,6],
            [3,8],[4,8],[5,8],[6,8],[7,8],[8,8],
            [7,1],[8,1],[9,1],[10,1],
            [7,3],[8,4],[9,5],[10,6],[11,7],[12,6]];
            let walls = [[4,1], [5,1], [6,1], [5,2], [6,2], [6,3],
                         [7,4], [8,5], [9,6], [9,7], [10,7], [9,8],
                         [10,8], [11,8], [12,7], [12,1]];

            for(let i = 0; i < warps.length; i++)
            {
                gameMap[toIndex(warps[i][0],warps[i][1])] = 66;
            }
            for(let i = 0; i < walls.length; i++)
            {
                gameMap[toIndex(walls[i][0],walls[i][1])] = 0;
            }
            rhythmsToItems(); collectTimerOn(collectionTime);
            keysObtained++; 
            setTileTo(13,8,50); //unlock lobby door
        }

		if(playerX() == 13 && playerY() == 8 && puzzle7Solved)
		{ 
			// //move to new level
            galleryTick = true;
            isGallery = true;
            isPuzzleRoom7 = false;
            comingFrom = 7;
		}
	}
}









function dropPuzzle7()
{

    for(let y = 1; y <= 7; y++)
    {
        for(let x = 3; x <= 12; x++)
        {
            if(y == 1) { gameMap[toIndex(x,y)] = 66; }
            else { gameMap[toIndex(x,y)] = 113; }
        }
    }

    let possiblePuzzle7Combos = 
        [
            [5,6], [5,7], [5,8], [5,3],
            [6,5], [6,7], [6,8], [6,3],
            [7,5], [7,6], [7,8], [7,3],
            [8,5], [8,6], [8,7], [8,3],
            [3,5], [3,6], [3,7], [3,8]
        ];
    
    let thisChoice = scrambleArray(possiblePuzzle7Combos);

    for(let x = 3; x < 13; x++)
    {
        for(let y = 2; y < 8; y++)
        {
            if(y%2 != 0) { gameMap[toIndex(x,y)] = thisChoice[x-3][1] + 110; }
            else { gameMap[toIndex(x,y)] = thisChoice[x-3][0] + 110; }
        }
    }

    puzzle7Tiles = scrambleArray([thisChoice[0],thisChoice[1],thisChoice[2],thisChoice[3],thisChoice[4],
        thisChoice[5],thisChoice[6],thisChoice[7],thisChoice[8],thisChoice[9]]);
    
    gameMap[toIndex(1,2)] = puzzle7Tiles[0][0] + 80;
    gameMap[toIndex(1,3)] = puzzle7Tiles[0][1] + 80;
}


function puzzle7State()
{
    if(gameMap[toIndex(playerX(),playerY()+1)] == puzzle7Tiles[puzzle7TilesSolved][0] + 110 &&
        gameMap[toIndex(playerX(),playerY()+2)] == puzzle7Tiles[puzzle7TilesSolved][1] + 110)
    {
        puzzle7TilesSolved++;
        if(puzzle7TilesSolved == 5)
        {
            playSnd(randomInt(4) + 146); 
            gameMap[toIndex(1,2)] = 1; alphaMap[toIndex(1,2)] = startingAlpha;
            gameMap[toIndex(1,3)] = 1; alphaMap[toIndex(1,3)] = startingAlpha;
            for(let x = 3; x < 13; x++) { gameMap[toIndex(x,1)] = 79; alphaMap[toIndex(x,1)] = startingAlpha; }
        }
        else if(puzzle7TilesSolved <= 4)
        {
            playSnd(randomInt(4) + 146); 
            for(y = 1; y < 8; y++)
            { alphaMap[toIndex(playerX(),y)] = startingAlpha; }
            gameMap[toIndex(1,puzzle7TilesSolved+3)] = 1;
            alphaMap[toIndex(1,puzzle7TilesSolved+3)] = startingAlpha;
            gameMap[toIndex(1,2)] = puzzle7Tiles[puzzle7TilesSolved][0] + 80;
            alphaMap[toIndex(1,2)] = startingAlpha;
            gameMap[toIndex(1,3)] = puzzle7Tiles[puzzle7TilesSolved][1] + 80;
            alphaMap[toIndex(1,3)] = startingAlpha;
        }
    }
    else
    {
        playSnd(135);
    }
}