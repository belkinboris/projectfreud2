/*********************************
 * Micro-Level Interactions Script
 **********************************/

// Load game state from localStorage
let gameState = {
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

// Attempt to load an existing state
const savedState = localStorage.getItem("gameState");
if (savedState) {
  gameState = JSON.parse(savedState);
}

// DOM Elements
const microChatLog = document.getElementById("microChatLog");
const microInput = document.getElementById("microInput");
const microSendButton = document.getElementById("microSendButton");

// Go back to the main page
function goBack() {
  saveGameState();
  window.location.href = "index.html";
}

// Handle pressing Enter in the input box
function handleKeyDown(event) {
  if (event.key === "Enter") {
    handleMicroAction();
  }
}

// Main function to handle user input in the micro-level
function handleMicroAction() {
  const userText = microInput.value.trim();
  if (!userText) return;

  // Display user message
  addMessageToChat("You", userText);
  microInput.value = "";

  // Generate a response (placeholder logic)
  const response = generateAiResponse(userText);

  // Display AI response
  addMessageToChat("Game", response);

  // Check if that response impacts stats
  handleStatChanges(userText.toLowerCase());

  // Save updated state
  saveGameState();
}

// Append messages to chat
function addMessageToChat(sender, text) {
  const messageElem = document.createElement("div");
  messageElem.classList.add("micro-message");
  
  if (sender === "You") {
    messageElem.classList.add("micro-message-user");
  } else {
    messageElem.classList.add("micro-message-ai");
  }
  
  messageElem.innerHTML = `<strong>${sender}:</strong> ${text}`;
  microChatLog.appendChild(messageElem);
  microChatLog.scrollTop = microChatLog.scrollHeight;
}

// Simple AI response logic
function generateAiResponse(userText) {
  if (userText.includes("professor")) {
    return "The professor raises an eyebrow and says, 'What is it you want to discuss?'";
  } else if (userText.includes("rob a bank")) {
    return "You begin outlining a heist plan... but the odds seem stacked against you. Do you still want to proceed?";
  } else if (userText.includes("hello")) {
    return "Hello! What would you like to do today?";
  }
  // Default fallback response
  return "The world awaits your next move...";
}

// Basic stat modifications
function handleStatChanges(userText) {
  if (userText.includes("rob a bank")) {
    const success = Math.random() < 0.3;
    if (success) {
      addMessageToChat("System", "You successfully robbed a bank! (+Happiness, -Smarts)");
      gameState.happiness = Math.min(gameState.happiness + 10, 100);
      gameState.smarts = Math.max(gameState.smarts - 5, 0);
    } else {
      addMessageToChat("System", "You got caught! You're injured and thrown in jail. (-Health, -Happiness)");
      gameState.health = Math.max(gameState.health - 30, 0);
      gameState.happiness = Math.max(gameState.happiness - 20, 0);
    }
  }

  if (userText.includes("professor")) {
    const isCharmed = Math.random() < 0.5;
    if (isCharmed) {
      addMessageToChat("System", "The professor is intrigued by your charm. (+Happiness)");
      gameState.happiness = Math.min(gameState.happiness + 5, 100);
    } else {
      addMessageToChat("System", "The professor is offended. You may risk expulsion. (-Happiness)");
      gameState.happiness = Math.max(gameState.happiness - 5, 0);
    }
  }
}

// Save game state
function saveGameState() {
  localStorage.setItem("gameState", JSON.stringify(gameState));
}
