function drawPuzzleRoom5()
{
    title = '';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const puzzleRoom5MapW = 14;
    const puzzleRoom5MapH = 9;
    const puzzleRoom5GameMap = [0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0, 0,
                                0, 43,0,  64, 64, 64, 64, 64, 64, 64, 64, 0, 1, 0,
                                0, 1, 0,  64, 64, 64, 64, 64, 64, 64, 64, 0, 1, 0,
                                0, 1, 0,  64, 64, 64, 64, 64, 64, 64, 64, 0, 1, 0,
                                0, 1, 1,  64, 64, 64, 64, 64, 64, 64, 64, 0, 1, 56,
                                0, 0, 0,  64, 64, 64, 64, 64, 64, 64, 64, 0, 1, 0,
                                0, 0, 0,  64, 64, 64, 64, 64, 64, 64, 64, 0, 1, 0,
                                0, 0, 0,  64, 64, 64, 64, 64, 64, 64, 64, 40, 1, 0,
                                0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 0, 0];
                            
    mapW = puzzleRoom5MapW;
    mapH = puzzleRoom5MapH;
    gameMap = puzzleRoom5GameMap;


    //decide map in advance
    let choice1 = [
        78, 83, 78, 5,  104,83, 78, 4,  
        85, 78, 83, 78, 85, 78, 83, 78, 
        78, 85, 104,83, 78, 4,  78, 83,  
        85, 78, 4,  78, 85, 78, 4,  78, 
        78, 4,  78, 85, 104,4,  78, 83,  
        83, 78, 4,  78, 83, 78, 85, 78, 
        78, 83, 104,83, 78, 85, 78, 104
    ];
    let choice2 = [
        78, 83, 104,83, 78, 85, 78, 104,
        83, 78, 4,  78, 83, 78, 85, 78, 
        78, 4,  78, 85, 104,4,  78, 83, 
        85, 78, 4,  78, 85, 78, 4,  78,  
        78, 85, 104,83, 78, 4,  78, 83, 
        85, 78, 83, 78, 85, 78, 83, 78,   
        78, 83, 78, 5,  104,83, 78, 4    
    ];
    
    let r = randomInt(1);
    if(r == 0) 
    { puzzle5Map = choice1; } 
    else 
    { 
        puzzle5Map = choice2; 
        setTileTo(1,1,0);
        setTileTo(1,2,0);
        setTileTo(1,3,0);
        setTileTo(1,5,1);
        setTileTo(1,6,1);
        setTileTo(1,7,43);
        setTileTo(11,1,40);
        setTileTo(11,7,0);
    }


    resetItemMap();
    resetAlphaMap();

	starting_pos = [12, 4];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);



	puzzleRoom5Tick = false;
}



function drawPuzzleRoom5Tiles(currentFrameTime, currentSecond)
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

            if(alphaMap[toIndex(x,y)] > 0.0) 
            { 
                alphaMap[toIndex(x,y)] -= alphaReduction;
                ctx.fillStyle = `rgba(244,125,96,${alphaMap[toIndex(x,y)]})`;
                ctx.fillRect(x*tileW, y*tileH + (tileH), tileW, tileH);  
            } 
            else { alphaMap[toIndex(x,y)] = 0.0; } 
                    

		}
	}

	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		player.position[0], player.position[1]  + (tileH),
		player.dimensions[0], player.dimensions[1])

}

function processPuzzleRoom5Tiles(tick)
{
	if(tick)
	{
        //unlock "reward phase" & end
        if(gotPuzzle5Key && thisTileIs() == 41 && !puzzle5RoomSwitched) 
        { 
            setPlayerTile(1);
            for(let x = 3; x <= 10; x++)
            {
                for(let y = 1; y <= 7; y++)
                {
                    if(x == 3 || x == 10)
                    { 
                        if(gameMap[toIndex(x,y)] >= 102 && gameMap[toIndex(x,y)] <= 105) { gameMap[toIndex(x,y)] -= 100; }
                        else if(gameMap[toIndex(x,y)] >= 82 && gameMap[toIndex(x,y)] <= 85) { gameMap[toIndex(x,y)] -= 80; }
                        else if(gameMap[toIndex(x,y)] == 78) { gameMap[toIndex(x,y)] = randomInt(3) + 2; }
                    }
                    else 
                    { 
                        if(gameMap[toIndex(x,y)] >= 102 && gameMap[toIndex(x,y)] <= 105) { gameMap[toIndex(x,y)] += 10; }
                        else if(gameMap[toIndex(x,y)] >= 82 && gameMap[toIndex(x,y)] <= 85) { gameMap[toIndex(x,y)] += 30; }
                        else if(gameMap[toIndex(x,y)] >= 2 && gameMap[toIndex(x,y)] <= 5) { gameMap[toIndex(x,y)] += 110; }
                        else if(gameMap[toIndex(x,y)] == 78) { gameMap[toIndex(x,y)] = randomInt(3) + 112; }
                    }

                    alphaMap[toIndex(x,y)] = startingAlpha; 
                }
            }
            rhythmsToItems();
            clearTextBar();
            puzzle5Solved = true;
            puzzle5RoomSwitched = true;
            collectTimerOn(collectionTime);
        }
        if(puzzle5RoomSwitched && collectTime) { pickUpItem(); }
        if(thisTileIs() == 43) { 
            playSnd(43);
            setPlayerTile(1); 
            playBgSnd(157,'key5');
            updateTextBar("You got a KEY! But the room has shifted...");
            //CHANGE ROOM ORDER
            let mapI = puzzle5Map.length-1;
            for(let y = 1; y <= 7; y++)
            {
                for(let x = 3; x <= 10; x++)
                {
                    alphaMap[toIndex(x,y)] = startingAlpha;
                    gameMap[toIndex(x,y)] = puzzle5Map[mapI];
                    mapI--;
                } 
            }
            gotPuzzle5Key = true;
            keysObtained++; 
            setTileTo(13,4,50); //unlock lobby door
        }
		// movePlayer(7,12,19,12,true);
		// switchTile(8,9);
		// pickUpItem(2);
		// if(playerX() == 13 && playerY() == 6) { updateTextBar("It reads, \"Sometimes it pays to look backwards.\"")}
		// if(hasCastle1Key == false && thisTileIs() == 7) {updateTextBar("The door appears to be locked.")}
		// if(hasCastle1Key == true && thisTileIs() == 7) { setTileTo(playerX() - 1,playerY(),10); setPlayerTile(11); updateTextBar("You unlocked the door!")}
		if(playerX() == 13 && playerY() == 4 && puzzle5Solved)
		{ 
			// //move to new level
            galleryTick = true;
            isGallery = true;
            isPuzzleRoom5 = false;
            comingFrom = 5;
		}
	}
}









function dropPuzzle5()
{

    let mapI = 0;
    for(let y = 1; y <= 7; y++)
    {
        for(let x = 3; x <= 10; x++)
        {
            gameMap[toIndex(x,y)] = puzzle5Map[mapI];
            mapI++;
        } 
    }

}


function puzzle5State(tile)
{
    if(tile == 103)
    {
        playSnd(13);
        swapTiles(105,103);
        swapTiles(83,3);
        swapTiles(4,84);
        swapTiles(5,85);
    }
    else if(tile == 104)
    {
        playSnd(14);
        swapTiles(103,104);
        swapTiles(3,83);
        swapTiles(84,4);
        swapTiles(5,85);
    }
    else if(tile == 105)
    {
        playSnd(15);
        swapTiles(104,105);
        swapTiles(3,83);
        swapTiles(4,84);
        swapTiles(85,5);      
    }
}