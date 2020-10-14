/* ADDITIONAL INFO POSSIBLE IN FUTURE VERSIONS:
1) SOUND - on flip, right or wrong
2) TIME - with pause?
3) WIN - big txt w/ fx? sounds?
4) MOVE COUNTER - simple counter
*/

//initializations
anim=
[
  "Atari-2600",
  "NES",
  "PlayStation-2",
  "Sega-Genesis",
  "Commodore-64",
  "Nintendo-3DS",
  "PlayStation-3",
  "Wii-U",
  "Game-Boy-Advance",
  "Nintendo-64",
  "PlayStation-4",
  "Wii",
  "Game-Boy-Color",
  "Nintendo-DS",
  "PlayStation-Vita",
  "Xbox-360",
  "Game-Boy",
  "Nintendo-Switch",
  "PlayStation",
  "Xbox-One",
  "GameCube",
  "PSP",
  "SNES",
  "Xbox",
];
animals=anim.length;
cards=animals*2;
anim2=anim.concat(anim);

//shufflin'
function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}
anim2=shuffle(anim2);

//template
space=document.getElementById('space');
for (var i=1; i<=cards; i++){
  var card= document.createElement("div");
  card.id="card"+i;
  card.className="card";
  var front=document.createElement("div");
  front.className="front side";
  front.innerHTML=i.toString();
  var back=document.createElement("div");
  back.className="back side";
  back.style.backgroundImage="url(images/"+anim2[i-1]+".jpg)";
  back.style.backgroundSize="contain";
  back.style.backgroundPosition="center";
  card.appendChild(front);
  card.appendChild(back);
  space.appendChild(card);
}

//event-logic
selected=null;
function clicked(e){
    if (selected==null){
        selected=e;
        flipOpen(e);
        return;
    }
    if(e==selected){
        selected=null;
        flipClose(e);
        return;
    }
    flipOpen(e);
    selectN=parseInt(selected.id.slice(4))-1;
    eN=parseInt(e.id.slice(4))-1;
    if(anim2[eN]==anim2[selectN]){
        delayHide(e,selected);
        selected=null;
    }else{
        delayClose(e,selected); //notice: can't replace function's contents cause it'll make REFERENCE to selected which has been declared null below. closures can be used instead.
        selected=null;
    }
}

function flipOpen(e){
    e.className="card flip";
}

function flipClose(e){
    e.className="card";
}

function delayHide(a,b){
    setTimeout(function(){
    a.className="card flip hide";
    b.className="card flip hide";
    },800);
}
function delayClose(a,b){ //in here on the other hand, in the annony function, a and b make REFERENCE to (in this closure) the a and b that have been passed by VALUE earlier
    setTimeout(function(){
    flipClose(a);
    flipClose(b);
    },800);
}

cardEl=document.getElementsByClassName('card');
for(var i=0, l=cardEl.length; i<l; i++){
  cardEl[i].addEventListener("click", function(){clicked(this)});
}
