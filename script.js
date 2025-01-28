const deathsPerSecond = 0.5676;
let sessionStartTime = null;
let sessionElapsed = 0;
let sessionInterval = null;

// Calculate the seconds since the beginning of the year
const now = new Date();
const startOfYear = new Date(now.getFullYear(), 0, 1);
const secondsSinceStartOfYear = Math.floor((now - startOfYear) / 1000);
let yearlyDeaths = secondsSinceStartOfYear * deathsPerSecond;

// Update yearly counter in real time
function updateYearlyDeaths() {
  const yearlyCounter = document.getElementById("yearly-counter");
  yearlyDeaths += deathsPerSecond;
  yearlyCounter.textContent = Math.floor(yearlyDeaths);
  setTimeout(updateYearlyDeaths, 1000);
}

// Start session counter and reset values
function startSession() {
  const startButton = document.getElementById("start-button");
  const stopButton = document.getElementById("stop-button");

  // Reset session variables
  sessionElapsed = 0;
  sessionStartTime = Date.now();

  // Reset displayed values
  document.getElementById("seconds-elapsed").textContent = 0;
  document.getElementById("session-deaths").textContent = 0;

  // Update button states
  startButton.disabled = true;
  stopButton.disabled = false;

  // Start the session interval
  sessionInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);
    const totalElapsed = sessionElapsed + elapsedSeconds;
    document.getElementById("seconds-elapsed").textContent = totalElapsed;
    document.getElementById("session-deaths").textContent = Math.floor(totalElapsed * deathsPerSecond);
  }, 1000);
}

// Stop session counter
function stopSession() {
  const startButton = document.getElementById("start-button");
  const stopButton = document.getElementById("stop-button");

  clearInterval(sessionInterval);
  const elapsedSeconds = (Date.now() - sessionStartTime) / 1000;
  sessionElapsed += elapsedSeconds;

  startButton.disabled = false;
  stopButton.disabled = true;
}

// Attach event listeners
document.getElementById("start-button").addEventListener("click", startSession);
document.getElementById("stop-button").addEventListener("click", stopSession);

// Start the yearly counter
updateYearlyDeaths();