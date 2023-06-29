

function drawTowerStairs()
{

    // gameEnd = true; //JUST FOR TEST
    // endTime = Date.now();

    title = 'Tower Stairs';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const towerStairsMapW = 9;
    const towerStairsMapH = 9;
    var towerStairsGameMap;
    
    if(towerFloorNumber == 1)
    {
        starting_pos = [4,6];
        towerStairsGameMap = [
            46,46,0,0, 0, 0, 0,46,46,
            46,0,0, 0, 56, 0, 0, 0,46,
            0,0, 0, 0, 52, 0, 0, 0, 0,
            0, 0, 0, 0, 52, 0, 0, 0, 0,
            0, 0, 64,64,109,64,64,0, 0,
            0, 0, 64,64,107,64,64,0, 0,
            0,0, 0, 45, 1, 1, 0, 0, 0,
            46,0,0, 0, 56,0, 0, 0,46,
            46,46,0,0, 0, 0, 0,46,46
        ];
    } 

    else if(towerFloorNumber == 2) { 
    starting_pos = [6,3];
    towerStairsGameMap = [
        46,46, 0, 0, 0,  0, 0, 46, 46,
        46,0,  0, 1, 50, 0, 0, 0,  46,
        0, 0,  0, 1, 0,  0, 56,0,  0,
        0, 136, 1, 1, 1,  65,1, 0,  0, 
        0, 1,  0, 52, 0,  0, 52,0,  0,
        0, 1,  65,1, 0,  0, 1, 136,0, 
        0, 0,  0, 1, 0,  1, 1, 0,  0,
        46,0,  0, 1, 111,1, 0, 0,  46,
        46,46, 0, 0, 0,  0, 0, 46, 46];
    }

    else if(towerFloorNumber == 3)
    {
        starting_pos = [4,2];
        towerStairsGameMap = [
            46,46,0,0, 0, 0, 0,46,46,
            46,0,0, 0, 56,0, 0, 0,46,
            0,0, 0, 1, 1, 1, 0, 0, 0,
            0, 0, 64,64,107,64,64,0, 0,
            0, 0, 64,64,109,64,64,0, 0,
            0, 0, 0, 0, 52,0, 0, 0, 0,
            0,0, 0, 0, 52,0, 0, 0, 0,
            46,0,0, 0, 56,0, 0, 0,46,
            46,46,0,0, 0, 0, 0,46,46,
        ];    
    } 

    else if(towerFloorNumber == 4){
    starting_pos = [2,4];
    towerStairsGameMap = [
        46,46,0, 0, 0,  0, 0,  46,46,
        46,0, 0, 1, 1, 1, 0,  0, 46,
        0, 0, 50,1, 0,  1, 0,  65,0,
        0, 0, 0, 1, 65,  1, 136,1, 0,
        0, 56,1, 0, 0,  0, 52, 0, 0,
        0, 0, 1, 1, 65, 1, 136,1, 0,
        0, 0, 0, 1, 0,  1, 0,  0, 0,
        46,0, 0, 1, 1,  1, 0,  0, 46,
        46,46,0, 0, 0,  0, 0,  46,46];
    }

    else if(towerFloorNumber == 5)
    { 
        starting_pos = [2,4]; 
        towerStairsGameMap = [
            46,46,0, 0,  0,  0,  0, 46,46,
            46,0, 0, 1,  64, 64, 0, 0, 46,
            0, 0, 0, 1,  64, 64, 0, 0, 0,
            0, 0, 45,1,  64, 64, 0, 0, 0,
            0, 56,1, 107,109,109,111, 56,0,
            0, 0, 1, 1,  64, 64, 0, 0, 0,
            0, 0, 0, 1,  64, 64, 0, 0, 0,
            46,0, 0, 1,  64, 64, 0, 0, 46,
            46,46,0, 0,  0,  0,  0, 46,46,
        ];    
    } 

    else if(towerFloorNumber == 6) {
    starting_pos = [5,6];
    towerStairsGameMap = [
        46, 46, 0,  0,  0,  0,  0,  46, 46,
        46, 0,  0,  0,  0,  1, 0,  0,  46,
        0,  0,  1,  136,111,1,  1,  0,  0,
        0,  1,  1,  65, 0,  65, 1, 0,  0, 
        0,  0,  52, 0,  0,  0,  136, 50, 0,
        0,  0,  1,  136,0,  0,  0,  0,  0, 
        0,  0,  65, 1,  111,1,  56, 0,  0,
        46, 0,  0,  0,  0,  136,0,  0,  46,
        46, 46, 0,  0,  0,  0,  0,  46, 46];
    }
    
    else if(towerFloorNumber == 7)
    { 
        starting_pos = [6,4]; 
        towerStairsGameMap = [
            46,46,0, 0,  0,  0,  0, 46,46,
            46,0, 0, 64, 64, 1,  0, 0, 46,
            0, 0, 0, 64, 64, 1,  0, 0, 0,
            0, 0, 0, 64, 64, 1,  0, 0, 0,
            0, 56,111,109,109,107,1, 56,0,
            0, 0, 0, 64, 64, 1,  0, 0, 0,
            0, 0, 0, 64, 64, 1,  0, 0, 0,
            46,0, 0, 64, 64, 1,  0, 0, 46,
            46,46,0, 0,  0,  0,  0, 46,46,
        ];    
    } 

    mapW = towerStairsMapW;
    mapH = towerStairsMapH;
    gameMap = towerStairsGameMap;
    // if(towerFloorNumber == 1) { gameMap[toIndex(3,6)] = 45; }

    for(let x = 0; x < mapW; x++)
    {
        for(let y = 0; y < mapH; y++)
        {
            alphaMap[toIndex(x,y)] = startingAlpha;
        }
    }

    resetAlphaMap();
    resetItemMap();
    dropGuards('towerstairs');
    if(towerFloorNumber == 2) { setItemTo(1,5,randomInt(5)+3); }
    if(towerFloorNumber == 4) { setItemTo(7,5,randomInt(5)+3); }//7,5
    if(towerFloorNumber == 6) { setItemTo(5,1,randomInt(5)+3); }//5,1


	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

	towerStairsTick = false;

}



function drawTowerStairsTiles(currentFrameTime, currentSecond)
{
    if((currentFrameTime % towerStairsDrawSpeed <= 50) && 
    towerStairsPuzzleActive && clickTick)
    {
        if(towerFloorNumber <= 3)
        {
            //13,5
            if(towerStairsPuzzleTick == 1) { 
                gameMap[toIndex(4,4)] = 110;
                towerStairsPuzzleTick = 0;
                clickTick = false;
                playSnd(towerStairsSolution+170);
                setTimeout(() => { clickTick = true; }, 200);
            }
            else if(towerStairsPuzzleTick == 0)
            {
                gameMap[toIndex(4,4)] = 109;
                towerStairsPuzzleTick = 1;
                clickTick = false;
                setTimeout(() => { clickTick = true; }, 200);
            }      
        }
        else if(towerFloorNumber == 5)
        {
            if(towerStairsPuzzleTick == 1) { 
                gameMap[toIndex(4,4)] = 110;
                gameMap[toIndex(5,4)] = 109;
                towerStairsPuzzleTick = 0;
                clickTick = false;
                playSnd(towerStairsSolution[0]+170);
                setTimeout(() => { clickTick = true; }, 200);
            }
            else if(towerStairsPuzzleTick == 0)
            {
                gameMap[toIndex(5,4)] = 110;
                gameMap[toIndex(4,4)] = 109;
                playSnd(towerStairsSolution[1]+170);
                towerStairsPuzzleTick = 1;
                clickTick = false;
                setTimeout(() => { clickTick = true; }, 200);
            } 
        }
        else if(towerFloorNumber == 7)
        {
            if(towerStairsPuzzleTick == 1) { 
                gameMap[toIndex(3,4)] = 110;
                gameMap[toIndex(4,4)] = 109;
                towerStairsPuzzleTick = 0;
                clickTick = false;
                playSnd(towerStairsSolution[0]+170);
                setTimeout(() => { clickTick = true; }, 200);
            }
            else if(towerStairsPuzzleTick == 0)
            {
                gameMap[toIndex(4,4)] = 110;
                gameMap[toIndex(3,4)] = 109;
                playSnd(towerStairsSolution[1]+170);
                towerStairsPuzzleTick = 1;
                clickTick = false;
                setTimeout(() => { clickTick = true; }, 200);
            } 
        }
    }

	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
			//draw gameMap
			var tile = tileTypes[gameMap[toIndex(x,y)]];
			ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				x*tileW + stairsXOffset, y*tileH + (tileH*2) - stairsYOffset, tileW, tileH);
            // ctx.fillText(gameMap[toIndex(x,y)],x*tileW + stairsXOffset, y*tileH + (tileH*3) - stairsYOffset)


            //itemMap could go here if needed
            //itemMap
            if(itemMap[toIndex(x,y)] >= 2)
            {
                var item = itemTypes[itemMap[toIndex(x,y)]];
                ctx.drawImage(tileset, item.sprite[0].x, item.sprite[0].y, item.sprite[0].w, item.sprite[0].h,
                    x*tileW + stairsXOffset, y*tileH + (tileH*2) - stairsYOffset, tileW, tileH);
            }

            //draw glowing tiles (if puzzle solved)
            // if(towerStairsSolved && gameMap[toIndex(x,y)] >= 2 && gameMap[toIndex(x,y)] <= 4)
            // {
            //     if(alphaMap[toIndex(x,y)] > 0.0) { alphaMap[toIndex(x,y)] -= alphaReduction;
            //     ctx.fillStyle = `rgba(244,125,96,${alphaMap[toIndex(x,y)]})`;
            //     ctx.fillRect(x*tileW  + stairsXOffset, y*tileH + (tileH*2)  - stairsYOffset, tileW, tileH); }
            //     else { alphaMap[toIndex(x,y)] = 0.0; }
            // }
            // else
            // {
            if(alphaMap[toIndex(x,y)] > 0.0) { 
                alphaMap[toIndex(x,y)] -= alphaReduction;
                ctx.fillStyle = `rgba(244,125,96,${alphaMap[toIndex(x,y)]})`;
                ctx.fillRect(x*tileW  + stairsXOffset, y*tileH + (tileH*2) - stairsYOffset, tileW, tileH);  
            } 
            else { alphaMap[toIndex(x,y)] = 0.0; } 
            // }   

		}
	}

    drawGuards(stairsXOffset,(tileH*2-stairsYOffset));

	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		player.position[0] + stairsXOffset, player.position[1]  + (tileH*2) - stairsYOffset,
		player.dimensions[0], player.dimensions[1])

}

function processTowerStairsTiles(tick)
{
	if(tick)
	{
        if(thisTileIs() >= 3 && thisTileIs() <= 21) { player.delayMove = 500; } else { player.delayMove = 250; }
        if(thisTileIs() >= 3 && thisTileIs() <= 21) {
            playSnd(gameMap[toIndex(playerX(),playerY())] + 160);
        }
        else { playSnd(gameMap[toIndex(playerX(),playerY())]); }

        pickUpItem();
        // //Alpha
        // if(towerStairsSolved && playerX() >= 3 && playerX() <= 12 && 
        //     playerY() >= 1 && playerY() <= 7) 
        //     { 
        //         alphaMap[toIndex(playerX(),playerY())] = startingAlpha; 
        //     }

        if(thisTileIs() == 45) { 
            if(towerFloorNumber == 1) { updateTextBar('Listen to the mystery rhythm and highlight the tile that matches it.'); }
            if(towerFloorNumber == 5) { updateTextBar('Listen to the mystery pattern and highlight the group that matches it.'); }
        }

        //move to new level
        if(thisTileIs() == 50)
        { 
            if(towerFloorNumber < 7) { towerStairsTick = true; towerFloorNumber++; towerStairsSolved = false; }
            else { isTowerStairs = false; isTower = true; towerTick = true; towerStairsSolved = true; }
        }

	}
}









function dropTowerStairsPuzzle()
{
    //need code in MAIN GAME LOOP that writes the "solution" tiles to each of the 4 stair levels.
    //TRIGGER AUDIO LOOP ASSOCIATED WITH SOLUTION
    if(towerFloorNumber == 1 || towerFloorNumber == 3)
    {
        towerStairsSolution = randomInt(5) + 3; 
        let possibleTiles = [];
        let scrambledTiles = [];
    
        // gameMap[toIndex(4,4)] = solution; //for testing
        // gameMap[toIndex(4,4)] = 110;
        towerStairsPuzzleActive = true;
        clickTick = true;
    
        for(let i = 2; i <= 10; i++)
        {
            if(i != towerStairsSolution) { possibleTiles.push(i); }
        }
    
        scrambledTiles = scrambleArray(possibleTiles);
        
        let r = randomInt(7);
        scrambledTiles[r] = towerStairsSolution;
        
        if(towerFloorNumber == 1)
        {
            setTileTo(2,4,scrambledTiles[0]);
            setTileTo(3,4,scrambledTiles[1]);
            setTileTo(2,5,scrambledTiles[2]);
            setTileTo(3,5,scrambledTiles[3]);
            setTileTo(5,4,scrambledTiles[4]);
            setTileTo(6,4,scrambledTiles[5]);
            setTileTo(5,5,scrambledTiles[6]);
            setTileTo(6,5,scrambledTiles[7]);
        }
        else
        {
            setTileTo(2,4,scrambledTiles[0]);
            setTileTo(3,4,scrambledTiles[1]);
            setTileTo(2,3,scrambledTiles[2]);
            setTileTo(3,3,scrambledTiles[3]);
            setTileTo(5,4,scrambledTiles[4]);
            setTileTo(6,4,scrambledTiles[5]);
            setTileTo(5,3,scrambledTiles[6]);
            setTileTo(6,3,scrambledTiles[7]);   
        }
    }
    else if(towerFloorNumber == 5)
    {

        gameMap[toIndex(3,1)] = 134;
        gameMap[toIndex(3,2)] = 134;
        gameMap[toIndex(3,3)] = 134;
        gameMap[toIndex(3,4)] = 108;
        gameMap[toIndex(3,5)] = 134;
        gameMap[toIndex(3,6)] = 134;
        gameMap[toIndex(3,7)] = 134;

        //animation will be needed
        // gameMap[toIndex(4,4)] = 110;
        towerStairsPuzzleActive = true;
        clickTick = true;

        towerStairsSolution = [randomInt(5) + 3, randomInt(5) + 3];
        let possibleTiles = [];
        let scrambledTiles = [];

    
        for(let i = 3; i < 12; i++)
        {
            if(i != towerStairsSolution[0]) { possibleTiles.push([i, randomInt(5) + 3]); }
        }
    
        scrambledTiles = scrambleArray(possibleTiles);
        scrambledTiles.pop();
        scrambledTiles.pop();
        
        let r = randomInt(5);
        scrambledTiles[r] = towerStairsSolution;

        setTileTo(4,1,scrambledTiles[0][0]); setTileTo(5,1,scrambledTiles[0][1]); 
        setTileTo(4,2,scrambledTiles[1][0]); setTileTo(5,2,scrambledTiles[1][1]); 
        setTileTo(4,3,scrambledTiles[2][0]); setTileTo(5,3,scrambledTiles[2][1]); 
        setTileTo(4,5,scrambledTiles[3][0]); setTileTo(5,5,scrambledTiles[3][1]); 
        setTileTo(4,6,scrambledTiles[4][0]); setTileTo(5,6,scrambledTiles[4][1]); 
        setTileTo(4,7,scrambledTiles[5][0]); setTileTo(5,7,scrambledTiles[5][1]); 
    }
    else if(towerFloorNumber == 7)
    {

        gameMap[toIndex(5,1)] = 134;
        gameMap[toIndex(5,2)] = 134;
        gameMap[toIndex(5,3)] = 134;
        gameMap[toIndex(5,4)] = 108;
        gameMap[toIndex(5,5)] = 134;
        gameMap[toIndex(5,6)] = 134;
        gameMap[toIndex(5,7)] = 134;

        //animation will be needed
        // gameMap[toIndex(3,4)] = 110;
        towerStairsPuzzleActive = true;
        clickTick = true;

        towerStairsSolution = [randomInt(5) + 3, randomInt(5) + 3];
        let possibleTiles = [];
        let scrambledTiles = [];

    
        for(let i = 3; i < 12; i++)
        {
            if(i != towerStairsSolution[0]) { possibleTiles.push([i, randomInt(5) + 3]); }
        }
    
        scrambledTiles = scrambleArray(possibleTiles);
        scrambledTiles.pop();
        scrambledTiles.pop();
        
        let r = randomInt(5);
        scrambledTiles[r] = towerStairsSolution;

        setTileTo(3,1,scrambledTiles[0][0]); setTileTo(4,1,scrambledTiles[0][1]); 
        setTileTo(3,2,scrambledTiles[1][0]); setTileTo(4,2,scrambledTiles[1][1]); 
        setTileTo(3,3,scrambledTiles[2][0]); setTileTo(4,3,scrambledTiles[2][1]); 
        setTileTo(3,5,scrambledTiles[3][0]); setTileTo(4,5,scrambledTiles[3][1]); 
        setTileTo(3,6,scrambledTiles[4][0]); setTileTo(4,6,scrambledTiles[4][1]); 
        setTileTo(3,7,scrambledTiles[5][0]); setTileTo(4,7,scrambledTiles[5][1]); 
    }


}


function towerStairsState()
{

    if(towerFloorNumber == 1 || towerFloorNumber == 3)
    {
        if(thisTileIs() == towerStairsSolution && !towerStairsSolved)
        { 
            clearTextBar();
            setPlayerTile(towerStairsSolution + 10);
            towerStairsIncorrectGuesses = 0;
            towerStairsSolved = true; 
            towerStairsAlphaPing();
            playSnd(randomInt(4) + 146);
            
            towerStairsPuzzleActive = false;
            gameMap[toIndex(4,4)] = towerStairsSolution + 10; 
            if(towerFloorNumber == 1) { gameMap[toIndex(4,1)] = 50; gameMap[toIndex(4,5)] = 1; }
            else { gameMap[toIndex(4,7)] = 50; gameMap[toIndex(4,3)] = 1; }
        }
        else
        {
            if(!towerStairsSolved)
            {
                let y1, y2, y3, p;
                if(towerFloorNumber == 1) { 
                    y1 = 3;
                    y2 = 4;
                    y3 = 5;
                    p = 6;
                }
                else if(towerFloorNumber == 3) {
                    y1 = 5;
                    y2 = 4;
                    y3 = 3;
                    p = 2;
                }
                towerStairsIncorrectGuesses++;
                if(towerStairsIncorrectGuesses == 1) { setTileTo(2,y1,133); playSnd(135); }
                if(towerStairsIncorrectGuesses == 2) { setTileTo(3,y1,133); playSnd(135); }
                if(towerStairsIncorrectGuesses == 3) { setTileTo(5,y1,133); playSnd(135); }
                if(towerStairsIncorrectGuesses == 4) { setTileTo(6,y1,133); playSnd(135); }
                if(towerStairsIncorrectGuesses == 5) { 
                    setTileTo(4,y3,107);
                    setTileTo(4,y2,109);
                    setTileTo(2,y1,0); setTileTo(3,y1,0); setTileTo(5,y1,0); setTileTo(6,y1,0);
                    setTileTo(6,y1,0); setTileTo(3,y1,0); setTileTo(5,y1,0); setTileTo(6,y1,0);
                    setTileTo(2,y2,64);
                    setTileTo(3,y2,64);
                    setTileTo(2,y3,64);
                    setTileTo(3,y3,64);
                    setTileTo(5,y2,64);
                    setTileTo(6,y2,64);
                    setTileTo(5,y3,64);
                    setTileTo(6,y3,64);
                    towerStairsSolution = 0;
                    towerStairsIncorrectGuesses = 0;
                    updateTextBar('Too many guesses! The puzzle reset.');
                    playSnd(144); playSnd(138);
                    towerStairsPuzzleActive = false;
                    
                    movePlayerToTile(4,p);
                    for(let x = 0; x < mapW; x++)
                    {
                        for(let y = 0; y < mapH; y++)
                        {
                            alphaMap[toIndex(x,y)] = startingAlpha;
                        }
                    }
                }
            }
        }

    }
    else if(towerFloorNumber == 5)
    {
        if(thisTileIs() == 134)
        {
            if(gameMap[toIndex(playerX()+1,playerY())] == towerStairsSolution[0] &&
                gameMap[toIndex(playerX()+2,playerY())] == towerStairsSolution[1])
            { 
                clearTextBar();
                setPlayerTile(41);
                towerStairsIncorrectGuesses = 0;
                towerStairsSolved = true; 
                playSnd(randomInt(4) + 146);
                towerStairsPuzzleActive = false;
                
                towerStairsAlphaPing();
                gameMap[toIndex(4,4)] = towerStairsSolution[0] + 10; 
                gameMap[toIndex(5,4)] = towerStairsSolution[1] + 10;
                gameMap[toIndex(7,4)] = 50;
                for(let y = 1; y < 8; y++) { gameMap[toIndex(3,y)] = 134; }
                setPlayerTile(41);
                setTileTo(3,4,41);
                setTileTo(playerX()+1,playerY(),gameMap[toIndex(playerX()+1,playerY())]+10);
                setTileTo(playerX()+2,playerY(),gameMap[toIndex(playerX()+2,playerY())]+10);
            }
            else if(!towerStairsSolved)
            {
                towerStairsIncorrectGuesses++;
                if(towerStairsIncorrectGuesses == 1) { setTileTo(3,0,133); setPlayerTile(135); playSnd(135); }
                if(towerStairsIncorrectGuesses == 2) { setTileTo(4,0,133); setPlayerTile(135); playSnd(135); }
                if(towerStairsIncorrectGuesses == 3) { setTileTo(5,0,133); setPlayerTile(135); playSnd(135); }
                if(towerStairsIncorrectGuesses == 4) { 
                    gameMap = [
                        46,46,0, 0,  0,  0,  0, 46,46,
                        46,0, 0, 1,  64, 64, 0, 0, 46,
                        0, 0, 0, 1,  64, 64, 0, 0, 0,
                        0, 0, 45,1,  64, 64, 0, 0, 0,
                        0, 56,1, 107,109,109,111, 56,0,
                        0, 0, 1, 1,  64, 64, 0, 0, 0,
                        0, 0, 0, 1,  64, 64, 0, 0, 0,
                        46,0, 0, 1,  64, 64, 0, 0, 46,
                        46,46,0, 0,  0,  0,  0, 46,46,
                    ];  
                    towerStairsSolution = [];
                    towerStairsIncorrectGuesses = 0;
                    updateTextBar('Too many guesses! The puzzle reset.');
                    playSnd(144); playSnd(138);
                    towerStairsPuzzleActive = false;
                    
                    movePlayerToTile(2,4);
                    for(let x = 0; x < mapW; x++)
                    {
                        for(let y = 0; y < mapH; y++)
                        {
                            alphaMap[toIndex(x,y)] = startingAlpha;
                        }
                    }
                }
            }
        } 
    }
    else if(towerFloorNumber == 7)
    {
        if(thisTileIs() == 134)
        {
            if(gameMap[toIndex(playerX()-2,playerY())] == towerStairsSolution[0] &&
                gameMap[toIndex(playerX()-1,playerY())] == towerStairsSolution[1])
            { 
                clearTextBar();
                setPlayerTile(41);
                towerStairsIncorrectGuesses = 0;
                towerStairsSolved = true; 
                playSnd(randomInt(4) + 146);
                towerStairsPuzzleActive = false;
                
                towerStairsAlphaPing();
                gameMap[toIndex(3,4)] = towerStairsSolution[0] + 10; 
                gameMap[toIndex(4,4)] = towerStairsSolution[1] + 10;
                gameMap[toIndex(1,4)] = 50;
                for(let y = 1; y < 8; y++) { gameMap[toIndex(5,y)] = 134; }
                setPlayerTile(41);
                setTileTo(5,4,41);
                setTileTo(playerX()-2,playerY(),gameMap[toIndex(playerX()-2,playerY())]+10);
                setTileTo(playerX()-1,playerY(),gameMap[toIndex(playerX()-1,playerY())]+10);
            }
            else if(!towerStairsSolved)
            {
                towerStairsIncorrectGuesses++;
                if(towerStairsIncorrectGuesses == 1) { setTileTo(3,0,133); setPlayerTile(135); playSnd(135); }
                if(towerStairsIncorrectGuesses == 2) { setTileTo(4,0,133); setPlayerTile(135); playSnd(135); }
                if(towerStairsIncorrectGuesses == 3) { setTileTo(5,0,133); setPlayerTile(135); playSnd(135); }
                if(towerStairsIncorrectGuesses == 4) { 
                    gameMap = [
                        46,46,0, 0,  0,  0,  0, 46,46,
                        46,0, 0, 64, 64, 1,  0, 0, 46,
                        0, 0, 0, 64, 64, 1,  0, 0, 0,
                        0, 0, 0, 64, 64, 1,  0, 0, 0,
                        0, 56,111,109,109,107,1, 56,0,
                        0, 0, 0, 64, 64, 1,  0, 0, 0,
                        0, 0, 0, 64, 64, 1,  0, 0, 0,
                        46,0, 0, 64, 64, 1,  0, 0, 46,
                        46,46,0, 0,  0,  0,  0, 46,46,
                    ]; 
                    towerStairsSolution = [];
                    towerStairsIncorrectGuesses = 0;
                    
                    updateTextBar('Too many guesses! The puzzle reset.');
                    playSnd(144); playSnd(138);
                    towerStairsPuzzleActive = false;
                    
                    movePlayerToTile(6,4);
                    for(let x = 0; x < mapW; x++)
                    {
                        for(let y = 0; y < mapH; y++)
                        {
                            alphaMap[toIndex(x,y)] = startingAlpha;
                        }
                    }
                }
            }

        }
        
    }
 
}


function towerStairsAlphaPing()
{
    for(let i = 0; i < gameMap.length; i++)
    {
        if(gameMap[i] != 0 && gameMap[i] != 46 && gameMap[i] != 133) { alphaMap[i] = startingAlpha; }
    }
}