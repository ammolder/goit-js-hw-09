function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.body,
};
const color = () => {
  refs.body.style.backgroundColor = getRandomHexColor();
};
let startId = null;

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onEndClick);
refs.stop.disabled = true;

function onStartClick() {
  startId = setInterval(color, 1000);
  if (startId) {
    refs.start.disabled = true;
    refs.stop.disabled = false;
  }
}
function onEndClick() {
  clearInterval(startId);
  refs.start.disabled = false;
  refs.stop.disabled = true;
}
