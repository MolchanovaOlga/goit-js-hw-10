import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const daysOfTimer = document.querySelector('span[data-days]');
const hoursOfTimer = document.querySelector('span[data-hours]');
const minutesOfTimer = document.querySelector('span[data-minutes]');
const secondsOfTimer = document.querySelector('span[data-seconds]');

const currentDate = new Date();
let userSelectedDate;
const arr = [daysOfTimer, hoursOfTimer, minutesOfTimer, secondsOfTimer];

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      //console.log(selectedDates[0]);
      userSelectedDate = selectedDates[0];
      getUserDate(userSelectedDate);
    },
};

flatpickr("#datetime-picker", options);

function getUserDate(date) {
  if (date <= currentDate) {
    button.setAttribute('disabled', true);
    error();
    } else {
      button.removeAttribute('disabled');
      button.addEventListener('click', addTimer);
    }
}

function error() {
  iziToast.error({
    title: "Error",
    message: "Please choose a date in the future.",
    position: "topRight",
    backgroundColor: "#EF4040",
    //icon: 'octagon',
  });
}

function addTimer() {
  button.setAttribute('disabled', true);
  input.setAttribute('disabled', true);
  let diffOfTime = userSelectedDate.getTime() - currentDate.getTime();
  let setIntervalId;

  setIntervalId = setInterval(() => {
    diffOfTime = diffOfTime - 1000;
    const objOfDifference = convertMs(diffOfTime);
    drawTimer(objOfDifference);

    if (diffOfTime < 0) {
      for (let i = 0; i < arr.length; i += 1) {
        arr[i].textContent = '00';
      }
      clearInterval(setIntervalId);
      button.removeEventListener('click', addTimer);
      return;
    }
  }, 1000);

}

function drawTimer({days, hours, minutes, seconds}) {
  daysOfTimer.textContent = String(days).padStart(2, "0");
  hoursOfTimer.textContent = String(hours).padStart(2, "0");
  minutesOfTimer.textContent = String(minutes).padStart(2, "0");
  secondsOfTimer.textContent = String(seconds).padStart(2, "0");
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}




