// Pomodoro
let time = 25 * 60;
let timerInterval;
let completed = 0;

const timerEl = document.getElementById("timer");
const progressEl = document.getElementById("progress");
const countEl = document.getElementById("count");

document.getElementById("startBtn").onclick = () => {
  if(timerInterval) return;

  timerInterval = setInterval(() => {
    if(time <= 0){
      clearInterval(timerInterval);
      timerInterval = null;
      completed++;
      countEl.innerText = completed;
      time = 25 * 60;
      return;
    }
    time--;
    updateTimer();
  },1000);
};

document.getElementById("resetBtn").onclick = () => {
  clearInterval(timerInterval);
  timerInterval = null;
  time = 25 * 60;
  updateTimer();
};

function updateTimer(){
  let m = Math.floor(time/60);
  let s = time%60;
  timerEl.innerText = 
    `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
  
  progressEl.style.width = 
    ((1 - time/(25*60))*100) + "%";
}

updateTimer();

// Exam Countdown
const examDateInput = document.getElementById("examDate");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const progressText = document.getElementById("examProgress");

let examDate = null;

document.getElementById("saveDate").onclick = () => {
  examDate = new Date(examDateInput.value);
};

setInterval(() => {
  if(!examDate) return;

  const now = new Date();
  const diff = examDate - now;

  if(diff <= 0) return;

  const d = Math.floor(diff/1000/60/60/24);
  const h = Math.floor(diff/1000/60/60)%24;
  const m = Math.floor(diff/1000/60)%60;
  const s = Math.floor(diff/1000)%60;

  daysEl.innerText = d;
  hoursEl.innerText = h;
  minutesEl.innerText = m;
  secondsEl.innerText = s;

},1000);
