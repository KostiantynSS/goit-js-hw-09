import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const calendar = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() > selectedDates[0]) {
      btnStart.setAttribute('disabled', '');

      alert('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};
const fp = flatpickr(calendar, options);
const reverseDays = document.querySelector('[data-days]');
const reverseHours = document.querySelector('[data-hours]');
const reverseMinutes = document.querySelector('[data-minutes]');
const reverseSeconds = document.querySelector('[data-seconds]');
const btnStart = document.querySelector('[data-start]');

btnStart.addEventListener('click', startTimer);
let time;
function startTimer() {
  const userDate = fp.selectedDates[0].getTime();
  time = setInterval(() => {
    const currantDate = Date.now();
    const timerMs = userDate - currantDate;
    const { days, hours, minutes, seconds } = convertMs(timerMs);
    reverseDays.textContent = addLeadingZero(days);
    reverseHours.textContent = addLeadingZero(hours);
    reverseMinutes.textContent = addLeadingZero(minutes);
    reverseSeconds.textContent = addLeadingZero(seconds);
    if (timerMs < 1000) {
      clearInterval(time);
    }
  }, 1000);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
