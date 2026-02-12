/* --------------------
   POMODORO
-------------------- */

let workTime = 25 * 60;
let timeLeft = workTime;
let timer = null;

const timeEl = document.getElementById("time");
const progressEl = document.getElementById("progress");
const sessionsEl = document.getElementById("sessions");

let sessions = localStorage.getItem("sessions") || 0;
sessionsEl.textContent = sessions;

function updateTime(){
  let min = Math.floor(timeLeft / 60);
  let sec = timeLeft % 60;
  timeEl.textContent =
    `${min}:${sec < 10 ? "0"+sec : sec}`;

  let percent = ((workTime - timeLeft)/workTime)*100;
  progressEl.style.width = percent + "%";
}

document.getElementById("startBtn").onclick = () =>{
  if(timer) return;

  timer = setInterval(()=>{
    if(timeLeft > 0){
      timeLeft--;
      updateTime();
    }else{
      clearInterval(timer);
      timer=null;
      sessions++;
      localStorage.setItem("sessions",sessions);
      sessionsEl.textContent=sessions;
      timeLeft = workTime;
      updateTime();
      alert("Pomodoro Completed!");
    }
  },1000);
}

document.getElementById("resetBtn").onclick = ()=>{
  clearInterval(timer);
  timer=null;
  timeLeft = workTime;
  updateTime();
}

/* --------------------
   EXAM COUNTDOWN
-------------------- */

const dEl=document.getElementById("d");
const hEl=document.getElementById("h");
const mEl=document.getElementById("m");
const sEl=document.getElementById("s");
const percentEl=document.getElementById("percent");
const examInput=document.getElementById("examInput");

let examDate = localStorage.getItem("examDate");

if(examDate){
  examInput.value = examDate;
}

document.getElementById("saveExam").onclick=()=>{
  examDate = examInput.value;
  localStorage.setItem("examDate",examDate);
}

function updateExam(){
  if(!examDate) return;

  const now = new Date().getTime();
  const exam = new Date(examDate).getTime();

  const total = exam - now;
  if(total<=0) return;

  const days=Math.floor(total/(1000*60*60*24));
  const hours=Math.floor((total%(1000*60*60*24))/(1000*60*60));
  const mins=Math.floor((total%(1000*60*60))/(1000*60));
  const secs=Math.floor((total%(1000*60))/1000);

  dEl.textContent=days;
  hEl.textContent=hours;
  mEl.textContent=mins;
  sEl.textContent=secs;

  const startYear = new Date().getFullYear();
  const start = new Date(startYear,0,1).getTime();
  const percent = ((now-start)/(exam-start))*100;
  percentEl.textContent = percent.toFixed(1);
}

setInterval(updateExam,1000);
updateTime();
updateExam();
