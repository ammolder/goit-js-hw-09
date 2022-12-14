import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  data: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = 0;
let deltaTime = 0;
const startedTime = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    pasteDate();
    refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.minutes.textContent = '00';
    refs.seconds.textContent = '00';
  },
};

refs.start.addEventListener('click', onButtonStartClick);
refs.stop.addEventListener('click', onButtonStopClick);
refs.start.disabled = true;
refs.stop.disabled = true;

flatpickr(refs.data, options);

function pasteDate() {
  if (selectedDate - startedTime <= 0) {
    refs.start.disabled = true;
    refs.stop.disabled = true;
    Notify.failure('Please choose a date in the future');
    clearInterval(timer.intervalId);

    timer.isActive = false;
  }
  if (selectedDate - startedTime > 0) {
    Notify.success('Very well');
    refs.start.disabled = false;
    refs.stop.disabled = true;
  }
}

function onButtonStartClick() {
  timer.start();
}
function onButtonStopClick() {
  refs.start.disabled = false;
  refs.stop.disabled = true;
  clearInterval(timer.intervalId);
  timer.isActive = false;
}

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      refs.start.disabled = false;
      return;
    }

    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      this.isActive = true;
      refs.start.disabled = true;
      refs.stop.disabled = false;

      deltaTime = selectedDate - startTime;

      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      refs.days.textContent = days;
      refs.hours.textContent = hours;
      refs.minutes.textContent = minutes;
      refs.seconds.textContent = seconds;

      if (
        refs.days.textContent === '00' &&
        refs.hours.textContent === '00' &&
        refs.minutes.textContent === '00' &&
        refs.seconds.textContent === '00'
      ) {
        refs.stop.disabled = true;

        this.isActive = false;
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
