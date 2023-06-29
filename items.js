// function pickUpItem(itemToFind)
// {
//     if(itemMap[toIndex(playerX(), playerY())] == itemToFind)  
// 	{
//             //specific item effects
//             if(thisItemIs() == 2) { updateTextBar("You got a key!"); hasCastle1Key = true; }
//             if(thisItemIs() == 3) { updateTextBar("You picked up a peculiar fruit."); hasApple = true; }
//             if(thisItemIs() == 4) { updateTextBar("You got 20 gold pieces!"); gold += 20; }
//             if(thisItemIs() == 5) { updateTextBar("You got 5 gold pieces!"); gold += 5; }
		
//         //then get rid of it
//         itemMap[toIndex(playerX(), playerY())] = 0;
// 	}

function pickUpItem()
{
    if(itemMap[toIndex(playerX(), playerY())] >= 2)  
	{
        rhythmsObtained++;
        playSnd(itemMap[toIndex(playerX(), playerY())]+20,false);
        alphaMap[toIndex(playerX(), playerY())] = startingAlpha;
        rhythms[itemMap[toIndex(playerX(), playerY())]]++;
        itemMap[toIndex(playerX(), playerY())] = 0;
        if(isCrypt) { cryptCount++; }
	}
}


function collectTimerOn(time)
{
    collectTime = true;
    playSnd(43);
    setTimeout(() => {
        collectTime = false;
        if(!isLobby && !isGallery)
        {
            for(let i = 0; i < itemMap.length; i++)
            { itemMap[i] = 0; }
            playSnd(138);
        }
      }, time);
}


function resetItemMap()
{
    itemMap = [];
    for(let i = 0; i < gameMap.length; i++)
    { itemMap[i] = 0; }
}

function rhythmsToItems()
{
    for(let i = 0; i < gameMap.length; i++)
    { 
        if(gameMap[i] >= 2 && gameMap[i] <= 11) { itemMap[i] = gameMap[i]; gameMap[i] = 1; }  
        if(gameMap[i] >= 12 && gameMap[i] <= 21) { itemMap[i] = gameMap[i] - 10; gameMap[i] = 1; }
        if(gameMap[i] >= 112 && gameMap[i] <= 121) { itemMap[i] = gameMap[i] - 110; gameMap[i] = 145; }
    } 
}

// }

// function switchItem(itemToFind, itemToChange, isReversible)
// {
//     if(itemMap[toIndex(playerX(), playerY())] == itemToFind)
// 	{
//             //specific item effects
//             // if(itemMap[toIndex(playerX(), playerY())] == 8)
//             // { itemMap[toIndex(2,16)] = 10; }

// 		itemMap[toIndex(playerX(), playerY())] = itemToChange;
// 	}
//     else if(itemMap[toIndex(playerX(), playerY())] == itemToChange && isReversible)
//     {
// 		itemMap[toIndex(playerX(), playerY())] = itemToFind;
//     }
// }


