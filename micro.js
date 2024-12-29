/*********************************
 * Micro-Level Interactions Script
 **********************************/

// Load or create default state
let microGameState = {
  age: 0,
  happiness: 100,
  health: 100,
  smarts: 50,
  looks: 50,
  fatherRel: 100,
  motherRel: 100,
  friendRel: 50,
  achievements: [],
  eventLog: "",
};

// Attempt to load
const existingState = localStorage.getItem("gameState");
if (existingState) {
  microGameState = JSON.parse(existingState);
}

// DOM
const microChatLog = document.getElementById("microChatLog");
const microInput = document.getElementById("microInput");

// Go back
function saveGameState() {
  localStorage.setItem("gameState", JSON.stringify(microGameState));
}

// KeyDown
function handleKeyDown(evt) {
  if (evt.key === "Enter") handleMicroAction();
}

// Main action
function handleMicroAction() {
  const userText = (microInput.value || "").trim();
  if (!userText) return;
  addMessageToChat("You", userText);
  microInput.value = "";

  const response = generateAiResponse(userText);
  addMessageToChat("Game", response);

  handleStatChanges(userText.toLowerCase());
  saveGameState();
}

function addMessageToChat(sender, text) {
  const div = document.createElement("div");
  div.classList.add("micro-message");
  if (sender === "You") {
    div.classList.add("micro-message-user");
  } else {
    div.classList.add("micro-message-ai");
  }
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  microChatLog.appendChild(div);
  microChatLog.scrollTop = microChatLog.scrollHeight;
}

function generateAiResponse(msg) {
  if (msg.includes("professor")) {
    return "The professor replies: 'What can I help you with?'";
  } else if (msg.includes("rob a bank")) {
    return "You hatch a heist plan... success is uncertain. Proceed carefully!";
  }
  return "Interesting move. What's next?";
}

function handleStatChanges(msg) {
  if (msg.includes("rob a bank")) {
    const success = Math.random() < 0.3;
    if (success) {
      addMessageToChat("System", "Bank robbery succeeded! +Happiness, -Smarts");
      microGameState.happiness = Math.min(microGameState.happiness + 10, 100);
      microGameState.smarts = Math.max(microGameState.smarts - 5, 0);
    } else {
      addMessageToChat("System", "You got caught! -Health, -Happiness");
      microGameState.health = Math.max(microGameState.health - 30, 0);
      microGameState.happiness = Math.max(microGameState.happiness - 20, 0);
    }
  }
  if (msg.includes("professor")) {
    const charm = Math.random() < 0.5;
    if (charm) {
      addMessageToChat("System", "Professor is impressed. +Happiness");
      microGameState.happiness = Math.min(microGameState.happiness + 5, 100);
    } else {
      addMessageToChat("System", "Professor is annoyed. -Happiness");
      microGameState.happiness = Math.max(microGameState.happiness - 5, 0);
    }
  }
}

