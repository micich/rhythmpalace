
function drawIntro()
{
    //resetting dungeon parameters
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    const introMapW = 14;
    const introMapH = 10;
    const introGameMap = [      0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 
                                0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 
                                0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 
                                0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 
                                0,  56, 1,  1,  45, 45, 45, 45, 45, 45, 1,  1,  56, 0, 
                                0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 
                                0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 
                                0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 
                                0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
                                0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]; 
                                
    
    mapW = introMapW;
    mapH = introMapH;
    gameMap = introGameMap;

    resetAlphaMap();

	starting_pos = [2,4];
	player.position[0] = starting_pos[0];
	player.position[1] = starting_pos[1];
	player.placeAt(player.position[0], player.position[1]);

    dropGuards('intro');

    // setTileTo(6,6,136); setTileTo(7,6,136);

	introTick = false;

    pickFrom = scrambleArray([122,123,124,125,126,127,128]);
    
}

function drawIntroTiles(currentFrameTime, currentSecond)
{
	for(var y = 0; y < mapH; ++y)
	{
		for(var x = 0; x < mapW; ++x)
		{
            var tile;
			//draw gameMap
            if(y == 4 && openingTitleTick)
            {
                if(x == 4) { tile = tileTypes[pickFrom[0]];}
                else if(x == 5) { tile = tileTypes[pickFrom[1]];}
                else if(x == 6) { tile = tileTypes[pickFrom[2]];}
                else if(x == 7) { tile = tileTypes[pickFrom[3]];}
                else if(x == 8) { tile = tileTypes[pickFrom[4]];}
                else if(x == 9) { tile = tileTypes[pickFrom[5]];}
                else { tile = tileTypes[0]; }
            }
            else
            {
                tile = tileTypes[gameMap[toIndex(x,y)]];
            }
            ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
				x*tileW, y*tileH + (tileH), tileW, tileH); 

		}
	}
    //draw gameMap

    ctx.fillStyle = 'rgba(0,0,0,0.7)'
    ctx.fillRect(0,3*tileH,14*tileW,tileH)
    ctx.fillRect(0,7*tileH,14*tileW,tileH)
    
    var tile = tileTypes[142];
    ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
        0.5*tileW, 2*tileH + (tileH), tileW*6, tileH);  
    var tile = tileTypes[143];
    ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
        7.5*tileW, 2*tileH + (tileH), tileW*6, tileH);    

    drawGuards(0,tileH*2);

    if(!openingTitleTick)
    {
        	//draw character
	sprite = player.sprites[player.direction];
	ctx.drawImage(tileset, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h,
		player.position[0], player.position[1]  + (tileH),
		player.dimensions[0], player.dimensions[1])

    }

    if(openingTitleTick)
    {
        if(!soundsLoaded) { updateTitle('Sounds are loading...'); checkBuffers(); }
        else { updateTitle('Use the ARROW KEYS to move. Hit any button to begin.')}
    }

}

function processIntroTiles(tick)
{
	if(tick)
	{
        if(playerX() == 4) { updateTitle('The kingdom of Brevis long prided itself as the keeper of the RED RHYTHMS...'); }
        if(playerX() == 5) { updateTitle('...until the greedy KING QUAVER began hoarding the precious notes in his palace.'); }
        if(playerX() == 6) { updateTitle('You have come to put an end to this injustice!'); }
        if(playerX() == 7) { updateTitle('Solve the mysteries of the palace, avoid the guards, confront the KING...'); }
        if(playerX() == 8) { updateTitle('...and return the RED RHYTHMS back to the land of Brevis!'); }
        if(playerX() == 9) { updateTitle('May you look closely and listen carefully in your quest, brave hero.'); }
        if(playerX() == 10) { updateTitle(''); }
        if(playerX() == 11 && gameMap[toIndex(12,4)] == 56) { gameMap[toIndex(12,4)] = 50; playSnd(46); }
        if(playerX() == 12) { 
            isIntro = false;
            isLobby = true;
            lobbyTick = true;
        }
    }
}

function updateTitle(s)
{
    string0 = s;
}

function drawTitle()
{
    //draw most recent message updates
    let x = mapW*tileW*0.5;
    let y = tileH*7.6;
    let offset = 0;

    ctx.fillStyle = "white";
    ctx.font = "18px Iowan Old Style";
    ctx.textAlign = 'center';
    ctx.fillText(string0,x,y + offset);
}