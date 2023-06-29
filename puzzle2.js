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

function drawPuzzleRoom2()
{
    title = '';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const puzzleRoom2MapW = 14;
    const puzzleRoom2MapH = 9;
    const puzzleRoom2GameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
                                0, 64,64,77,64,64,64,77,64,64,64,77,40,0,
                                0, 64,64,0, 64,64,64,0, 64,64,64,0, 1, 0,
                                0, 64,64,0, 64,64,64,0, 64,64,64,0, 1, 0,
                                0, 74,0, 0, 0, 0, 0, 0, 0, 0, 74,0, 1, 56,
                                0, 64,64,0,64,64,64,0,64,64,64,0, 0, 0,
                                0, 64,64,0, 64,64,64,0, 64,64,64,0, 43,0,
                                0, 64,64,76, 64,64,64,76, 64,64,64,71,1, 0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            
    mapW = puzzleRoom2MapW;
    mapH = puzzleRoom2MapH;
    gameMap = puzzleRoom2GameMap;
     
    resetItemMap();
    resetAlphaMap();

	starting_pos = [12, 4];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

    puzzle2Doors = [randomInt(2)+2, randomInt(2)+2, randomInt(2)+2, randomInt(2)+2, randomInt(2)+2, 4] 

	puzzleRoom2Tick = false;
}



function drawPuzzleRoom2Tiles(currentFrameTime, currentSecond)
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

function processPuzzleRoom2Tiles(tick)
{
	if(tick)
	{
        if(thisTileIs() < 2 || thisTileIs() > 4) { playSnd(gameMap[toIndex(playerX(),playerY())]); } else { playSnd(1); }
        if(puzzle2Solved && collectTime) { 
            pickUpItem(); 
        }

        if(thisTileIs() == 43) { 
            setPlayerTile(1);
            alphaMap[toIndex(12,5)] = startingAlpha;
            updateTextBar("You got a KEY!"); 
            playBgSnd(153,'key2');
            keysObtained++;
            setTileTo(13,4,50); //unlock door
            setTileTo(12,5,58); //unlock lobby door
        }
		// movePlayer(7,12,19,12,true);
		// switchTile(8,9);
		// pickUpItem(2);
		// if(playerX() == 13 && playerY() == 6) { updateTextBar("It reads, \"Sometimes it pays to look backwards.\"")}
		// if(hasCastle1Key == false && thisTileIs() == 7) {updateTextBar("The door appears to be locked.")}
		// if(hasCastle1Key == true && thisTileIs() == 7) { setTileTo(playerX() - 1,playerY(),10); setPlayerTile(11); updateTextBar("You unlocked the door!")}
		if(playerX() == 13 && playerY() == 4 && puzzle2Solved)
		{ 
			// //move to new level
            lobbyTick = true;
            isLobby = true;
            isPuzzleRoom2 = false;
		}
	}
}






function dropPuzzle2()
{

    let x1,x2,y1,y2;

    if(puzzle2MiniRoom == 0) { x1 = 8; x2 = 10; y1 = 1; y2 = 3; }
    if(puzzle2MiniRoom == 1) { x1 = 4; x2 = 6; y1 = 1; y2 = 3; }
    if(puzzle2MiniRoom == 2) { x1 = 1; x2 = 2; y1 = 1; y2 = 3; }
    if(puzzle2MiniRoom == 3) { x1 = 1; x2 = 2; y1 = 5; y2 = 7; }
    if(puzzle2MiniRoom == 4) { x1 = 4; x2 = 6; y1 = 5; y2 = 7; }
    if(puzzle2MiniRoom == 5) { x1 = 8; x2 = 10; y1 = 5; y2 = 7; }

    p2current = [x1,x2,y1,y2];

    fillRoom(x1,x2,y1,y2,64,[2,3,4], true, puzzle2Doors[puzzle2MiniRoom]);

    for(let y = y1; y <= y2; y++)
    {
        for(let x = x1; x <= x2; x++)
        {
            if(gameMap[toIndex(x,y)] == puzzle2Doors[puzzle2MiniRoom])
            {
                puzzle2Tallies[puzzle2MiniRoom]++;
            }
        }
    }

    let nextDoor;
    if(puzzle2MiniRoom <= 4)
    {
        if(puzzle2Doors[puzzle2MiniRoom] == 2) { nextDoor = 73; }
        if(puzzle2Doors[puzzle2MiniRoom] == 3) { nextDoor = 70; }
        if(puzzle2Doors[puzzle2MiniRoom] == 4) { nextDoor = 71; }
    }
    if(puzzle2MiniRoom == 0) { gameMap[toIndex(7,1)] = nextDoor; }
    if(puzzle2MiniRoom == 1) { gameMap[toIndex(3,1)] = nextDoor; }
    if(puzzle2MiniRoom == 2) { gameMap[toIndex(1,4)] = nextDoor; }
    if(puzzle2MiniRoom == 3) { gameMap[toIndex(3,7)] = nextDoor; }
    if(puzzle2MiniRoom == 4) { gameMap[toIndex(7,7)] = nextDoor; }


}

function puzzle2State()
{

    let x1,x2,y1,y2;
    let state = 0;

    if(puzzle2MiniRoom == 0) { x1 = 8; x2 = 10; y1 = 1; y2 = 3; }
    if(puzzle2MiniRoom == 1) { x1 = 4; x2 = 6; y1 = 1; y2 = 3; }
    if(puzzle2MiniRoom == 2) { x1 = 1; x2 = 2; y1 = 1; y2 = 3; }
    if(puzzle2MiniRoom == 3) { x1 = 1; x2 = 2; y1 = 5; y2 = 7; }
    if(puzzle2MiniRoom == 4) { x1 = 4; x2 = 6; y1 = 5; y2 = 7; }
    if(puzzle2MiniRoom == 5) { x1 = 8; x2 = 10; y1 = 5; y2 = 7; }

    for(let y = y1; y <= y2; y++)
    {
        for(let x = x1; x <= x2; x++)
        {
            if(gameMap[toIndex(x,y)] == puzzle2Doors[puzzle2MiniRoom] + 10)
            {
                state++;
            }
        }
    }

    if(state == puzzle2Tallies[puzzle2MiniRoom]) 
    {
        if(puzzle2MiniRoom == 0) { gameMap[toIndex(7,1)] = 60; puzzle2MiniRoom++; dropPuzzle2();playSnd(randomInt(4) + 146); alphaMap[toIndex(7,1)] = startingAlpha; }
        else if(puzzle2MiniRoom == 1) { gameMap[toIndex(3,1)] = 60; puzzle2MiniRoom++; dropPuzzle2(); playSnd(randomInt(4) + 146); alphaMap[toIndex(3,1)] = startingAlpha; }
        else if(puzzle2MiniRoom == 2) { gameMap[toIndex(1,4)] = 59; puzzle2MiniRoom++; dropPuzzle2(); playSnd(randomInt(4) + 146); alphaMap[toIndex(1,4)] = startingAlpha; }
        else if(puzzle2MiniRoom == 3) { gameMap[toIndex(3,7)] = 61; puzzle2MiniRoom++; dropPuzzle2(); playSnd(randomInt(4) + 146); alphaMap[toIndex(3,7)] = startingAlpha; }
        else if(puzzle2MiniRoom == 4) { gameMap[toIndex(7,7)] = 61; puzzle2MiniRoom++; dropPuzzle2(); playSnd(randomInt(4) + 146); alphaMap[toIndex(7,7)] = startingAlpha; }
        else if(puzzle2MiniRoom == 5) { 
            gameMap[toIndex(11,7)] = 1; 
            alphaMap[toIndex(11,7)] = startingAlpha; 
            setTileTo(10,4,58); 
            updateTextBar("The gate unlocked!");

            setTileTo(7,2,60); setTileTo(7,3,60); 
            setTileTo(3,2,60); setTileTo(3,3,60); 
            setTileTo(2,4,59); 
            setTileTo(3,5,61); setTileTo(3,6,61); 
            setTileTo(7,5,61); setTileTo(7,6,61); 
            setTileTo(8,4,58); setTileTo(9,4,58); 
            rhythmsToItems();
            for(let y = 1; y <= 7; y++)
            {
                for(let x = 1; x <= 10; x++)
                {
                    alphaMap[toIndex(x,y)] = startingAlpha;
                }
            }
            puzzle2Solved = true;
            collectTimerOn(collectionTime);
        }
    }
}