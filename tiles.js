


function resetAlphaMap()
{
    for(var y = 0; y < mapH; ++y)
    {
        for(var x = 0; x < mapW; ++x)
        {
            alphaMap[toIndex(x,y)] = 0.0;
            lightMap[toIndex(x,y)] = 0.0;
        }
    }
}

function alphaPing(x1,x2,y1,y2)
{
    for(let y = y1; y <= y2; y++)
    {
        for(let x = x1; x <= x2; x++)
        {
            alphaMap[toIndex(x,y)] = startingAlpha;
        }
    }
}


//getting tile information related to player
function thisTileIs() 
{ return gameMap[toIndex(player.position[0]/tileW,player.position[1]/tileH)]; }

function thisItemIs()
{ return itemMap[toIndex(player.position[0]/tileW,player.position[1]/tileH)]; }

function setPlayerTile(tile)
{ return gameMap[toIndex(player.position[0]/tileW,player.position[1]/tileH)] = tile; }

function setPlayerItem(tile)
{ return itemMap[toIndex(player.position[0]/tileW,player.position[1]/tileH)] = tile; }

function setTileTo(x,y,tile)
{ return gameMap[toIndex(x,y)] = tile; }

function setItemTo(x,y,tile)
{ return itemMap[toIndex(x,y)] = tile; }

function playerX()
{ return player.position[0]/tileW; }

function playerY()
{ return player.position[1]/tileH }

function playerXY()
{ return [player.position[0]/tileW, player.position[1]/tileH] }

function movePlayer(startX,startY,endX,endY,isReversible)
{
    if(playerX() == startX && playerY() == startY)
    {
        player.position[0] = endX;
        player.position[1] = endY;
        player.placeAt(player.position[0], player.position[1]);
    }
    else if(playerX() == endX && playerY() == endY && isReversible == true)
    {
        player.position[0] = startX;
        player.position[1] = startY;
        player.placeAt(player.position[0], player.position[1]);
    }
}

function movePlayerToTile(endX,endY)
{
    player.position[0] = endX;
    player.position[1] = endY;
    player.placeAt(player.position[0], player.position[1]);
}

function swapTiles(tile, newTile)
{
    for(x = 0; x < mapW; x++)
    {
        for(y = 0; y < mapH; y++)
        {
            if(gameMap[toIndex(x,y)] == tile)
            {
                gameMap[toIndex(x,y)] = newTile;
            }
        }
    }
}

function chooseFrom(array)
{
    let thisChoice = array[randomInt(array.length-1)];
    return thisChoice;
}

function switchTile(tileToFind, tileToChange, isReversible)
{
    if(gameMap[toIndex(playerX(), playerY())] == tileToFind)
	{
        // if(gameMap[toIndex(playerX(), playerY())] == 8)
        //  { setTileTo(2,16,10); updateTextBar("You hear a mysterious click in a nearby hall.")}
		gameMap[toIndex(playerX(), playerY())] = tileToChange;
	}
    else if(gameMap[toIndex(playerX(), playerY())] == tileToChange && isReversible)
    {
		gameMap[toIndex(playerX(), playerY())] = tileToFind;
    }
}

function cycleTile(arr)
{
    let t = arr;
    for(let i = 0; i < t.length; i++)
    {
        if(gameMap[toIndex(playerX(), playerY())] == t[t.length-1])
        {
            gameMap[toIndex(playerX(), playerY())] = t[0];
            break;
        }
        else if(gameMap[toIndex(playerX(), playerY())] == t[i])
        {
            gameMap[toIndex(playerX(), playerY())] = t[i+1];
            break;
        }
    }
}

function fillRoom(x1, x2, y1, y2, tileToSwap, choices, needTile, tileNeeded)
{
    if(needTile == true)
    {
        let rx = randomInt(x2-x1);
        let ry = randomInt(y2-y1);
        gameMap[toIndex(rx+x1, ry+y1)] = tileNeeded;
    }

    //choices is an array
    for(let y = y1; y <= y2; y++)
    {
        for(let x = x1; x <= x2; x++)
        {
            if(gameMap[toIndex(x,y)] == tileToSwap)
            {
                let r = randomInt(choices.length-1);
                gameMap[toIndex(x,y)] = choices[r];
            }
        }
    }
}


function upperLeftTileIs(x,y,tile)
{
    if(gameMap[toIndex(x-1,y-1)] == tile)
    { return true }
    else { return false }
}

function upperTileIs(x,y,tile)
{
    if(gameMap[toIndex(x,y-1)] == tile)
    { return true }
    else { return false }
}


function upperRightTileIs(x,y,tile)
{
    if(gameMap[toIndex(x+1,y-1)] == tile)
    { return true }
    else { return false }
}


function leftTileIs(x,y,tile)
{
    if(gameMap[toIndex(x-1,y)] == tile)
    { return true }
    else { return false }
}


function rightTileIs(x,y,tile)
{
    if(gameMap[toIndex(x+1,y)] == tile)
    { return true }
    else { return false }
}

function lowerLeftTileIs(x,y,tile)
{
    if(gameMap[toIndex(x-1,y+1)] == tile)
    { return true }
    else { return false }
}

function lowerTileIs(x,y,tile)
{
    if(gameMap[toIndex(x,y+1)] == tile)
    { return true }
    else { return false }
}


function lowerRightTileIs(x,y,tile)
{
    if(gameMap[toIndex(x+1,y+1)] == tile)
    { return true }
    else { return false }
}

function toIndex(x, y)
{
	return((y * mapW) + x);
}

function fromIndex(m)
{
	x = m % mapW;
	y = (m - (m % mapW)) / mapH;
	return([x, y]);
}

function randomInt(max)
{
	rand_val = Math.floor(Math.random() * Math.floor(max + 1))
	return rand_val;
}


function checkeredTiles(tileToFind, tile1, tile2)
{
    for (y = 0; y < mapH; y++)
    {
        for (x = 0; x < mapW; x++)
        {	
            if(gameMap[toIndex(x,y)] == tileToFind && ((x%2 == 0 && y%2 == 0) || (x%2 != 0 && y%2 != 0)))
            { gameMap[toIndex(x,y)] = tile1 }
            if(gameMap[toIndex(x,y)] == tileToFind && ((x%2 == 0 && y%2 != 0) || (x%2 != 0 && y%2 == 0)))
            { gameMap[toIndex(x,y)] = tile2 }
        }
    }
}


function scrambleArray(nums)
{
    let ranNums = [],
    i = nums.length,
    j = 0;

    while (i--) 
    {
        j = Math.floor(Math.random() * (i+1));
        ranNums.push(nums[j]);
        nums.splice(j,1);
    }

    return ranNums;
}


function soundTileHandler()
{
    if(hasEar)
    {
        if(thisTileIs() == 137)
        {
            if(leftTileIs(playerX(),playerY(),138))
            { setTileTo(playerX()-1,playerY(),1); setPlayerTile(1); playSnd(40); }
            else if(rightTileIs(playerX(),playerY(),138))
            { setTileTo(playerX()+1,playerY(),1); setPlayerTile(1); playSnd(40); }
            else if(upperTileIs(playerX(),playerY(),138))
            { setTileTo(playerX(),playerY()-1,1); setPlayerTile(1); playSnd(40); }
            else if(lowerTileIs(playerX(),playerY(),138))
            { setTileTo(playerX(),playerY()+1,1); setPlayerTile(1); playSnd(40); }
    
            else if(leftTileIs(playerX(),playerY(),139))
            { setTileTo(playerX()-1,playerY(),50); setPlayerTile(1); playSnd(46); playSnd(randomInt(4) + 146); }
            else if(rightTileIs(playerX(),playerY(),139))
            { setTileTo(playerX()+1,playerY(),50); setPlayerTile(1); playSnd(46); playSnd(randomInt(4) + 146);}
            else if(upperTileIs(playerX(),playerY(),139))
            { setTileTo(playerX(),playerY()-1,50); setPlayerTile(1); playSnd(46); playSnd(randomInt(4) + 146); }
            else if(lowerTileIs(playerX(),playerY(),139))
            { setTileTo(playerX(),playerY()+1,50); setPlayerTile(1); playSnd(46); playSnd(randomInt(4) + 146); }
        }
    }
}

function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

function dropOverlay()
{
    ctx.fillStyle = `rgba(0,0,0,1)`;
	ctx.fillRect(0,0,mapW*tileW,mapH*tileH);
    overlayActive = true;
    setTimeout(() => { overlayActive = false; }, 500);
}