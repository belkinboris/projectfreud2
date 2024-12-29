// Wrap everything in DOMContentLoaded so elements exist before we do anything.
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded!");

  // =========================
  // 1) DEFINE YOUR GAME STATE
  // =========================
  let age = 0;
  let happiness = 100;
  let health = 100;
  let smarts = 50;
  let looks = 50;

  // Relationships
  let fatherRel = 100;
  let motherRel = 100;
  let friendRel = 50;

  // Achievements
  let achievements = [];

  // ========================
  // 2) GRAB DOM REFERENCES
  // ========================
  const ageDisplay = document.getElementById("age");
  const eventLog = document.getElementById("eventLog");
  const happinessBar = document.getElementById("happinessBar");
  const healthBar = document.getElementById("healthBar");
  const smartsBar = document.getElementById("smartsBar");
  const looksBar = document.getElementById("looksBar");
  const fatherRelDisplay = document.getElementById("fatherRel");
  const motherRelDisplay = document.getElementById("motherRel");
  const friendRelDisplay = document.getElementById("friendRel");
  const achievementsList = document.getElementById("achievementsList");
  const introPage = document.getElementById("introPage");
  const appContent = document.getElementById("appContent");
  const createAccountButton = document.getElementById("createAccount");
  const loginButton = document.getElementById("login");
  const acceptTerms = document.getElementById("acceptTerms");

  // ==========================
  // 3) EXPOSED GLOBAL FUNCTIONS
  // ==========================
  window.goToDiary = function goToDiary() {
    saveGameState();
    window.location.href = "diary.html";
  };

  window.goToMicroLevel = function goToMicroLevel() {
    saveGameState();
    window.location.href = "micro.html";
  };

  // ===============================
  // 4) ALL OTHER LOCAL GAME LOGIC
  // ===============================

  // Disable Create/Login buttons until terms are accepted
  function toggleButtons() {
    const disabled = !acceptTerms.checked;
    createAccountButton.disabled = disabled;
    loginButton.disabled = disabled;
  }

  acceptTerms.addEventListener("change", toggleButtons);

  // Show app content, hide intro
  function proceedToApp() {
    introPage.style.display = "none";
    appContent.style.display = "block";
  }

  createAccountButton.addEventListener("click", proceedToApp);
  loginButton.addEventListener("click", proceedToApp);

  toggleButtons(); // Initialize

  // EVENTS (Random, Relationship, etc.)
  const events = [
    // Early Life (0-5)
    { text: "You giggled for the first time! (+Happiness)", effect: [5], stat: "happiness", ageRange: [0, 1] },
    { text: "You started crawling around the house. (+Health)", effect: [5], stat: "health", ageRange: [0, 2] },
    { text: "You said your first word! (+Smarts)", effect: [10], stat: "smarts", ageRange: [1, 3] },
    { text: "You took your first steps. (+Happiness)", effect: [10], stat: "happiness", ageRange: [1, 3] },
    { text: "You had a minor cold. (-Health)", effect: [-5], stat: "health", ageRange: [0, 5] },

    // Childhood (6-12)
    { text: "You discovered a talent for drawing. Start a course?", choices: ["Yes", "No"], effect: [15, 0], stat: "happiness", ageRange: [6, 12] },
    { text: "You tripped and fell at school. (-Health)", effect: [-5], stat: "health", ageRange: [6, 12] },
    { text: "You made a new best friend! (+Happiness)", effect: [10], stat: "happiness", ageRange: [6, 12] },
    { text: "You started learning how to ride a bike. (+Smarts)", effect: [5], stat: "smarts", ageRange: [6, 12] },
    { text: "You got lost in a shopping mall. (-Happiness)", effect: [-10], stat: "happiness", ageRange: [6, 12] },

    // Teenage (13-19)
    { text: "You studied hard for an exam. (+Smarts)", effect: [10], stat: "smarts", ageRange: [13, 19] },
    { text: "You skipped studying for a fun night out. (-Smarts, +Happiness)", effect: [-10, 10], stat: ["smarts", "happiness"], ageRange: [14, 19] },
    { text: "You passed an important exam! (+Smarts)", effect: [20], stat: "smarts", ageRange: [15, 19] },
    { text: "You fell off your bike and injured your leg. (-Health)", effect: [-10], stat: "health", ageRange: [13, 19] },
    { text: "You attended a concert of your favorite band. (+Happiness)", effect: [20], stat: "happiness", ageRange: [15, 19] },

    // Adulthood (20-64)
    { text: "You got promoted at work. (+Happiness, +Smarts)", effect: [20, 15], stat: ["happiness", "smarts"], ageRange: [25, 50] },
    { text: "You started a business venture. (+Happiness, +Smarts)", effect: [20, 10], stat: ["happiness", "smarts"], ageRange: [25, 50] },
    { text: "You got food poisoning from a bad meal. (-Health)", effect: [-15], stat: "health", ageRange: [20, 50] },
    { text: "You joined a yoga class. (+Health, +Happiness)", effect: [10, 5], stat: ["health", "happiness"], ageRange: [25, 64] },
    { text: "You moved to a new city for a job opportunity. (+Smarts, -Happiness)", effect: [15, -10], stat: ["smarts", "happiness"], ageRange: [20, 50] },

    // Retirement (65+)
    { text: "You celebrated your retirement. (+Happiness)", effect: [30], stat: "happiness", ageRange: [65, 100] },
    { text: "You started volunteering in your community. (+Happiness)", effect: [15], stat: "happiness", ageRange: [60, 100] },
    { text: "You moved to a cozy countryside house. (+Happiness, +Health)", effect: [15, 10], stat: ["happiness", "health"], ageRange: [65, 100] },
    { text: "You spent quality time with your grandchildren. (+Happiness)", effect: [20], stat: "happiness", ageRange: [65, 100] },
    { text: "You traveled the world after retiring. (+Happiness, +Smarts)", effect: [20, 10], stat: ["happiness", "smarts"], ageRange: [65, 100] },
  ];

  const relationshipEvents = [
    { text: "Your father invites you to go fishing. Do you accept?", choices: ["Yes", "No"], effect: [10, -5], rel: "father", ageRange: [10, 60] },
    { text: "Your mother asks you to help her with chores. Will you help?", choices: ["Yes", "No"], effect: [10, -5], rel: "mother", ageRange: [5, 40] },
    { text: "Your friend invites you to a birthday party. Will you go?", choices: ["Yes", "No"], effect: [10, -10], rel: "friend", ageRange: [5, 18] },
  ];

  // ====================
  // CORE GAME FUNCTIONS
  // ====================

  function saveGameState() {
    const gameState = {
      age,
      happiness,
      health,
      smarts,
      looks,
      fatherRel,
      motherRel,
      friendRel,
      achievements,
      eventLog: eventLog.innerHTML,
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }

  function loadGameState() {
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
      const gameState = JSON.parse(savedState);

      age = gameState.age;
      happiness = gameState.happiness;
      health = gameState.health;
      smarts = gameState.smarts;
      looks = gameState.looks;
      fatherRel = gameState.fatherRel;
      motherRel = gameState.motherRel;
      friendRel = gameState.friendRel;
      achievements = gameState.achievements || [];
      eventLog.innerHTML = gameState.eventLog || "";

      updateStatsDisplay();
      updateAchievementsDisplay();
    }
  }

  function updateRelationship(rel, change) {
    if (rel === "father") {
      fatherRel = clampStat(fatherRel + change);
      if (fatherRelDisplay) fatherRelDisplay.textContent = fatherRel;
    } else if (rel === "mother") {
      motherRel = clampStat(motherRel + change);
      if (motherRelDisplay) motherRelDisplay.textContent = motherRel;
    } else if (rel === "friend") {
      friendRel = clampStat(friendRel + change);
      if (friendRelDisplay) friendRelDisplay.textContent = friendRel;
    }
    saveGameState();
  }

  function handleRelationshipEvent(evt) {
    const userChoice = confirm(`${evt.text} (Choose Yes or No)`);
    if (userChoice) {
      updateRelationship(evt.rel, evt.effect[0]);
      updateEventLog(`You chose 'Yes'. Your relationship with ${evt.rel} improved! (+${evt.effect[0]}%)`);
    } else {
      updateRelationship(evt.rel, evt.effect[1]);
      updateEventLog(`You chose 'No'. Your relationship with ${evt.rel} worsened. (${evt.effect[1]}%)`);
    }
  }

  function triggerRandomRelationshipEvent() {
    const available = relationshipEvents.filter(
      (item) => age >= item.ageRange[0] && age <= item.ageRange[1]
    );
    if (available.length > 0) {
      const randomEvt = available[Math.floor(Math.random() * available.length)];
      handleRelationshipEvent(randomEvt);
    }
  }

  function getRandomEvent() {
    const available = events.filter(
      (e) => age >= e.ageRange[0] && age <= e.ageRange[1]
    );
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  }

  let yearsSinceLastRelEvent = 0;

  function ageUp() {
    age++;
    updateStatsDisplay();
    checkMilestones();

    const evt = getRandomEvent();
    if (evt) {
      if (evt.choices) {
        handleChoices(evt);
      } else {
        updateStat(evt.stat, evt.effect[0]);
        updateEventLog(`Age ${age}: ${evt.text}`);
      }
    } else {
      updateEventLog(`Age ${age}: Nothing significant happened this year.`);
    }

    yearsSinceLastRelEvent++;
    if (yearsSinceLastRelEvent >= 3) {
      triggerRandomRelationshipEvent();
      yearsSinceLastRelEvent = 0;
    }

    checkGameOver();
  }

  function handleChoices(evt) {
    const userChoice = confirm(`${evt.text} (Choose Yes or No)`);
    const effect = userChoice ? evt.effect[0] : evt.effect[1] || 0;
    updateStat(evt.stat, effect);
    updateEventLog(
      `Age ${age}: ${evt.text} You chose '${userChoice ? "Yes" : "No"}'. (${evt.stat} ${effect >= 0 ? "+" : ""}${effect})`
    );
  }

  function checkMilestones() {
    switch (age) {
      case 1:
        updateEventLog("🎉 You celebrated your first birthday!");
        addAchievement("First Birthday");
        break;
      case 6:
        updateEventLog("🎒 You started elementary school!");
        addAchievement("Started Elementary School");
        break;
      case 18:
        updateEventLog("🎓 You graduated high school!");
        addAchievement("Graduated High School");
        break;
      case 65:
        updateEventLog("🎉 You reached retirement age!");
        addAchievement("Retired");
        break;
    }
  }

  function addAchievement(name) {
    achievements.push(name);
    updateEventLog(`🏆 Achievement Unlocked: ${name}`);
    updateAchievementsDisplay();
  }

  function updateAchievementsDisplay() {
    if (!achievementsList) return;
    achievementsList.innerHTML = "";
    achievements.forEach((ach) => {
      const li = document.createElement("li");
      li.textContent = ach;
      achievementsList.appendChild(li);
    });
  }

  function updateStat(stat, change) {
    if (Array.isArray(stat)) {
      const changes = Array.isArray(change) ? change : [change];
      for (let i = 0; i < stat.length; i++) {
        updateSingleStat(stat[i], changes[i] || 0);
      }
    } else {
      updateSingleStat(stat, change);
    }
    updateStatsDisplay();
  }

  function updateSingleStat(st, ch) {
    switch (st) {
      case "health":
        health = clampStat(health + ch);
        break;
      case "happiness":
        happiness = clampStat(happiness + ch);
        break;
      case "smarts":
        smarts = clampStat(smarts + ch);
        break;
      case "looks":
        looks = clampStat(looks + ch);
        break;
    }
  }

  function clampStat(val) {
    return Math.max(0, Math.min(100, val));
  }

  function updateStatsDisplay() {
    if (ageDisplay) ageDisplay.textContent = age;
    if (happinessBar) happinessBar.style.width = happiness + "%";
    if (healthBar) healthBar.style.width = health + "%";
    if (smartsBar) smartsBar.style.width = smarts + "%";
    if (looksBar) looksBar.style.width = looks + "%";
  }

  function updateEventLog(msg) {
    const p = document.createElement("p");
    p.textContent = msg;
    eventLog.appendChild(p);
    eventLog.scrollTop = eventLog.scrollHeight;
  }

  function resetGame() {
    age = 0;
    happiness = 100;
    health = 100;
    smarts = 50;
    looks = 50;
    fatherRel = 100;
    motherRel = 100;
    friendRel = 50;
    achievements = [];
    eventLog.innerHTML = "";
    updateEventLog("Game has been reset. Start again!");
    saveGameState();
    updateStatsDisplay();
  }

  function checkGameOver() {
    if (health <= 0 || happiness <= 0) {
      alert("Game Over!");
      resetGame();
    }
  }

  // Attach listeners
  document.getElementById("ageUp").addEventListener("click", ageUp);
  document.getElementById("resetGame").addEventListener("click", resetGame);

  // Initialize on load
  loadGameState();
});
