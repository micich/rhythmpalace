function drawPuzzleRoom4()
{
    title = '';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const puzzleRoom4MapW = 14;
    const puzzleRoom4MapH = 10;
    const puzzleRoom4GameMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, 81,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 56,0,
                                0, 0, 64,64,64,64,64,64,64,64,64,64,0, 0,
                                0, 0, 64,64,64,64,64,64,64,64,64,64,0, 0,
                                0, 0, 64,64,64,64,64,64,64,64,64,64,0, 0,
                                0, 0, 64,64,64,64,64,64,64,64,64,64,0, 0,
                                0, 0, 64,64,64,64,64,64,64,64,64,64,0, 0,
                                0, 0, 64,64,64,64,64,64,64,64,64,64,0, 0,
                                0, 56,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 40,0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                            
    mapW = puzzleRoom4MapW;
    mapH = puzzleRoom4MapH;
    gameMap = puzzleRoom4GameMap;

    resetItemMap();
    resetAlphaMap();
    guards = [];

	starting_pos = [2,8];//[2, 8];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

	puzzleRoom4Tick = false;
}



function drawPuzzleRoom4Tiles(currentFrameTime, currentSecond)
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

    drawGuards(0,tileH);

	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		player.position[0], player.position[1]  + (tileH),
		player.dimensions[0], player.dimensions[1])

}

function processPuzzleRoom4Tiles(tick)
{
	if(tick)
	{

        if((playerY() >= 2 && playerY() <= 7) && !puzzle4Solved) 
        { player.delayMove = 500; }
        else { player.delayMove = 250; }

        if(((playerY() > puzzle4Tier || (playerY() == 2 && puzzle4Tier == 2)) && playerY() <= 7)) 
        {
            if(thisTileIs() != 2) 
            { 
                playSnd(gameMap[toIndex(playerX(),playerY())] + 160);
            }
        }
        else if(playerY() > puzzle4Tier && !puzzle4Solved && puzzle4Tier != 2) 
        { 
            playSnd(gameMap[toIndex(playerX(),playerY())]); 
        } 
        else if(!puzzle4Solved && puzzle4Tier == 2)
        { 
            playSnd(gameMap[toIndex(playerX(),playerY())]);
        }
        else { playSnd(1); }
        if(puzzle4Solved && collectTime)
        {
            pickUpItem();
        }
		if(thisTileIs()==81) { 
            setTileTo(12,1,50);
            setPlayerTile(135);
            for(let x = 2; x <= 11; x++)
            {
                for(let y = 2; y <= 7; y++)
                {
                    alphaMap[toIndex(x,y)] = startingAlpha;
                }
            }
            dropGuards('puzzle4');
            rhythmsToItems();
            collectTimerOn(collectionTime);
            puzzle4Solved = true;

        }
		if(playerX() == 12 && playerY() == 1 && puzzle4Solved)
		{ 
			// //move to new level
            keysUsed = 0;
            galleryTick = true;
            isGallery = true;
            isPuzzleRoom4 = false;
            stopBgSnd('bglobby'); stopBgSnd('key2'); stopBgSnd('key3'); stopBgSnd('puzzle4');
            playSnd(143); playSnd(137);
            playBgSnd(156,'gallery');
		}
	}
}









function dropPuzzle4()
{
    let thisY = puzzle4Tier;
    let nextY = puzzle4Tier-1;
    for(let x = 2; x <= 11; x++)
    {
        let n = randomInt(2);
        let t = randomInt(2);
        if(t == n) { t = (t+1) % 3; }
        let nextChoice = [82,83,84];
        let thisChoice = [2,3,4];
        gameMap[toIndex(x,nextY)] = nextChoice[n];
        gameMap[toIndex(x,thisY)] = thisChoice[t];
    }
}


function puzzle4State()
{
    let thisY = puzzle4Tier;
    let nextY = puzzle4Tier-1;
    let state = 0;
    for(let x = 2; x <= 11; x++)
    {
        if(gameMap[toIndex(x,thisY)] == gameMap[toIndex(x,nextY)] - 80)
        { state++; }
    }
    if(state == 10)
    {
        puzzle4Tier--;
        thisY = puzzle4Tier;
        nextY = puzzle4Tier-1;
        playSnd(randomInt(4) + 146);
        //7 = 234
        //6 = 345
        //5 = 456
        //4 = 567
        //3 = 672
        //2 = 723

        if(puzzle4Tier > 2)
        {
            for(let x = 2; x <= 11; x++) 
            { 
                alphaMap[toIndex(x,thisY)] = startingAlpha;
                gameMap[toIndex(x,thisY)] = chooseFrom([p4Choices[puzzle4Tier][0],p4Choices[puzzle4Tier][1],p4Choices[puzzle4Tier][2]]);
                let n = randomInt(2);
                let nextChoice = [p4Choices[puzzle4Tier][0] + 80,p4Choices[puzzle4Tier][1] + 80,p4Choices[puzzle4Tier][2] + 80];
                if(nextChoice[n] == gameMap[toIndex(x,thisY)] + 80)
                { n = (n+1)%3; }
                gameMap[toIndex(x,nextY)] = nextChoice[n];
            }
        }
        else if(puzzle4Tier == 2)
        {
            for(let x = 2; x <= 11; x++) 
            { 
                alphaMap[toIndex(x,thisY)] = startingAlpha;
                gameMap[toIndex(x,thisY)] = chooseFrom([p4Choices[puzzle4Tier][0],p4Choices[puzzle4Tier][1],p4Choices[puzzle4Tier][2]]);
            }
        }

    }
}