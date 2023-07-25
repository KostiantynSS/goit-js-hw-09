const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

btnStart.addEventListener('click', shuffleColors);
btnStop.addEventListener('click', stopShuffle);
let time;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function shuffleColors() {
  body.style.backgroundColor = `${getRandomHexColor()}`;
  time = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
    console.log(time);
  }, 1000);

  btnStart.setAttribute('disabled', '');
}
function stopShuffle() {
  btnStart.removeAttribute('disabled');
  clearInterval(time);
}
