document.addEventListener("DOMContentLoaded", () => {
  console.log("Main script loaded.");

  // Example game state
  let age = 0;
  let health = 100;
  let happiness = 100;
  let smarts = 50;
  let looks = 50;

  // Relationships
  let fatherRel = 100;
  let motherRel = 100;
  let friendRel = 50;

  // Achievements
  let achievements = [];

  // DOM references
  const ageDisplay = document.getElementById("age");
  const healthDisplay = document.getElementById("healthDisplay");
  const happinessDisplay = document.getElementById("happinessDisplay");
  const smartsDisplay = document.getElementById("smartsDisplay");
  const looksDisplay = document.getElementById("looksDisplay");

  const eventLog = document.getElementById("eventLog");

  // If you have more references (progress bars, etc.), define them here...

  // Save + Load
  function saveGameState() {
    const gameState = {
      age,
      health,
      happiness,
      smarts,
      looks,
      fatherRel,
      motherRel,
      friendRel,
      achievements,
      eventLog: eventLog ? eventLog.innerHTML : "",
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }

  function loadGameState() {
    const saved = localStorage.getItem("gameState");
    if (!saved) return;
    const gs = JSON.parse(saved);

    age = gs.age;
    health = gs.health;
    happiness = gs.happiness;
    smarts = gs.smarts;
    looks = gs.looks;
    fatherRel = gs.fatherRel;
    motherRel = gs.motherRel;
    friendRel = gs.friendRel;
    achievements = gs.achievements || [];

    if (eventLog && gs.eventLog) eventLog.innerHTML = gs.eventLog;

    updateStatsDisplay();
  }

  // Stats
  function updateStatsDisplay() {
    if (ageDisplay) ageDisplay.textContent = age;
    if (healthDisplay) healthDisplay.textContent = health;
    if (happinessDisplay) happinessDisplay.textContent = happiness;
    if (smartsDisplay) smartsDisplay.textContent = smarts;
    if (looksDisplay) looksDisplay.textContent = looks;
  }

  function ageUp() {
    age++;
    updateStatsDisplay();
    updateEventLog(`You aged to ${age}!`);
    saveGameState();
  }

  function updateEventLog(msg) {
    if (!eventLog) return;
    const p = document.createElement("p");
    p.textContent = msg;
    eventLog.appendChild(p);
    eventLog.scrollTop = eventLog.scrollHeight;
  }

  function resetGame() {
    age = 0;
    health = 100;
    happiness = 100;
    smarts = 50;
    looks = 50;
    fatherRel = 100;
    motherRel = 100;
    friendRel = 50;
    achievements = [];
    if (eventLog) eventLog.innerHTML = "";
    updateEventLog("Game has been reset!");
    saveGameState();
    updateStatsDisplay();
  }

  // Attach event listeners if they exist
  const resetBtn = document.getElementById("resetGame");
  if (resetBtn) resetBtn.addEventListener("click", resetGame);

  const ageUpBtn = document.getElementById("ageUp");
  if (ageUpBtn) ageUpBtn.addEventListener("click", ageUp);

  // On load
  loadGameState();
  updateStatsDisplay();

  // Expose globally so index.html inline JS can call them
  window.saveGameState = saveGameState;
});
