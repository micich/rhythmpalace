
function drawCrypt()
{
    title = 'Crypt';
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const cryptMapW = 14;
    const cryptMapH = 9;
    const cryptGameMap =        [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 
                                0,  146,0,  146,0,  146,0,  146,0,  146,0,  146,0,  0,
                                0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,
                                0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,
                                0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,
                                0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,
                                0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,
                                0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,
                                0,  0,  0,  0,  0,  0,  0,  50,  0,  0,  0,  0,  0,  0];
                            
    mapW = cryptMapW;
    mapH = cryptMapH;
    gameMap = cryptGameMap

    resetItemMap();
    
    for (y = 0; y < mapH; y++)
    {
        for (x = 0; x < mapW; x++)
        {	
            if(gameMap[toIndex(x,y)] == 1 && ((x%2 == 0 && y%2 == 0) || (x%2 != 0 && y%2 != 0)))
            { itemMap[toIndex(x,y)] = randomInt(9) + 2; }
        }
    }

    resetAlphaMap();

    secretsObtained++;

	starting_pos = [7, 7];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);
	cryptTick = false;
}



function drawCryptTiles(currentFrameTime, currentSecond)
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

            if(alphaMap[toIndex(x,y)] > 0.0) { alphaMap[toIndex(x,y)] -= alphaReduction;
                ctx.fillStyle = `rgba(244,125,96,${alphaMap[toIndex(x,y)]})`;
                ctx.fillRect(x*tileW, y*tileH + (tileH*2), tileW, tileH); }
                else { alphaMap[toIndex(x,y)] = 0.0; }
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

    drawGuards(0,tileH*2);

	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		player.position[0], player.position[1]  + (tileH*2),
		player.dimensions[0], player.dimensions[1])
    
    for(var y = 0; y < mapH; ++y)
    {
        for(var x = 0; x < mapW; ++x)
        {
            if(x == playerX() && y == playerY()) { lightMap[toIndex(x,y)] = 0; }
            else { lightMap[toIndex(x,y)] = 1-(3-getDistance(playerX(),playerY(),x,y)); }
            // if(alphaMap[toIndex(x,y)] > 0.0) { alphaMap[toIndex(x,y)] -= alphaReduction;
            ctx.fillStyle = `rgba(0,0,0,${lightMap[toIndex(x,y)]})`;
            ctx.fillRect(x*tileW, y*tileH + (tileH*2), tileW, tileH);
            // else { alphaMap[toIndex(x,y)] = 0.0; }
        }
    }

}

function processCryptTiles(tick)
{
	if(tick)
	{
        pickUpItem(); 
        if(cryptCount == 10 && !cryptGuardsDropped) {
            dropGuards('crypt');
            playSnd(95);
            cryptGuardsDropped = true;
        }
		if(playerX() == 7 && playerY() == 8)
		{ 
			// //move to new level
            isLobby2 = true;
            lobby2Tick = true;
            isCrypt = false;
            comingFromCrypt = true;
		}
	}
}

