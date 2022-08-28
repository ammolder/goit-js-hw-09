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

function onStartClick() {
  startId = setInterval(color, 1000);
  if (setInterval(color, 1000)) {
    refs.start.disabled = true;
  }
}
function onEndClick() {
  clearInterval(startId);
  refs.start.disabled = false;
}
