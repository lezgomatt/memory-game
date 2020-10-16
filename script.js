let cards = [
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

cards = shuffle(cards.concat(cards));

const playArea = document.querySelector(".play-area");
const gameOver = document.querySelector(".game-over");
const template = document.getElementById("card-template");

for (let i = 0; i < cards.length; i++) {
  let cardElem = template.content.cloneNode(true).querySelector(".card");
  cardElem.dataset.index = i;
  cardElem.querySelector(".side-front").textContent = i + 1;
  cardElem.querySelector(".card-image").style.backgroundImage = `url("images/${cards[i]}.jpg")`;
  cardElem.addEventListener("click", () => { flip(i); });
  playArea.appendChild(cardElem);
}

let selected = null;
let numHidden = 0;

function flip(i) {
  let cardElem = getCardElem(i);
  if (cardElem.classList.contains("hidden")) {
    return;
  }

  if (selected == null) {
    selected = i;
    open(cardElem);
    return;
  }

  if (i === selected) {
    selected = null;
    close(cardElem);
    return;
  }

  let cardsMatch = cards[i] === cards[selected];
  let selectedElem = getCardElem(selected);
  selected = null;

  open(cardElem);

  if (cardsMatch) {
    wait(750).then(() => {
      hide(cardElem);
      hide(selectedElem);
    });

    numHidden += 2;
    if (numHidden === cards.length) {
      wait(1250).then(() => {
        playArea.classList.add("done");
        gameOver.classList.add("done", "start");
        window.requestAnimationFrame(() => { gameOver.classList.remove("start"); });
      });
    }
  } else {
    wait(750).then(() => {
      close(cardElem);
      close(selectedElem);
    });
  }
}

function open(cardElem) {
  cardElem.classList.add("flipped");
}

function close(cardElem) {
  cardElem.classList.remove("flipped");
}

function hide(cardElem) {
  cardElem.classList.add("hidden");
}

function getCardElem(n) {
  return playArea.querySelector(`.card[data-index="${n}"]`);
}

function shuffle(array) {
  for (let len = array.length; len > 1; len--) {
    let i = randInt(0, len);
    swap(array, i, len - 1);
  }

  return array;
}

function randInt(base, limit) {
  return base + Math.floor(Math.random() * (limit - base));
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(), ms);
  });
}
