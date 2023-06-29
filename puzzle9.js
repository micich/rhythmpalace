
function drawPuzzleRoom9()
{
    title = '';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const puzzleRoom9MapW = 14;
    const puzzleRoom9MapH = 9;
    const puzzleRoom9GameMap = [0,  0,  0,  0,  0,  0,  50, 50, 0,  0,  0,  0,  0,  0,  
                                0,  0,  62, 62, 62, 62, 56, 56, 62, 62, 62, 62, 0,  0, 
                                0,  0,  64, 64, 64, 64, 107,107,64, 64, 64, 64, 0,  0,
                                0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  
                                0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  
                                0,  1,  107,64, 64, 62, 62, 1,  107,64, 64, 62, 62, 0,  
                                0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  
                                0,  62, 64, 107,1,  62, 64, 107,1,  62, 64, 107,1,  56,  
                                0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]; 
                            
    mapW = puzzleRoom9MapW;
    mapH = puzzleRoom9MapH;
    gameMap = puzzleRoom9GameMap;
    

    resetAlphaMap();
    resetItemMap();

	starting_pos = [12,7]//[12, 7];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

	puzzleRoom9Tick = false;
}



function drawPuzzleRoom9Tiles(currentFrameTime, currentSecond)
{
	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
			//draw gameMap
			var tile = tileTypes[gameMap[toIndex(x,y)]];
			ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				x*tileW, y*tileH + (tileH*2), tileW, tileH);

            if(itemMap[toIndex(x,y)] >= 2)
            {
                var item = itemTypes[itemMap[toIndex(x,y)]];
                ctx.drawImage(tileset, item.sprite[0].x, item.sprite[0].y, item.sprite[0].w, item.sprite[0].h,
                    x*tileW, y*tileH + (tileH*2), tileW, tileH);
            }

            //itemMap could go here if needed

            //draw glowing tiles (if puzzle solved)
            // if(puzzle9Solved && gameMap[toIndex(x,y)] >= 2 && gameMap[toIndex(x,y)] <= 4)
            // {
            if(alphaMap[toIndex(x,y)] > 0.0) { alphaMap[toIndex(x,y)] -= alphaReduction;
            ctx.fillStyle = `rgba(244,125,96,${alphaMap[toIndex(x,y)]})`;
            ctx.fillRect(x*tileW, y*tileH + (tileH*2), tileW, tileH); }
            else { alphaMap[toIndex(x,y)] = 0.0; }
            // }
            // else
            // {
            //     if(alphaMap[toIndex(x,y)] > 0.0) { 
            //         alphaMap[toIndex(x,y)] -= alphaReduction;
            //         ctx.fillStyle = `rgba(0,0,0,${alphaMap[toIndex(x,y)]})`;
            //         ctx.fillRect(x*tileW, y*tileH + (tileH*2), tileW, tileH);  
            //     } 
            //     else { alphaMap[toIndex(x,y)] = 0.0; } 
            // }
                    

		}
	}

    // drawGuards(0,tileH*2);

	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		player.position[0], player.position[1]  + (tileH*2),
		player.dimensions[0], player.dimensions[1])

}

function processPuzzleRoom9Tiles(tick)
{
	if(tick)
	{
        if(thisTileIs() != 1) 
        { 
            player.delayMove = 500; 
        }
        else { player.delayMove = 250; }
        pickUpItem();
        if((thisTileIs() < 2 || thisTileIs() > 11)) { 
            playSnd(gameMap[toIndex(playerX(),playerY())]); 
        } 
        else 
        {
            playSnd(gameMap[toIndex(playerX(),playerY())] + 160)
        }
        // if(puzzle9Solved && playerX() >= 3 && playerX() <= 12 && 
        //     playerY() >= 1 && playerY() <= 7) 
        //     { 
        //         alphaMap[toIndex(playerX(),playerY())] = startingAlpha; 
        //     }

		if((playerX() == 6 || playerX() == 7) && playerY() == 0)
		{ 
			// //move to new level
            throneTick = true;
            isThrone = true;
            isPuzzleRoom9 = false;
            playBgSnd(151,'end1'); playBgSnd(156,'end2'); playBgSnd(155,'end3');
            setTimeout(() => { playBgSnd(152,'end4') },5000);
            setTimeout(() => { playBgSnd(153,'end5') },10000);
            setTimeout(() => { playBgSnd(154,'end6') },15000);
		}
	}
}









function dropPuzzle9()
{
    if(playerY() == 7)
    {
        if((playerX() == 11 || playerX() == 7 ||
            playerX() == 3) && thisTileIs() == 107)
        {
            if(!puzzle9Played) { 
                currentAnswer = randomInt(5) + 3;
                setTileTo(playerX()-1, playerY(),((currentAnswer + randomInt(5)) % 5) + 3);
                puzzle9Played = true;
            }
            freezeMovement = true;
            setTileTo(playerX(),playerY(),108);
            setTileTo(playerX()-2, 7, 110);
            playSnd(currentAnswer + 170);
            if(leftTileIs(playerX(),playerY(),currentAnswer)) 
            {
                playSnd(randomInt(4) + 146);
                freezeMovement = false;
                setTileTo(playerX()-2, 7, 1);
                setTileTo(playerX()-1, 7, 1);
                setTileTo(playerX(), 7, 1);
                setItemTo(playerX()-2, 7, currentAnswer);
                setItemTo(playerX()-1, 7, currentAnswer);
                alphaMap[toIndex(playerX()-1,7)] = startingAlpha;
                alphaMap[toIndex(playerX()-2,7)] = startingAlpha;
                alphaMap[toIndex(playerX(),7)] = startingAlpha;
                puzzle9Played = false;
            }
            else { setTimeout(() => { freezeMovement = false; setTileTo(playerX()-2, 7, 109); setTileTo(playerX(),playerY(),107); }, 1000); }
        }
    }
    else if(playerY() == 5)
    {
        if((playerX() == 2 || playerX() == 8) && thisTileIs() == 107)
        {
            if(!puzzle9Played) { 
                currentAnswer = [randomInt(5) + 3, randomInt(5) + 3];
                setTileTo(playerX()+1, playerY(),((currentAnswer[0] + randomInt(5)) % 5) + 3);
                setTileTo(playerX()+2, playerY(),((currentAnswer[1] + randomInt(5)) % 5) + 3);
                puzzle9Played = true;
            }
            freezeMovement = true;
            setTileTo(playerX(),playerY(),108);
            setTileTo(playerX()+3, 5, 110);
            setTileTo(playerX()+4, 5, 109);
            playSnd(currentAnswer[0] + 170);
            setTimeout(() => {  
                playSnd(currentAnswer[1] + 170);
                setTileTo(playerX()+3, 5, 109);
                setTileTo(playerX()+4, 5, 110);
                setTileTo(playerX(),playerY(),107);
                setTimeout(() => { 
                    //if correct answer
                    if(gameMap[toIndex(playerX()+1,playerY())] == currentAnswer[0] && 
                        gameMap[toIndex(playerX()+2,playerY())] == currentAnswer[1]) 
                    {
                        playSnd(randomInt(4) + 146);
                        freezeMovement = false;
                        setTileTo(playerX()+1, 5, 1);
                        setTileTo(playerX()+2, 5, 1);
                        setTileTo(playerX()+3, 5, 1);
                        setTileTo(playerX()+4, 5, 1);
                        setTileTo(playerX(), 5, 1);
                        setItemTo(playerX()+1, 5, currentAnswer[0]);
                        setItemTo(playerX()+2, 5, currentAnswer[1]);
                        setItemTo(playerX()+3, 5, currentAnswer[0]);
                        setItemTo(playerX()+4, 5, currentAnswer[1]);
                        alphaMap[toIndex(playerX()+1,5)] = startingAlpha;
                        alphaMap[toIndex(playerX()+2,5)] = startingAlpha;
                        alphaMap[toIndex(playerX()+3,5)] = startingAlpha;
                        alphaMap[toIndex(playerX()+4,5)] = startingAlpha;
                        alphaMap[toIndex(playerX(),5)] = startingAlpha;
                        puzzle9Played = false;
                    }
                    //else
                    else 
                    {
                        setTileTo(playerX()+4, 5, 109);
                        freezeMovement = false;
                        setTileTo(playerX(),playerY(),107);
                    }

                },500);
            }, 500);
        }
    }
    else if(playerY() == 2)
    {
        if(playerX() == 7 && thisTileIs() == 107)
        {
            if(!puzzle9Played) { 
                if(gameMap[toIndex(playerX()-1,playerY())] != 1)
                { gameMap[toIndex(playerX()-1,playerY())] = 101; }
                currentAnswer = [randomInt(5) + 3, randomInt(5) + 3, randomInt(5) + 3, randomInt(5) + 3];
                setTileTo(playerX()+1, playerY(),((currentAnswer[0] + randomInt(5)) % 5) + 3);
                setTileTo(playerX()+2, playerY(),((currentAnswer[1] + randomInt(5)) % 5) + 3);
                setTileTo(playerX()+3, playerY(),((currentAnswer[2] + randomInt(5)) % 5) + 3);
                setTileTo(playerX()+4, playerY(),((currentAnswer[3] + randomInt(5)) % 5) + 3);
                puzzle9Played = true;
            }
            freezeMovement = true;
            setTileTo(playerX(),playerY(),108);
            setTileTo(playerX()+1, playerY()-1, 110);
            setTileTo(playerX()+2, playerY()-1, 109);
            setTileTo(playerX()+3, playerY()-1, 109);
            setTileTo(playerX()+4, playerY()-1, 109);

            playSnd(currentAnswer[0] + 170);
            setTimeout(() => { 
                playSnd(currentAnswer[1] + 170);
                setTileTo(playerX()+1, playerY()-1, 109);
                setTileTo(playerX()+2, playerY()-1, 110);
                // setTileTo(playerX()+3, playerY()-1, 109);
                // setTileTo(playerX()+4, playerY()-1, 109);

                setTimeout(() => { 
                    playSnd(currentAnswer[2] + 170);
                    setTileTo(playerX()+2, playerY()-1, 109);
                    setTileTo(playerX()+3, playerY()-1, 110);
                    // setTileTo(playerX()+3, playerY()-1, 109);
                    // setTileTo(playerX()+4, playerY()-1, 109);

                    setTimeout(() => { 
                        playSnd(currentAnswer[3] + 170);
                        setTileTo(playerX()+3, playerY()-1, 109);
                        setTileTo(playerX()+4, playerY()-1, 110);
                        // setTileTo(playerX()+3, playerY()-1, 109);
                        // setTileTo(playerX()+4, playerY()-1, 109);

                        setTimeout(() => { 
                            setTileTo(playerX()+4, playerY()-1, 109);
                            setPlayerTile(107);
                            freezeMovement = false;
                            // setTileTo(playerX()+3, playerY()-1, 109);
                            // setTileTo(playerX()+4, playerY()-1, 109);
                    
                            //if correct answer
                            if(gameMap[toIndex(playerX()+1,playerY())] == currentAnswer[0] && 
                            gameMap[toIndex(playerX()+2,playerY())] == currentAnswer[1] && 
                            gameMap[toIndex(playerX()+3,playerY())] == currentAnswer[2] && 
                            gameMap[toIndex(playerX()+4,playerY())] == currentAnswer[3])
                            {
                                playSnd(randomInt(4) + 146);
                                setTileTo(playerX()+1, 1, 1);
                                setTileTo(playerX()+2, 1, 1);
                                setTileTo(playerX()+3, 1, 1);
                                setTileTo(playerX()+4, 1, 1);
                                setTileTo(playerX()+1, 2, 1);
                                setTileTo(playerX()+2, 2, 1);
                                setTileTo(playerX()+3, 2, 1);
                                setTileTo(playerX()+4, 2, 1);
                                setTileTo(playerX(), 2, 1);
                                setItemTo(playerX()+1, 1, currentAnswer[0]);
                                setItemTo(playerX()+2, 1, currentAnswer[1]);
                                setItemTo(playerX()+3, 1, currentAnswer[2]);
                                setItemTo(playerX()+4, 1, currentAnswer[3]);
                                setItemTo(playerX()+1, 2, currentAnswer[0]);
                                setItemTo(playerX()+2, 2, currentAnswer[1]);
                                setItemTo(playerX()+3, 2, currentAnswer[2]);
                                setItemTo(playerX()+4, 2, currentAnswer[3]);
                                alphaMap[toIndex(playerX()+1,1)] = startingAlpha;
                                alphaMap[toIndex(playerX()+2,1)] = startingAlpha;
                                alphaMap[toIndex(playerX()+3,1)] = startingAlpha;
                                alphaMap[toIndex(playerX()+4,1)] = startingAlpha;
                                alphaMap[toIndex(playerX()+1,2)] = startingAlpha;
                                alphaMap[toIndex(playerX()+2,2)] = startingAlpha;
                                alphaMap[toIndex(playerX()+3,2)] = startingAlpha;
                                alphaMap[toIndex(playerX()+4,2)] = startingAlpha;
                                alphaMap[toIndex(playerX(),2)] = startingAlpha;
                                puzzle9Played = false;
                                alphaMap[toIndex(6,1)] = startingAlpha;
                                alphaMap[toIndex(7,1)] = startingAlpha;
                                if(gameMap[toIndex(playerX()-1,playerY())] != 1)
                                { gameMap[toIndex(playerX()-1,playerY())] = 107; }
                                if(gameMap[toIndex(6,1)] == 56)
                                {
                                    gameMap[toIndex(6,1)] = 55;
                                    gameMap[toIndex(7,1)] = 55;
                                }
                                else
                                {
                                    gameMap[toIndex(6,1)] = 1;
                                    gameMap[toIndex(7,1)] = 1;
                                }
                            }
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }
        if(playerX() == 6 && thisTileIs() == 107)
        {
            if(!puzzle9Played) { 
                if(gameMap[toIndex(playerX()+1,playerY())] != 1)
                { gameMap[toIndex(playerX()+1,playerY())] = 101; }
                currentAnswer = [randomInt(5) + 3, randomInt(5) + 3, randomInt(5) + 3, randomInt(5) + 3];
                setTileTo(playerX()-4, playerY(),((currentAnswer[0] + randomInt(5)) % 5) + 3);
                setTileTo(playerX()-3, playerY(),((currentAnswer[1] + randomInt(5)) % 5) + 3);
                setTileTo(playerX()-2, playerY(),((currentAnswer[2] + randomInt(5)) % 5) + 3);
                setTileTo(playerX()-1, playerY(),((currentAnswer[3] + randomInt(5)) % 5) + 3);
                puzzle9Played = true;
            }
            freezeMovement = true;
            setTileTo(playerX(),playerY(),108);
            setTileTo(playerX()-4, playerY()-1, 110);
            setTileTo(playerX()-3, playerY()-1, 109);
            setTileTo(playerX()-2, playerY()-1, 109);
            setTileTo(playerX()-1, playerY()-1, 109);

            playSnd(currentAnswer[0] + 170);
            setTimeout(() => { 
                playSnd(currentAnswer[1] + 170);
                setTileTo(playerX()-4, playerY()-1, 109);
                setTileTo(playerX()-3, playerY()-1, 110);
                // setTileTo(playerX()+3, playerY()-1, 109);
                // setTileTo(playerX()+4, playerY()-1, 109);

                setTimeout(() => { 
                    playSnd(currentAnswer[2] + 170);
                    setTileTo(playerX()-3, playerY()-1, 109);
                    setTileTo(playerX()-2, playerY()-1, 110);
                    // setTileTo(playerX()+3, playerY()-1, 109);
                    // setTileTo(playerX()+4, playerY()-1, 109);

                    setTimeout(() => { 
                        playSnd(currentAnswer[3] + 170);
                        setTileTo(playerX()-2, playerY()-1, 109);
                        setTileTo(playerX()-1, playerY()-1, 110);
                        // setTileTo(playerX()+3, playerY()-1, 109);
                        // setTileTo(playerX()+4, playerY()-1, 109);

                        setTimeout(() => { 
                            setTileTo(playerX()-1, playerY()-1, 109);
                            setPlayerTile(107);
                            freezeMovement = false;
                            // setTileTo(playerX()+3, playerY()-1, 109);
                            // setTileTo(playerX()+4, playerY()-1, 109);
                    
                            //if correct answer
                            if(gameMap[toIndex(playerX()-4,playerY())] == currentAnswer[0] && 
                            gameMap[toIndex(playerX()-3,playerY())] == currentAnswer[1] && 
                            gameMap[toIndex(playerX()-2,playerY())] == currentAnswer[2] && 
                            gameMap[toIndex(playerX()-1,playerY())] == currentAnswer[3])
                            {
                                playSnd(randomInt(4) + 146);
                                setTileTo(playerX()-4, 1, 1);
                                setTileTo(playerX()-3, 1, 1);
                                setTileTo(playerX()-2, 1, 1);
                                setTileTo(playerX()-1, 1, 1);
                                setTileTo(playerX()-4, 2, 1);
                                setTileTo(playerX()-3, 2, 1);
                                setTileTo(playerX()-2, 2, 1);
                                setTileTo(playerX()-1, 2, 1);
                                setTileTo(playerX(), 2, 1);
                                setItemTo(playerX()-4, 1, currentAnswer[0]);
                                setItemTo(playerX()-3, 1, currentAnswer[1]);
                                setItemTo(playerX()-2, 1, currentAnswer[2]);
                                setItemTo(playerX()-1, 1, currentAnswer[3]);
                                setItemTo(playerX()-4, 2, currentAnswer[0]);
                                setItemTo(playerX()-3, 2, currentAnswer[1]);
                                setItemTo(playerX()-2, 2, currentAnswer[2]);
                                setItemTo(playerX()-1, 2, currentAnswer[3]);
                                alphaMap[toIndex(playerX()-4,1)] = startingAlpha;
                                alphaMap[toIndex(playerX()-3,1)] = startingAlpha;
                                alphaMap[toIndex(playerX()-2,1)] = startingAlpha;
                                alphaMap[toIndex(playerX()-1,1)] = startingAlpha;
                                alphaMap[toIndex(playerX()-4,2)] = startingAlpha;
                                alphaMap[toIndex(playerX()-3,2)] = startingAlpha;
                                alphaMap[toIndex(playerX()-2,2)] = startingAlpha;
                                alphaMap[toIndex(playerX()-1,2)] = startingAlpha;
                                alphaMap[toIndex(playerX(),2)] = startingAlpha;
                                puzzle9Played = false;
                                alphaMap[toIndex(6,1)] = startingAlpha;
                                alphaMap[toIndex(7,1)] = startingAlpha;
                                if(gameMap[toIndex(playerX()+1,playerY())] != 1)
                                { gameMap[toIndex(playerX()+1,playerY())] = 107; }
                                if(gameMap[toIndex(6,1)] == 56)
                                {
                                    gameMap[toIndex(6,1)] = 55;
                                    gameMap[toIndex(7,1)] = 55;
                                }
                                else
                                {
                                    gameMap[toIndex(6,1)] = 1;
                                    gameMap[toIndex(7,1)] = 1;
                                }
                            }
                        }, 500);
                    }, 500);
                }, 500);
            }, 500);
        }
        
    }
}


function playFinalPuzzle(x) {

}