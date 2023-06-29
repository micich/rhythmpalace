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

function drawPuzzleRoom3()
{
    title = '';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const puzzleRoom3MapW = 14;
    const puzzleRoom3MapH = 9;
    const puzzleRoom3GameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                0, 43,60,60,60,60,60,60,60,60,60,60,60,0,
                                0, 59,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 58,0,
                                0, 1, 64,64,64,64,64,64,64,64,64,0, 72,0,
                                56,1, 64,64,64,64,64,64,64,64,64,0, 71,0,
                                0, 1, 64,64,64,64,64,64,64,64,64,0, 70,0,
                                0, 1, 64,64,64,64,64,64,64,64,64,0, 1,0,
                                0,40, 64,64,64,64,64,64,64,64,64,1, 1,0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
 
                            
    mapW = puzzleRoom3MapW;
    mapH = puzzleRoom3MapH;
    gameMap = puzzleRoom3GameMap;

    resetItemMap();
    resetAlphaMap();

	starting_pos = [1, 4];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

	puzzleRoom3Tick = false;
}



function drawPuzzleRoom3Tiles(currentFrameTime, currentSecond)
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

function processPuzzleRoom3Tiles(tick)
{
	if(tick)
	{
        if(thisTileIs() < 2 || thisTileIs() > 6) { playSnd(gameMap[toIndex(playerX(),playerY())]); } else { playSnd(1); }
        if(puzzle3Solved && collectTime)
        {
            pickUpItem();
        }

        if(thisTileIs() == 43) { 
            setPlayerTile(1);
            playBgSnd(154,'key3'); 
            updateTextBar("You got a KEY!");
            keysObtained++; 
            setTileTo(0,4,50); //unlock lobby door
        }
		// movePlayer(7,12,19,12,true);
		// switchTile(8,9);
		// pickUpItem(2);
		// if(playerX() == 13 && playerY() == 6) { updateTextBar("It reads, \"Sometimes it pays to look backwards.\"")}
		// if(hasCastle1Key == false && thisTileIs() == 7) {updateTextBar("The door appears to be locked.")}
		// if(hasCastle1Key == true && thisTileIs() == 7) { setTileTo(playerX() - 1,playerY(),10); setPlayerTile(11); updateTextBar("You unlocked the door!")}
		if(playerX() == 0 && playerY() == 4 && puzzle3Solved)
		{ 
			// //move to new level
            lobbyTick = true;
            isLobby = true;
            isPuzzleRoom3 = false;
		}
	}
}



function dropPuzzle3()
{
    let i = 0;
    let thisPuzzle = [];
    let choices = [
        [78,3, 84,86,78,84,3, 84,86,
        3,84,86,78, 84,86,78,86,84,
        78,78,3, 3,86,78,3, 78,3,
        78,3, 84,78, 78,3, 78,84,86,
        84,86,86,78,3, 86,84,78,78],
        [84,86,86,78,3, 86,84,84,86,
        78,3, 84,78, 78,3, 78,84,86,
        78,78,3, 3,86,78,3, 78,3,
        3,84,86,78, 84,86,78,86,84,
        78,3, 84,86,78,84,3, 78,78],
        [84,86,78,84,86,3, 78,86,86,
            78,86,84,78,3, 78,3, 78,3,
            78,3, 78,3, 84,86,78,3, 78,
            78,84,86,78,86,84,3, 86,84,
            78,3, 84,3, 84,78,84,86,78],
        [78,3, 84,3, 84,86,84,86,78,
            78,84,86,78,86,84,3, 86,84,
            78,3, 78,3, 84,86,78,3, 78,
            78,86,84,78,3, 78,3, 78,3,
            84,86,78,84,86,3, 78,86,78]
    ]
    let r = randomInt(3);
    thisPuzzle = choices[r];
    console.log(r);

    for(let y = 3; y <= 7; y++)
    {
        for(let x = 2; x <= 10; x++)
        {
            gameMap[toIndex(x,y)] = thisPuzzle[i];
            i++;
        }
    }
}


function puzzle3State()
{
    let state = 0;
    if(!puzzle3TilesUnlocked[0])
    {
        for(let x = 2; x <= 10; x++)
        {
            for(let y = 3; y <= 7; y++)
            {
                if(gameMap[toIndex(x,y)] == 13) //red quarter
                { state++; }
            }
        }
        if(state == 10)
        {
            playSnd(randomInt(4) + 146);
            puzzle3TilesUnlocked[0] = true;
            setTileTo(12,5,1);
            alphaMap[toIndex(12,5)] = startingAlpha;
            swapTiles(84,4);
        }
    }
    else if(!puzzle3TilesUnlocked[1])
    {
        for(let x = 2; x <= 10; x++)
        {
            for(let y = 3; y <= 7; y++)
            {
                if(gameMap[toIndex(x,y)] == 14) //red eighth
                { state++; }
            }
        }
        if(state == 10)
        {
            playSnd(randomInt(4) + 146);
            puzzle3TilesUnlocked[1] = true;
            setTileTo(12,4,1);
            alphaMap[toIndex(12,4)] = startingAlpha;
            swapTiles(86,6);
        }   
    }
    else if(!puzzle3TilesUnlocked[2])
    {
        for(let x = 2; x <= 10; x++)
        {
            for(let y = 3; y <= 7; y++)
            {
                if(gameMap[toIndex(x,y)] == 16) //red quarter
                { state++; }
            }
        }
        if(state == 10)
        {
            // playSnd(43);
            setTileTo(12,3,58); setTileTo(12,4,58); setTileTo(12,5,58); setTileTo(12,6,58);
            for(let i = 3; i < 7; i++)
            { alphaMap[toIndex(12,i)] = startingAlpha; }
            puzzle3TilesUnlocked[2] = true;
            puzzle3Solved = true;
            //clear walls and activate alpha channel
            for(let x = 2; x <= 10; x++)
            {
                for(let y = 3; y <= 7; y++)
                {
                    if(gameMap[toIndex(x,y)] == 78) {
                        gameMap[toIndex(x,y)] = chooseFrom([3,4,6]);
                    }
                    alphaMap[toIndex(x,y)] = startingAlpha;
                }
            }
            rhythmsToItems();
            collectTimerOn(collectionTime);
        } 
    }
    // if(gameMap[toIndex(2,2)] == 41 && state == puzzle3Tiles.length) { 
    //     setTileTo(2,7,1); setTileTo(2,2,1); 
    //     updateTextBar("The gate unlocked!");
    //     puzzle3Solved = true;

}