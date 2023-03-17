var css = document.getElementsByClassName("h3text");
var color1 = document.querySelector("#color1");
var color2 = document.querySelector("#color2");
var body = document.querySelector("#gradient");
var random = document.querySelector("#randomize");
var headerLeft = document.querySelector("#left");
var headerRight = document.querySelector("#right");

setH3Text();
setGradient();

function setH3Text(){
  // sets hexcode display values
  css[0].textContent = color1.value;
  css[0].style.color = color1.value; 
  css[1].textContent = " | ";
  css[2].textContent = color2.value;
  css[2].style.color = color2.value;
}

function hexToRgb(hex) {
  // converts hex (#000000) value to RGB (255, 255, 255) value
  var removeHashtag = '';
  for(var i = 0; i < hex.length; i++){
    if(i > 0){
      removeHashtag += hex[i];
    }
  }
  var bigint = parseInt(removeHashtag, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  // returns true if all values are below the threshold
  var invertThreshold = 125;
  if(r < invertThreshold && g < invertThreshold && b < invertThreshold){
    return true;
  }
  return false;
}

function setGradient() {
  // updates background
  body.style.background = "linear-gradient(to right, " + color1.value + ", " + color2.value + ")";

  // if hexToRgb returns true, the left header is inverted
  if(hexToRgb(color1.value) && headerLeft.classList[0] === "invert"){
    headerLeft.classList.toggle("invert");
    css[0].classList.toggle("invertBg");
  } else if (!hexToRgb(color1.value) && headerLeft.classList[0] !== "invert"){
    headerLeft.classList.toggle("invert");
    css[0].classList.toggle("invertBg");
  }
  
  // if hexToRgb returns true, the right header is inverted
  if(hexToRgb(color2.value) && headerRight.classList[0] === "invert"){
    headerRight.classList.toggle("invert");
    css[2].classList.toggle("invertBg");
  } else if(!hexToRgb(color2.value) && headerRight.classList[0] !== "invert"){
    headerRight.classList.toggle("invert");
    css[2].classList.toggle("invertBg");
  }

  setH3Text();
}

function randomColor(){
  // generates a random hexcode
  var random = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var counter = 0;

  // only allows a valid hexcode to be generated
  while (counter < 6) {
    var val = characters.charAt(Math.floor(Math.random() * charactersLength))
    if((val >= 'A' && val <= 'F') || (val >= 0 && val <= 9)){
      random += val;
      counter += 1;
    }
  }
  return random
}

function randomizeGradient(){
  // on click a random gradient is created and applied
  color1.value = '#' + randomColor();
  color2.value = '#' + randomColor();
  setGradient();
  setH3Text();
}

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
random.addEventListener("click", randomizeGradient)