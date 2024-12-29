// ============= script.js ============= //

// Wrap everything in DOMContentLoaded so elements exist before we do anything.
document.addEventListener("DOMContentLoaded", () => {
  console.log("Main script loaded.");

  // =========================
  // 1) DEFINE YOUR GAME STATE
  // =========================
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

  // ========================
  // 2) GRAB DOM REFERENCES
  // ========================
  const ageDisplay = document.getElementById("age");
  const healthDisplay = document.getElementById("healthDisplay");
  const happinessDisplay = document.getElementById("happinessDisplay");
  const smartsDisplay = document.getElementById("smartsDisplay");
  const looksDisplay = document.getElementById("looksDisplay");

  const eventLog = document.getElementById("eventLog");

  // ===========================
  // 3) ARRAYS OF RANDOM EVENTS
  // ===========================
  // Add your original events back:
  const events = [
    // Early Life (Ages 0-5)
    {
      text: "You giggled for the first time! (+Happiness)",
      effect: [5],
      stat: "happiness",
      ageRange: [0, 1],
    },
    {
      text: "You started crawling around the house. (+Health)",
      effect: [5],
      stat: "health",
      ageRange: [0, 2],
    },
    {
      text: "You said your first word! (+Smarts)",
      effect: [10],
      stat: "smarts",
      ageRange: [1, 3],
    },
    {
      text: "You took your first steps. (+Happiness)",
      effect: [10],
      stat: "happiness",
      ageRange: [1, 3],
    },
    {
      text: "You had a minor cold. (-Health)",
      effect: [-5],
      stat: "health",
      ageRange: [0, 5],
    },
    // Childhood (Ages 6-12)
    {
      text: "You discovered a talent for drawing. Start a course?",
      choices: ["Yes", "No"],
      effect: [15, 0],
      stat: "happiness",
      ageRange: [6, 12],
    },
    {
      text: "You tripped and fell at school. (-Health)",
      effect: [-5],
      stat: "health",
      ageRange: [6, 12],
    },
    {
      text: "You made a new best friend! (+Happiness)",
      effect: [10],
      stat: "happiness",
      ageRange: [6, 12],
    },
    {
      text: "You started learning how to ride a bike. (+Smarts)",
      effect: [5],
      stat: "smarts",
      ageRange: [6, 12],
    },
    {
      text: "You got lost in a shopping mall. (-Happiness)",
      effect: [-10],
      stat: "happiness",
      ageRange: [6, 12],
    },
    // Teenage (13-19)
    {
      text: "You studied hard for an exam. (+Smarts)",
      effect: [10],
      stat: "smarts",
      ageRange: [13, 19],
    },
    {
      text: "You skipped studying for a fun night out. (-Smarts, +Happiness)",
      effect: [-10, 10],
      stat: ["smarts", "happiness"],
      ageRange: [14, 19],
    },
    {
      text: "You passed an important exam! (+Smarts)",
      effect: [20],
      stat: "smarts",
      ageRange: [15, 19],
    },
    {
      text: "You fell off your bike and injured your leg. (-Health)",
      effect: [-10],
      stat: "health",
      ageRange: [13, 19],
    },
    {
      text: "You attended a concert of your favorite band. (+Happiness)",
      effect: [20],
      stat: "happiness",
      ageRange: [15, 19],
    },
    // Adulthood (Ages 20-64)
    {
      text: "You got promoted at work. (+Happiness, +Smarts)",
      effect: [20, 15],
      stat: ["happiness", "smarts"],
      ageRange: [25, 50],
    },
    {
      text: "You started a business venture. (+Happiness, +Smarts)",
      effect: [20, 10],
      stat: ["happiness", "smarts"],
      ageRange: [25, 50],
    },
    {
      text: "You got food poisoning from a bad meal. (-Health)",
      effect: [-15],
      stat: "health",
      ageRange: [20, 50],
    },
    {
      text: "You joined a yoga class. (+Health, +Happiness)",
      effect: [10, 5],
      stat: ["health", "happiness"],
      ageRange: [25, 64],
    },
    {
      text: "You moved to a new city for a job opportunity. (+Smarts, -Happiness)",
      effect: [15, -10],
      stat: ["smarts", "happiness"],
      ageRange: [20, 50],
    },
    // Retirement (65+)
    {
      text: "You celebrated your retirement. (+Happiness)",
      effect: [30],
      stat: "happiness",
      ageRange: [65, 100],
    },
    {
      text: "You started volunteering in your community. (+Happiness)",
      effect: [15],
      stat: "happiness",
      ageRange: [60, 100],
    },
    {
      text: "You moved to a cozy countryside house. (+Happiness, +Health)",
      effect: [15, 10],
      stat: ["happiness", "health"],
      ageRange: [65, 100],
    },
    {
      text: "You spent quality time with your grandchildren. (+Happiness)",
      effect: [20],
      stat: "happiness",
      ageRange: [65, 100],
    },
    {
      text: "You traveled the world after retiring. (+Happiness, +Smarts)",
      effect: [20, 10],
      stat: ["happiness", "smarts"],
      ageRange: [65, 100],
    },
  ];

  // Relationship events
  const relationshipEvents = [
    {
      text: "Your father invites you to go fishing. Do you accept?",
      choices: ["Yes", "No"],
      effect: [10, -5],
      rel: "father",
      ageRange: [10, 60],
    },
    {
      text: "Your mother asks you to help her with chores. Will you help?",
      choices: ["Yes", "No"],
      effect: [10, -5],
      rel: "mother",
      ageRange: [5, 40],
    },
    {
      text: "Your friend invites you to a birthday party. Will you go?",
      choices: ["Yes", "No"],
      effect: [10, -10],
      rel: "friend",
      ageRange: [5, 18],
    },
  ];

  // ====================
  // 4) CORE GAME LOGIC
  // ====================

  // Save state to localStorage
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
      // Save the event log content if it exists
      eventLog: eventLog ? eventLog.innerHTML : "",
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }

  // Load state from localStorage
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

    if (eventLog && gs.eventLog) {
      eventLog.innerHTML = gs.eventLog;
    }

    updateStatsDisplay();
  }

  // Utility to clamp a stat to 0-100
  function clampStat(val) {
    return Math.max(0, Math.min(100, val));
  }

  // Update the stat displays
  function updateStatsDisplay() {
    if (ageDisplay) ageDisplay.textContent = age;
    if (healthDisplay) healthDisplay.textContent = health;
    if (happinessDisplay) happinessDisplay.textContent = happiness;
    if (smartsDisplay) smartsDisplay.textContent = smarts;
    if (looksDisplay) looksDisplay.textContent = looks;
  }

  // Write a message to the Event Log
  function updateEventLog(msg) {
    if (!eventLog) return;
    const p = document.createElement("p");
    p.textContent = msg;
    eventLog.appendChild(p);
    eventLog.scrollTop = eventLog.scrollHeight;
  }

  // Reset all stats
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

  // ============= Relationship Logic ============
  function updateRelationship(rel, change) {
    if (rel === "father") {
      fatherRel = clampStat(fatherRel + change);
    } else if (rel === "mother") {
      motherRel = clampStat(motherRel + change);
    } else if (rel === "friend") {
      friendRel = clampStat(friendRel + change);
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
      (r) => age >= r.ageRange[0] && age <= r.ageRange[1]
    );
    if (available.length > 0) {
      const randomEvt = available[Math.floor(Math.random() * available.length)];
      handleRelationshipEvent(randomEvt);
    }
  }

  // ============= Random Events Logic ============
  function getRandomEvent() {
    const available = events.filter(
      (e) => age >= e.ageRange[0] && age <= e.ageRange[1]
    );
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
  }

  // If event has choices, confirm, etc.
  function handleChoices(evt) {
    const userChoice = confirm(`${evt.text} (Choose Yes or No)`);
    const effect = userChoice ? evt.effect[0] : (evt.effect[1] || 0);
    updateStat(evt.stat, effect);
    updateEventLog(
      `Age ${age}: ${evt.text} You chose '${userChoice ? "Yes" : "No"}'. (${evt.stat} ${effect >= 0 ? "+" : ""}${effect})`
    );
  }

  // ============= Update Stats =============
  function updateStat(stat, change) {
    // If 'stat' is an array, multiple stats get changed
    if (Array.isArray(stat)) {
      // e.g. stat = ["smarts", "happiness"]
      const changes = Array.isArray(change) ? change : [change];
      for (let i = 0; i < stat.length; i++) {
        updateSingleStat(stat[i], changes[i] || 0);
      }
    } else {
      // single stat
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

  // ============= Achievements & Milestones ============
  function addAchievement(ach) {
    achievements.push(ach);
    updateEventLog(`🏆 Achievement Unlocked: ${ach}`);
    // If you have a list on the page, you can update it, or do it in diary.html
    saveGameState();
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

  // ============= Age Up =============
  let yearsSinceLastRelEvent = 0;
  function ageUp() {
    age++;
    updateStatsDisplay();
    checkMilestones();

    // Try random event
    const evt = getRandomEvent();
    if (evt) {
      if (evt.choices) {
        handleChoices(evt);
      } else {
        // single-choice
        updateStat(evt.stat, evt.effect[0]);
        updateEventLog(`Age ${age}: ${evt.text}`);
      }
    } else {
      updateEventLog(`Age ${age}: Nothing significant happened this year.`);
    }

    // Relationship event every ~3 years
    yearsSinceLastRelEvent++;
    if (yearsSinceLastRelEvent >= 3) {
      triggerRandomRelationshipEvent();
      yearsSinceLastRelEvent = 0;
    }

    checkGameOver();
    saveGameState();
  }

  // Game Over if stats go to 0
  function checkGameOver() {
    if (health <= 0 || happiness <= 0) {
      alert("Game Over!");
      resetGame();
    }
  }

  // ============= Attach Listeners =============
  const resetBtn = document.getElementById("resetGame");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetGame);
  }

  const ageUpBtn = document.getElementById("ageUp");
  if (ageUpBtn) {
    ageUpBtn.addEventListener("click", ageUp);
  }

  // ============= INIT ON LOAD =============
  loadGameState();
  updateStatsDisplay();

  // Expose saveGameState so your inline code can call it if needed
  window.saveGameState = saveGameState;
});
