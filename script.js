// Wrap everything in DOMContentLoaded to ensure DOM is ready before accessing elements
document.addEventListener("DOMContentLoaded", () => {
    console.log("Debugging DOM elements:");
    console.log("age:", document.getElementById("age"));
    console.log("happinessBar:", document.getElementById("happinessBar"));
    console.log("healthBar:", document.getElementById("healthBar"));
    console.log("smartsBar:", document.getElementById("smartsBar"));
    console.log("looksBar:", document.getElementById("looksBar"));
    console.log("eventLog:", document.getElementById("eventLog"));
    console.log("ageUp:", document.getElementById("ageUp"));
    console.log("resetGame:", document.getElementById("resetGame"));

    // Player stats 
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

// DOM elements
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

// Disable buttons until terms are accepted
const toggleButtons = () => {
    const disabled = !acceptTerms.checked;
    createAccountButton.disabled = disabled;
    loginButton.disabled = disabled;
};

acceptTerms.addEventListener("change", toggleButtons);

// Show app content and hide intro page
const proceedToApp = () => {
    introPage.style.display = "none";
    appContent.style.display = "block";
};

// Event Listeners
createAccountButton.addEventListener("click", proceedToApp);
loginButton.addEventListener("click", proceedToApp);

// Initialize buttons state
toggleButtons();

// Debugging logs for the assigned variables
console.log("ageDisplay:", ageDisplay); // Should log <span id="age">
console.log("happinessBar:", happinessBar); // Should log <div id="happinessBar">
console.log("healthBar:", healthBar); // Should log <div id="healthBar">
console.log("smartsBar:", smartsBar); // Should log <div id="smartsBar">
console.log("looksBar:", looksBar); // Should log <div id="looksBar">
console.log("eventLog:", eventLog); // Should log <div id="eventLog">
    
// Events with and without choices
const events = [
    // Early Life (Ages 0-5)
    {
        text: "You giggled for the first time! (+Happiness)",
        effect: [5],
        stat: "happiness",
        rarity: "common",
        category: "earlyLife",
        ageRange: [0, 1]
    },
    {
        text: "You started crawling around the house. (+Health)",
        effect: [5],
        stat: "health",
        rarity: "common",
        category: "earlyLife",
        ageRange: [0, 2]
    },
    {
        text: "You said your first word! (+Smarts)",
        effect: [10],
        stat: "smarts",
        rarity: "milestone",
        category: "earlyLife",
        ageRange: [1, 3]
    },
    {
        text: "You took your first steps. (+Happiness)",
        effect: [10],
        stat: "happiness",
        rarity: "milestone",
        category: "earlyLife",
        ageRange: [1, 3]
    },
    {
        text: "You had a minor cold. (-Health)",
        effect: [-5],
        stat: "health",
        rarity: "common",
        category: "earlyLife",
        ageRange: [0, 5]
    },

    // Childhood (Ages 6-12)
    {
        text: "You discovered a talent for drawing. Start a course?",
        choices: ["Yes", "No"],
        effect: [15, 0],
        stat: "happiness",
        rarity: "rare",
        category: "childhood",
        ageRange: [6, 12]
    },
    {
        text: "You tripped and fell at school. (-Health)",
        effect: [-5],
        stat: "health",
        rarity: "common",
        category: "childhood",
        ageRange: [6, 12]
    },
    {
        text: "You made a new best friend! (+Happiness)",
        effect: [10],
        stat: "happiness",
        rarity: "rare",
        category: "childhood",
        ageRange: [6, 12]
    },
    {
        text: "You started learning how to ride a bike. (+Smarts)",
        effect: [5],
        stat: "smarts",
        rarity: "common",
        category: "childhood",
        ageRange: [6, 12]
    },
    {
        text: "You got lost in a shopping mall. (-Happiness)",
        effect: [-10],
        stat: "happiness",
        rarity: "rare",
        category: "childhood",
        ageRange: [6, 12]
    },

    // Teenage (Ages 13-19)
    {
        text: "You studied hard for an exam. (+Smarts)",
        effect: [10],
        stat: "smarts",
        rarity: "common",
        category: "teenage",
        ageRange: [13, 19]
    },
    {
        text: "You skipped studying for a fun night out. (-Smarts, +Happiness)",
        effect: [-10, 10],
        stat: ["smarts", "happiness"],
        rarity: "common",
        category: "teenage",
        ageRange: [13, 19]
    },
    {
        text: "You passed an important exam! (+Smarts)",
        effect: [20],
        stat: "smarts",
        rarity: "milestone",
        category: "teenage",
        ageRange: [15, 19]
    },
    {
        text: "You fell off your bike and injured your leg. (-Health)",
        effect: [-10],
        stat: "health",
        rarity: "common",
        category: "teenage",
        ageRange: [13, 19]
    },
    {
        text: "You attended a concert of your favorite band. (+Happiness)",
        effect: [20],
        stat: "happiness",
        rarity: "rare",
        category: "teenage",
        ageRange: [15, 19]
    },

    // Adulthood (Ages 20-64)
    {
        text: "You got promoted at work. (+Happiness, +Smarts)",
        effect: [20, 15],
        stat: ["happiness", "smarts"],
        rarity: "milestone",
        category: "adulthood",
        ageRange: [25, 50]
    },
    {
        text: "You started a business venture. (+Happiness, +Smarts)",
        effect: [20, 10],
        stat: ["happiness", "smarts"],
        rarity: "milestone",
        category: "adulthood",
        ageRange: [25, 50]
    },
    {
        text: "You got food poisoning from a bad meal. (-Health)",
        effect: [-15],
        stat: "health",
        rarity: "common",
        category: "adulthood",
        ageRange: [20, 50]
    },
    {
        text: "You joined a yoga class. (+Health, +Happiness)",
        effect: [10, 5],
        stat: ["health", "happiness"],
        rarity: "rare",
        category: "adulthood",
        ageRange: [25, 64]
    },
    {
        text: "You moved to a new city for a job opportunity. (+Smarts, -Happiness)",
        effect: [15, -10],
        stat: ["smarts", "happiness"],
        rarity: "rare",
        category: "adulthood",
        ageRange: [20, 50]
    },

    // Retirement (Ages 65+)
    {
        text: "You celebrated your retirement. (+Happiness)",
        effect: [30],
        stat: "happiness",
        rarity: "milestone",
        category: "retirement",
        ageRange: [65, 100]
    },
    {
        text: "You started volunteering in your community. (+Happiness)",
        effect: [15],
        stat: "happiness",
        rarity: "rare",
        category: "retirement",
        ageRange: [60, 100]
    },
    {
        text: "You moved to a cozy countryside house. (+Happiness, +Health)",
        effect: [15, 10],
        stat: ["happiness", "health"],
        rarity: "milestone",
        category: "retirement",
        ageRange: [65, 100]
    },
    {
        text: "You spent quality time with your grandchildren. (+Happiness)",
        effect: [20],
        stat: "happiness",
        rarity: "rare",
        category: "retirement",
        ageRange: [65, 100]
    },
    {
        text: "You traveled the world after retiring. (+Happiness, +Smarts)",
        effect: [20, 10],
        stat: ["happiness", "smarts"],
        rarity: "rare",
        category: "retirement",
        ageRange: [65, 100]
    }
];

// Relationship events
const relationshipEvents = [
    {
        text: "Your father invites you to go fishing. Do you accept?",
        choices: ["Yes", "No"],
        effect: [10, -5],
        rel: "father",
        ageRange: [10, 60]
    },
    {
        text: "Your mother asks you to help her with chores. Will you help?",
        choices: ["Yes", "No"],
        effect: [10, -5],
        rel: "mother",
        ageRange: [5, 40]
    },
    {
        text: "Your friend invites you to a birthday party. Will you go?",
        choices: ["Yes", "No"],
        effect: [10, -10],
        rel: "friend",
        ageRange: [5, 18]
    }
];

// Handle relationship events
function handleRelationshipEvent(event) {
    const userChoice = confirm(`${event.text} (Choose Yes or No)`);
    if (userChoice) {
        updateRelationship(event.rel, event.effect[0]);
        updateEventLog(`You chose 'Yes'. Your relationship with ${event.rel} improved! (+${event.effect[0]}%)`);
    } else {
        updateRelationship(event.rel, event.effect[1]);
        updateEventLog(`You chose 'No'. Your relationship with ${event.rel} worsened. (${event.effect[1]}%)`);
    }
}

// Update relationship stats
function updateRelationship(rel, change) {
    if (rel === "father") {
        fatherRel = Math.max(0, Math.min(100, fatherRel + change));
        if (fatherRelDisplay) fatherRelDisplay.textContent = fatherRel;
    } else if (rel === "mother") {
        motherRel = Math.max(0, Math.min(100, motherRel + change));
        if (motherRelDisplay) motherRelDisplay.textContent = motherRel;
    } else if (rel === "friend") {
        friendRel = Math.max(0, Math.min(100, friendRel + change));
        if (friendRelDisplay) friendRelDisplay.textContent = friendRel;
    }
    saveGameState(); // Save the updated state
}

// Filter events by age
function getRandomEvent() {
    const availableEvents = events.filter(event => age >= event.ageRange[0] && age <= event.ageRange[1]);
    if (availableEvents.length === 0) {
        return null; // No events for this age
    }
    return availableEvents[Math.floor(Math.random() * availableEvents.length)];
}

// Randomly trigger relationship events
function triggerRandomRelationshipEvent() {
    const availableEvents = relationshipEvents.filter(event => age >= event.ageRange[0] && age <= event.ageRange[1]);
    if (availableEvents.length > 0) {
        const event = availableEvents[Math.floor(Math.random() * availableEvents.length)];
        handleRelationshipEvent(event);
    }
}

let yearsSinceLastRelEvent = 0;

function ageUp() {
    age++; // Increment age
    updateStatsDisplay(); // Update the stats display with the new age
    checkMilestones(); // Check if the new age triggers any milestone

    // Trigger an age-appropriate stat event or question
    const event = getRandomEvent();
    if (event) {
        if (event.choices) {
            handleChoices(event); // Handle events with choices
        } else {
            updateStat(event.stat, event.effect[0]); // Apply the stat effect
            updateEventLog(`Age ${age}: ${event.text}`);
        }
    } else {
        updateEventLog(`Age ${age}: Nothing significant happened this year.`);
    }

    // Trigger a relationship event every 3-5 years
    yearsSinceLastRelEvent++;
    if (yearsSinceLastRelEvent >= 3) {
        triggerRandomRelationshipEvent();
        yearsSinceLastRelEvent = 0;
    }

    checkGameOver();
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

function addAchievement(achievement) {
    achievements.push(achievement);
    updateEventLog(`🏆 Achievement Unlocked: ${achievement}`);
    updateAchievementsDisplay();
}

function updateAchievementsDisplay() {
    if (!achievementsList) return;
    achievementsList.innerHTML = "";
    achievements.forEach(achievement => {
        const listItem = document.createElement("li");
        listItem.textContent = achievement;
        achievementsList.appendChild(listItem);
    });
}

function handleChoices(event) {
    const userChoice = confirm(`${event.text} (Choose Yes or No)`);
    const effect = userChoice ? event.effect[0] : event.effect[1] || 0;
    updateStat(event.stat, effect);
    updateEventLog(`Age ${age}: ${event.text} You chose '${userChoice ? "Yes" : "No"}'. (${event.stat} ${effect > 0 ? "+" : ""}${effect})`);
}

function updateStatsDisplay() {
    console.log("Updating stats...");

    if (ageDisplay) {
        ageDisplay.textContent = age;
    } else {
        console.error("ageDisplay is null or missing!");
    }

    if (happinessBar) {
        happinessBar.style.width = `${happiness}%`;
    } else {
        console.error("happinessBar is null or missing!");
    }

    if (healthBar) {
        healthBar.style.width = `${health}%`;
    } else {
        console.error("healthBar is null or missing!");
    }

    if (smartsBar) {
        smartsBar.style.width = `${smarts}%`;
    } else {
        console.error("smartsBar is null or missing!");
    }

    if (looksBar) {
        looksBar.style.width = `${looks}%`;
    } else {
        console.error("looksBar is null or missing!");
    }
}

    function updateStat(stat, change) {
        // Ensure the stat is modified and clamped to valid ranges (0-100)
        if (stat === "health") health = Math.max(0, Math.min(100, health + change));
        if (stat === "happiness") happiness = Math.max(0, Math.min(100, happiness + change));
        if (stat === "smarts") smarts = Math.max(0, Math.min(100, smarts + change));
        if (stat === "looks") looks = Math.max(0, Math.min(100, looks + change));
        updateStatsDisplay(); // Call to refresh the UI after stat update
    }

function updateStatsDisplay() {
    // Update the numeric stat displays
    ageDisplay.textContent = age;
    happinessBar.textContent = happiness;
    healthBar.textContent = health;
    smartsBar.textContent = smarts;
    looksBar.textContent = looks;

    // Update the progress bars visually
    document.getElementById("happinessBar").style.width = `${happiness}%`;
    document.getElementById("healthBar").style.width = `${health}%`;
    document.getElementById("smartsBar").style.width = `${smarts}%`;
    document.getElementById("looksBar").style.width = `${looks}%`;
}

function updateEventLog(message) {
    const newEvent = document.createElement("p"); // Create a new paragraph element
    newEvent.textContent = message; // Set the event message as its text content
    eventLog.appendChild(newEvent); // Append the new event to the event log
    // Scroll to the bottom to ensure the latest message is visible
    eventLog.scrollTop = eventLog.scrollHeight;
}

function getRandomEvent() {
    // Filter events to include only those that match the character's current age
    const availableEvents = events.filter(event => age >= event.ageRange[0] && age <= event.ageRange[1]);

    if (availableEvents.length === 0) {
        console.log(`No available events for age ${age}.`);
        return null; // If no events match the current age, return null
    }

    return availableEvents[Math.floor(Math.random() * availableEvents.length)];
}

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
        eventLog: eventLog.innerHTML // Save the current event log content
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
}

function loadGameState() {
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
        const gameState = JSON.parse(savedState);

        // Restore player stats
        age = gameState.age;
        happiness = gameState.happiness;
        health = gameState.health;
        smarts = gameState.smarts;
        looks = gameState.looks;

        // Restore relationships
        fatherRel = gameState.fatherRel;
        motherRel = gameState.motherRel;
        friendRel = gameState.friendRel;

        // Restore achievements
        achievements = gameState.achievements || [];

        // Restore event log
        eventLog.innerHTML = gameState.eventLog || "";

        // Update UI
        updateStatsDisplay();
        updateAchievementsDisplay();
    }
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
    eventLog.innerHTML = ""; // Clear the event log
    updateEventLog("Game has been reset. Start again!");
    saveGameState();
    updateStatsDisplay();
    }

function goToDiary() {
    saveGameState();
    window.location.href = "diary.html";
}

function checkGameOver() {
    if (health <= 0 || happiness <= 0) {
        alert("Game Over!");
        resetGame();
    }
}

// Event listeners
document.getElementById("ageUp").addEventListener("click", ageUp);
document.getElementById("resetGame").addEventListener("click", resetGame);

// Load game state on page load
loadGameState();
});