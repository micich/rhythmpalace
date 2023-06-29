
function drawThrone()
{
    // gameEnd = true;
    title = 'Throne Room';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const throneMapW = 14;
    const throneMapH = 9;
    const throneGameMap = [     0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 
                                0,  139,139,0,  53, 136,1,  1,  136,53, 0,  139,139,0,
                                0,  139,139,0,  134, 1,  141,141,1, 134, 0,  139,139,0,
                                0,  139,139,0,  53, 1,  141,141,1,  53, 0,  139,139,0,
                                0,  139,139,0,  134, 1,1,  1,  1,134, 0,  139,139,0,
                                0,  139,139,0,  53, 1,  1,  1,  1,  53, 0,  139,139,0,
                                0,  0,  0,  0,  0,  0,  1,  1, 0,  0,  0,  0,  0,  0,
                                0,  0,  0,  0,  56, 1,  1,  1,  111,111,111,111,1,  56,
                                0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]; 
    
    mapW = throneMapW;
    mapH = throneMapH;
    gameMap = throneGameMap;

    for(let i = 0; i < gameMap.length; i++)
    {
        if(gameMap[i]==139) { gameMap[i] = randomInt(5) + 123; }
    }

    // checkeredTiles(1,1,140);

    resetAlphaMap();
    resetItemMap();

    player.delayMove = 250;

    // // THIS IS PURELY FOR TEST PURPOSES OF END SCREEN
    // for(let i = 0; i < gameMap.length; i++)
    // { if(gameMap[i] == 1) { itemMap[i] = randomInt(9) + 2; }}

	if(firstPlayPuzzle10) { 
        starting_pos = [12, 7];
        firstPlayPuzzle10 = false;
    }
    else { starting_pos = [7,7]; }
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

    dropGuards('throne');

    // setTileTo(6,6,136); setTileTo(7,6,136);

	throneTick = false;
}



function drawThroneTiles(currentFrameTime, currentSecond)
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

            //draw glowing tiles (if puzzle solved)
            if(thronePuzzleSolved)
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


    if(!puzzle10Active)
    {
        //draw king
        var king = kingTypes[3];
        ctx.drawImage(tileset, king.sprite[0].x, king.sprite[0].y, king.sprite[0].w, king.sprite[0].h,
            6*tileW, 2*tileH + (tileH*2), tileW*2, tileH*2);
    }
    else if(!thronePuzzleSolved)
    {
        for(let i = 0; i < 4; i++)
        {
            //draw king
            var king = kingTypes[kingBuild[i]];
            ctx.drawImage(tileset, king.sprite[0].x, king.sprite[0].y, king.sprite[0].w, king.sprite[0].h,
                6*tileW, 2*tileH + (tileH*2), tileW*2, tileH*2);
        }
    }

    drawGuards(0,tileH*2);

	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		player.position[0], player.position[1]  + (tileH*2),
		player.dimensions[0], player.dimensions[1])

}

function processThroneTiles(tick)
{
	if(tick)
	{
        pickUpItem();
        if(thisTileIs() == 79) { 
            gameEnd = true; //GAME OVER
            playSnd(143);
            playSnd(144);
            endTime = Date.now();
            stopBgSnd('end1');
            stopBgSnd('end2');
            stopBgSnd('end3');
            stopBgSnd('end4');
            stopBgSnd('end5');
            stopBgSnd('end6');
            stopBgSnd('end7');

        }
        if(thisTileIs() >= 103 && thisTileIs() <= 106)
        { 
            playSnd(144);
            puzzle10Active = true;
            let x = playerX(); let y = playerY(); 
            // let list = [];
            // if(x == 4 && y == 2) { list = [102,103,104]; }
            // else { list = [102,103,104,106]; }
            // let t = thisTileIs();
            
            // let choices = [];
            // for(let i = 0; i < list.length; i++)
            // {
            //     if(t != list[i]) { choices.push(list[i]); }
            // }
            // let choice = chooseFrom(choices);
            // setTileTo(x,y,choice); 
            if(x == 4 && y == 2) { 
                cycleTile([103,104,106]); //change bg
                if(thisTileIs() == 103) { kingBuild[0] = 0; }
                if(thisTileIs() == 106) { kingBuild[0] = 1; }
                if(thisTileIs() == 104) { kingBuild[0] = 2; }
            }
            if(x == 4 && y == 4) { //change body
                cycleTile([103,104,106]);
                if(thisTileIs() == 103) { kingBuild[1] = 5; }
                if(thisTileIs() == 104) { kingBuild[1] = 6; }
                if(thisTileIs() == 106) { kingBuild[1] = 4; }
            }
            if(x == 9 && y == 2) { //change scepter
                cycleTile([103,104,106]);
                if(thisTileIs() == 103) { kingBuild[2] = 9; }
                if(thisTileIs() == 104) { kingBuild[2] = 10; }
                if(thisTileIs() == 106) { kingBuild[2] = 8; }
            }
            if(x == 9 && y == 4) { //change face
                cycleTile([103,104,106]);
                if(thisTileIs() == 103) { kingBuild[3] = 13; }
                if(thisTileIs() == 104) { kingBuild[3] = 14; }
                if(thisTileIs() == 106) { kingBuild[3] = 12; }
            }

            kingState();
        }
        else if(!puzzle10Active && thisTileIs()==134)
        {
            playSnd(144);
            setTileTo(4,2,106);
            setTileTo(4,4,106);
            setTileTo(9,2,106);
            setTileTo(9,4,106);
            puzzle10Active = true;
        }
        

        // if(puzzle9Solved && playerX() >= 3 && playerX() <= 12 && 
        //     playerY() >= 1 && playerY() <= 7) 
        //     { 
        //         alphaMap[toIndex(playerX(),playerY())] = startingAlpha; 
        //     }

		// if(playerX() == 0 && playerY() == 4 && puzzle9Solved)
		// { 
		// 	// //move to new level
        //     throneTick = true;
        //     isThrone = true;
        //     isPuzzleRoom9 = false;
		// }
	}
}









// function dropPuzzle9()
// {
//     for(let y = 1; y < 8; y++)
//     {
//         gameMap[toIndex(1,y)] = randomInt(9) + 82;
//         gameMap[toIndex(2,y)] = randomInt(9) + 2;
//     }
// }


// function puzzle9State()
// {
//     gameMap[toIndex(0,4)] = 50;
// }


function kingState()
{
    if(kingBuild[0] == 2 && kingBuild[1] == 6 && kingBuild[2] == 10 && kingBuild[3] == 14)
    {
        updateTextBar('The King disappears amidst a blaze of RED RHYTHMS!');
        thronePuzzleSolved = true;
        playSnd(95);
        guards = [];
        for(let y = 1; y <= 5; y++)
        { 
            gameMap[toIndex(3,y)] = 1; 
            gameMap[toIndex(10,y)] = 1; 
            if(gameMap[toIndex(4,y)] == 104) { gameMap[toIndex(4,y)] = 1; }
            if(gameMap[toIndex(9,y)] == 104) { gameMap[toIndex(9,y)] = 1; }
        }
        setTileTo(4,7,79);
        swapTiles(141,1);
        swapTiles(136,1);
        for(let i = 0; i < gameMap.length; i++)
        { 
            if(gameMap[i] == 1) { itemMap[i] = randomInt(5) + 3; }
            alphaMap[i] = startingAlpha;
            if(gameMap[i] >= 122 && gameMap[i] <= 131) { itemMap[i] = gameMap[i]-120; gameMap[i] = 1; }
        }
    }


}