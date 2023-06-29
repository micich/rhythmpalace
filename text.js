function drawTextBar()
{
    //draw most recent message updates
    let x = 10;
    let y = 20;
    let offset = 15;

    ctx.fillStyle = "#000000";
	//ctx.fillRect(0, viewport.screen[1] - (tileH*2), viewport.screen[0], viewport.screen[1]);
    ctx.fillRect(0, 0, viewport.screen[0], tileH);
    ctx.textAlign = 'start';
    ctx.fillStyle = "white";
    ctx.font = "16px Iowan Old Style";
    ctx.fillText(string1,x,y + offset);


    //draw item bar at bottom
    ctx.fillStyle = "#000000";
	//ctx.fillRect(0, viewport.screen[1] - (tileH*2), viewport.screen[0], viewport.screen[1]);
    ctx.fillRect(0, viewport.screen[1] - tileH, viewport.screen[0], viewport.screen[1]);


    if(!isIntro)
    {
        ctx.textAlign = 'center'
        ctx.fillStyle = "white";
        ctx.font = "18px Iowan Old Style";
        ctx.fillText(title, 350, viewport.screen[1]-(tileH*0.5) + 5);
    }

    if(keysObtained > 0)
	{
		drawIcon(80,viewport.screen[0]-(tileW*2.5) + 5,viewport.screen[1]-tileH + 5);
		ctx.textAlign = "start";
        ctx.fillStyle = "white";
		ctx.font = "18px Iowan Old Style";
		ctx.fillText('x ' + keysObtained,viewport.screen[0]-(tileW*1.5) + 5,viewport.screen[1]-(tileH*0.5) + 5);
	}

    if(hasEye)
	{
		drawIcon(98,viewport.screen[0]-(tileW*4.5) + 5,viewport.screen[1]-tileH + 5);
	}
    if(hasEar)
	{
		drawIcon(99,viewport.screen[0]-(tileW*3.5) + 5,viewport.screen[1]-tileH + 5);
	}
    if(hasMic)
	{
		drawIcon(100,viewport.screen[0]-(tileW*2.5) + 5,viewport.screen[1]-tileH + 5);
	}

    if(rhythmsObtained > 0)
    {
        drawIcon(144,(tileW*0.5) + 5,viewport.screen[1]-tileH + 5);
        ctx.textAlign = "start";
        ctx.fillStyle = "white";
		ctx.font = "18px Iowan Old Style";
		ctx.fillText('x ' + rhythmsObtained,(tileW*1.4) + 5,viewport.screen[1]-(tileH*0.5) + 5);
    }

    // if(hasCastle1Key == true)
    // {
    //     drawIcon(2,viewport.screen[0] - (tileW*0.75), viewport.screen[1] - (tileH*0.75));
    // }
    // if(hasApple == true)
    // {
    //     drawIcon(3,x, viewport.screen[1] - (tileH*0.75));
    // }

}

function updateTextBar(thisString)
{
    string1 = thisString;
    // string1 = string2;
    // string2 = string3;
    // string3 = string4;
    // string4 = thisString;
}

function clearTextBar()
{
    string1 = '';
    // string2 = '';
    // string3 = '';
    // string4 = '';
}

function drawIcon(thisItemType, xPos, yPos)
{
        //draw character
        var tile = tileTypes[thisItemType];
        ctx.drawImage(tileset, tile.sprite[0].x, tile.sprite[0].y, tile.sprite[0].w, tile.sprite[0].h,
            xPos, yPos,
            tile.sprite[0].w * 0.4, tile.sprite[0].h * 0.4);
}

function endScreen()
{
    ctx.fillStyle = 'rgba(0,0,0,0.85)'
    ctx.fillRect(0,0,14*tileW,11*tileH);
    
    ctx.textAlign = 'center'
    ctx.fillStyle = "white";
    ctx.font = "50px Iowan Old Style";
    ctx.fillText('THE END', 350, 200);
    ctx.font = "30px Iowan Old Style";
    ctx.fillText('Rhythms Collected: ' + rhythmsObtained, 350, 260);
    ctx.fillText('Time: ' + toHMS(Math.floor((endTime - startTime) / 1000)), 350, 320);
    ctx.fillText('Secrets Found: ' + secretsObtained + '/3', 350, 380);
    ctx.font = "20px Iowan Old Style";
    ctx.fillText('Version 1.0', 350, 440);

    
}