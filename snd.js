var snd, sndPick, isLoaded = false;
var isPlaying = false;
var audioCtx;
const sounds = ['click','walk-path',
                '2','3','4','5','6','7','8','9','10','11',//rhythm white
                '12','13','14','15','16','17','18','19','20','21',//rhythm red
                '22','23','24','25','26','27','28','29','30','31',//rhythm items
                '','','','','','','','',//32-39
                'click2',//40 button
                'walk-path',//41 button on
                '','gotKey','',//42-44 keys
                'click2','door','','','',//45-49
                'click2','','walk-path','','','','','',//50-57
                'conveyor1','conveyor2','conveyor3','conveyor4','conveyor5',//58-62 conveyors + extra
                '','',//63-64
                'wall-crack','gotKey','','','',//65-69
                '','','','',//70-73
                'conveyor1','conveyor2','conveyor3','conveyor4',//74-77
                'door','gotKey','','click2',//78-81
                '','','','','','','','','','',//82-91 black rhythms
                '','','',//92-94 chars
                'puzzleSolved','puzzleSolved','','','','',//objects
                'click2','click2','click2','click2','click2','click2','click2','click',//buttons
                '','','walk-path',//109-111
                '2','3','4','5','6','7','8','9','10','11',//ice rhythms
                '','','','','','','','','','','','',//brick rhythms
                'click2','vibesNo',//134-135
                'walk-path','hiddenTile','collectEnd','click2','','','','lowbell',//136-143

                'guard','ice',//144,145
                'vibes1','vibes2','vibes3','vibes4','vibes5',//146-150

                //BACKGROUND SOUNDS
                'bglobby','bgkey1','bgkey2','bgkey3','bgpuzzle4','bggallery',//151-156
                'bgkey5','bgkey7','bgkey6','bgkey8',//157-160
                '','',//161-162

                //slow rhythms block, 163-172
                '3-half','4-half','5-half','6-half','7-half','8-half','9-half','10-half','11-half','',
                //slow rhythms marimba, 173-182
                '13-half','14-half','15-half','16-half','17-half','18-half','19-half','20-half','21-half','',
                ];
let buffers = [];
var activeSounds = [];

for(let i = 0; i < sounds.length; i++)
{
    buffers[i] = null;
}

// document.getElementById('startdiv').remove();
var AudioContext = window.AudioContext || window.webkitAudioContext;   
audioCtx = new AudioContext();

for(let i = 0; i < sounds.length; i++)
{
    if(sounds[i] != '') { loadSnd(i); }
}

function loadSnd(index) {
    const request = new XMLHttpRequest();
    request.open("GET", `./snd/${sounds[index]}.mp3`);
    request.responseType = "arraybuffer";
    request.onload = function() {
    let undecodedAudio = request.response;
    audioCtx.decodeAudioData(undecodedAudio, (data) => buffers[index] = data);
    };
    request.send();
};

function playSnd(index) {
    if((index >= 58 && index <= 61) || (index >= 74 && index <= 77))
    {
        index = randomInt(4) + 58;
    }
    const source = audioCtx.createBufferSource();
    source.buffer = buffers[index];
    source.connect(audioCtx.destination);
    source.start(audioCtx.currentTime); // play the source immediately
};

function playBgSnd(index,level) {
    const source = audioCtx.createBufferSource();
    source.buffer = buffers[index];
    source.loop = true;
    activeSounds.push([source,level]);
    source.connect(audioCtx.destination);
    source.start(audioCtx.currentTime); // play the source immediately
}

function stopBgSnd(level)
{
    for(let i = 0; i < activeSounds.length; i++)
    {
        if(activeSounds[i][1] == level) 
        { 
            activeSounds[i][0].stop(audioCtx.currentTime); 
        }

    }
}
// function selectSnd(i)
// {
//     //random pan
//     let r = (Math.random() * 2) - 1;
//     loadSnd(i);
//     playSnd(i, r);
// }


// function playSequence() {
//     isPlaying = !isPlaying
//     if(isPlaying)
//     {
//         sndPick = setInterval(() => {
//             selectSnd(randomInt(sounds.length-1));
//             }, 250);
//     }
//     else { clearInterval(sndPick); }
// }


function sndTest() {
    if(!sndTestTick)
    {
        playBgSnd(151,'bglobby'); playBgSnd(152,'key1'); playBgSnd(153,'key2'); playBgSnd(154,'key3'); playBgSnd(155,'puzzle4'); //for test
        sndTestTick = true;
    }
}

function checkBuffers()
{
    let buffCount = 0;
    for(let i = 0; i < sounds.length; i++)
    {
        if(buffers[i] != null) { buffCount++; }
    }
    if(buffCount == numberOfSounds) {  soundsLoaded = true; }
}