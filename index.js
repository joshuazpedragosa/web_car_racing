const background = document.querySelector("canvas");
const c = background.getContext("2d");
var a_ispressed = false;
var d_ispressed = false;
var w_ispressed = false;
var s_ispressed = false;
var last_key = "";
var score = 0;

c.fillStyle = "white";
var game_start = false;

var bgimg = new Image();
bgimg.src = "road.png";

var carimg = new Image();
carimg.src = "car.png";
let carXposition = 55;
let carYposition = 490;
let carhiegth = 190;
let carwidth = 120;

var car_collection = new Array("silver_car.png", "car_gray.png", "car_obs.png");

var interval_arr = new Array(-200, -1200, -2200, -3200);

var random_num = Math.floor(Math.random() * car_collection.length);
var random_num_1 = Math.floor(Math.random() * car_collection.length);

var random_interval_1 = Math.floor(Math.random() * interval_arr.length);
var random_interval_2 = Math.floor(Math.random() * interval_arr.length);

let obsCarXPosition = 55;
let obsCarYPosition = interval_arr[random_interval_1];
let obsCarhiegth = 150;
let obsCarwidth = 120;

let obsCarXPosition_1 = 225;
let obsCarYPosition_1 = interval_arr[random_interval_2];
let obsCarhiegth_1 = 150;
let obsCarwidth_1 = 120;

function animation() {
  window.requestAnimationFrame(animation);
  var obsCar = new Image();
  obsCar.src = car_collection[random_num];

  var lane2car = new Image();
  lane2car.src = car_collection[random_num_1];

  c.drawImage(bgimg, 0, 0, 400, 690);
  c.drawImage(carimg, carXposition, carYposition, carwidth, carhiegth);

  if (random_interval_1 === random_interval_2) {
    var random_interval_3 = Math.floor(Math.random() * interval_arr.length);
    var random_interval_4 = Math.floor(Math.random() * interval_arr.length);

    obsCarYPosition = interval_arr[random_interval_3];
    obsCarYPosition_1 = interval_arr[random_interval_4];
  } else {
    c.drawImage(
      obsCar,
      obsCarXPosition,
      obsCarYPosition,
      obsCarwidth,
      obsCarhiegth
    );
    c.drawImage(
      lane2car,
      obsCarXPosition_1,
      obsCarYPosition_1,
      obsCarwidth_1,
      obsCarhiegth_1
    );
  }

  if (a_ispressed && carXposition > -10 && last_key == "a")
    carXposition = carXposition - 3;
  else if (d_ispressed && carXposition < 290 && last_key == "d")
    carXposition = carXposition + 3;
  else if (w_ispressed && carYposition > -5 && last_key == "w")
    carYposition = carYposition - 3;
  else if (s_ispressed && carYposition < 505 && last_key == "s")
    carYposition = carYposition + 3;
}
animation();

const interval = setInterval(function () {
  obsCarMove();
}, 10);
function obsCarMove() {
  if (obsCarYPosition >= 700) {
    var new_random_interval_1 = Math.floor(Math.random() * interval_arr.length);
    obsCarYPosition = interval_arr[new_random_interval_1];
    random_num = random_num = Math.floor(Math.random() * car_collection.length);
  } else if (obsCarYPosition >= -3200 && obsCarYPosition < 700)
    obsCarYPosition = obsCarYPosition + 3;

  if (obsCarYPosition_1 >= 700) {
    var new_random_interval_2 = Math.floor(Math.random() * interval_arr.length);
    obsCarYPosition_1 = interval_arr[new_random_interval_2];
    random_num_1 = random_num_1 = Math.floor(
      Math.random() * car_collection.length
    );
  } else if (obsCarYPosition_1 >= -3200 && obsCarYPosition_1 < 700)
    obsCarYPosition_1 = obsCarYPosition_1 + 3;

  if (
    carYposition - carhiegth / 2 <
      obsCarYPosition + obsCarhiegth / 2 - obsCarhiegth + 105 &&
    carYposition - carhiegth / 2 >
      obsCarYPosition + obsCarhiegth / 2 - obsCarhiegth - 200 &&
    carXposition - carwidth / 2 < obsCarXPosition + obsCarwidth / 2 - 30 &&
    carXposition - carwidth / 2 > obsCarXPosition - obsCarwidth / 2 - 90
  ) {
    clearInterval(interval);
    alert("Game Over! Your score: " + score);
  } else if (
    carYposition - carhiegth / 2 <
      obsCarYPosition_1 + obsCarhiegth_1 / 2 - obsCarhiegth_1 + 105 &&
    carYposition - carhiegth / 2 >
      obsCarYPosition_1 + obsCarhiegth_1 / 2 - obsCarhiegth_1 - 200 &&
    carXposition - carwidth / 2 < obsCarXPosition_1 + obsCarwidth_1 / 2 - 30 &&
    carXposition - carwidth / 2 > obsCarXPosition - obsCarwidth_1 / 2 + 90
  ) {
    clearInterval(interval);
    alert("Game Over! Your score: " + score);
  } else if (
    (carYposition - obsCarYPosition >= 0 &&
      carYposition - obsCarYPosition <= 2) ||
    (carYposition - obsCarYPosition_1 >= 0 &&
      carYposition - obsCarYPosition_1 <= 2)
  ) {
    score++;
  }

  document.getElementById("score").innerHTML = score;
}

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "a":
      a_ispressed = true;
      last_key = "a";
      break;
    case "d":
      d_ispressed = true;
      last_key = "d";
      break;
    case "w":
      w_ispressed = true;
      last_key = "w";
      break;
    case "s":
      s_ispressed = true;
      last_key = "s";
      break;
  }
});
window.addEventListener("keyup", function (e) {
  switch (e.key) {
    case "a":
      a_ispressed = false;
      break;
    case "d":
      d_ispressed = false;
      break;
    case "w":
      w_ispressed = false;
      break;
    case "s":
      s_ispressed = false;
      break;
  }
});
