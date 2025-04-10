// Basic chatbot logic (replace with API call to OpenAI/Dialogflow/etc.)
document.getElementById('send-btn').addEventListener('click', () => {
    const input = document.getElementById('user-input');
    const chatlog = document.getElementById('chatlog');
    const userMessage = input.value.trim();
  
    if (userMessage) {
      chatlog.innerHTML += `<div class="user-msg"><strong>You:</strong> ${userMessage}</div>`;
      input.value = '';
  
      // Placeholder bot response
      setTimeout(() => {
        const response = generateBotResponse(userMessage);
        chatlog.innerHTML += `<div class="bot-msg"><strong>Guide:</strong> ${response}</div>`;
        chatlog.scrollTop = chatlog.scrollHeight;
      }, 600);
    }
  });
  
  function generateBotResponse(message) {
    // Replace this with your AI backend logic
    return "That's a fascinating question! This monument dates back to the 2nd century AD.";
  }
  