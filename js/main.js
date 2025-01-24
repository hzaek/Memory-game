// Global vars
let open = [0, [], [], []];
let points = 0;
let lives = 5;
// Global vars

// Win Notification
function showWinNotification(isTure) {
  let overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  overlay.style.zIndex = "1000";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.flexDirection = "column";

  let resultText = document.createElement("h1");
  resultText.textContent = `${isTure === false ? "You Lose" : "You Win"}`;
  resultText.style.color = isTure? "green" : "red";
  resultText.style.fontSize = "4rem";
  resultText.style.marginBottom = "2rem";

  let resetButton = document.createElement("button");
  resetButton.textContent = "Reset";
  resetButton.style.padding = "1rem 2rem";
  resetButton.style.fontSize = "1.5rem";
  resetButton.style.cursor = "pointer";
  resetButton.style.backgroundColor = "#4CAF50";
  resetButton.style.color = "white";
  resetButton.style.border = "none";
  resetButton.style.borderRadius = "5px";

  resetButton.addEventListener("click", () => {
    window.location.reload();
  });

  overlay.appendChild(resultText);
  overlay.appendChild(resetButton);
  document.body.appendChild(overlay);
}
// Win Notification

// Main
let imgArray = [
  "Angular.png",
  "kali.png",
  "cpp.jpg",
  "css.png",
  "html.png",
  "java.png",
  "js.jpg",
  "arch.png",
  "React.png",
  "tailwind.png",
];
let imgLocation = "../images/";
let randomizerImgArray = dupleRandomizer(imgArray);
let livesSpan = document.getElementById("lives");
livesSpan.textContent = `Lives left: ${lives}`;
cardsGenerator(randomizerImgArray);
let images = document.querySelectorAll(".image");
open2Sec();
// Main

// Open for 2 seconds
async function open2Sec() {
  await wait(1000);
  images.forEach(function (el) {
    el.classList.add("open");
  });
  await wait(2000);
  images.forEach(function (el) {
    el.classList.remove("open");
  });
  clickState();
}
// Open for 2 seconds

// Create Random Picture Cards
function cardsGenerator(array) {
  let cards = document.querySelector(".cards");
  for (let i = 0; i < array.length; i++) {
    let image = document.createElement("div");
    image.classList.add("image");

    let front = document.createElement("div");
    front.classList.add("front");

    let questionMark = document.createElement("i");
    questionMark.className = "fa-solid fa-question";

    front.append(questionMark);

    let back = document.createElement("div");
    back.classList.add("back");

    let img = document.createElement("img");
    img.src = `${imgLocation}${array[i]}`;
    img.id = `img${i}`;

    back.append(img);

    image.append(front, back);

    cards.append(image);
  }
}

function dupleRandomizer(array) {
  let mySet1 = new Set();
  let mySet2 = new Set();
  while (mySet1.size < array.length) {
    let rand = Math.floor(Math.random() * array.length);
    mySet1.add(array[rand]);
  }
  while (mySet2.size < array.length) {
    let rand = Math.floor(Math.random() * array.length);
    mySet2.add(array[rand]);
  }
  let myRandomArray = [...mySet1, ...mySet2];
  return myRandomArray;
}
// Create Random Picture Cards

// Click image State
function clickState() {
  images.forEach(function (el) {
    el.addEventListener("click", clickListener);
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function clickListener(e) {
  this.classList.add("open");
  open[1][open[0]] = this.lastChild.firstChild.id;
  open[2][open[0]] = this.lastChild.firstChild.src;
  open[3][open[0]] = e.currentTarget;
  e.currentTarget.removeEventListener("click", clickListener);
  open[0] += 1;

  // Check Points
  if (open[0] === 2) {
    if (open[2][0] === open[2][1]) {
      points += 1;
      open[0] = 0;
      open[1] = [];
      open[2] = [];
      open[3] = [];
      
      if (points === imgArray.length) {
        showWinNotification(true);
        await wait(400);
        let winSound = new Audio("../win.wav");
        winSound.play();
      }
    } else {
      let img1 = document.getElementById(open[1][0]);
      let img2 = document.getElementById(open[1][1]);
      setTimeout(function () {
        img1.parentElement.parentElement.classList.remove("open");
        img2.parentElement.parentElement.classList.remove("open");
      }, 700);
      let one = open[3][0];
      let two = open[3][1];

      open[0] = 0;
      open[1] = [];
      open[2] = [];
      open[3] = [];

      lives -= 1;
      if (lives === 0) {
        showWinNotification(false)
        images.forEach(function (el) {
          el.removeEventListener("click", clickListener);
        });
        await wait(700);
        let loseSound = new Audio("../lose.wav");
        loseSound.play();
      } else {
        await wait(700);
        let loseSound = new Audio("../lose.wav");
        loseSound.play();
        one.addEventListener("click", clickListener);
        two.addEventListener("click", clickListener);
      }

      livesSpan.textContent = `Lives left: ${lives}`;
    }
  }
  // Check Points
}
// Click image State

// light
let light = document.querySelector(".light");
document.body.addEventListener("mousemove", function (e) {
  light.style.left = e.clientX + "px";
  light.style.top = e.clientY + "px";
});
// light
