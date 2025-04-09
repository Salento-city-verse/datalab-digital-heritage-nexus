window.onload = () => {
  fetch('data/events.json')
    .then(response => response.json())
    .then(events => {
      initializeGame(events);

      // Restart Button functionality
      const restartBtn = document.getElementById('restart-btn');
      restartBtn.addEventListener('click', () => {
        initializeGame(events); // Restart the game
      });
    })
    .catch(error => console.error('Error loading events:', error));
};

// Function to initialize and reset the game
function initializeGame(events) {
  const cardContainer = document.getElementById('cards');
  const timeline = document.getElementById('timeline');
  const feedback = document.getElementById('feedback');
  
  // Clear previous game state
  cardContainer.innerHTML = "";
  timeline.innerHTML = "";
  feedback.textContent = "";

  // Shuffle the events
  const shuffled = events.sort(() => 0.5 - Math.random());

  // Create cards for each event
  shuffled.forEach(event => {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.id = `card-${event.id}`;
    card.innerHTML = `<strong>${event.title}</strong><p>${event.description}</p>`;

    card.addEventListener('dragstart', e => {
      e.dataTransfer.setData("text/plain", event.id);
    });

    cardContainer.appendChild(card);
  });

  // Allow cards to be dropped into the timeline
  timeline.addEventListener('dragover', e => e.preventDefault());

  timeline.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(`card-${id}`);
    if (!timeline.contains(card)) {
      timeline.appendChild(card);
      card.style.cursor = "default";
    }
    checkOrder(events); // Check if the order is correct
  });

  // Function to check if the events are placed in the correct order
  function checkOrder(events) {
    const placed = [...timeline.children];
    const placedIds = placed.map(c => parseInt(c.id.replace('card-', '')));

    // Visual feedback on correct/incorrect order
    placed.forEach((cardElem, index) => {
      const cardId = parseInt(cardElem.id.replace('card-', ''));
      const expected = events.slice(0).sort((a, b) => a.year - b.year)[index]?.id;
      if (cardId === expected) {
        cardElem.style.border = "2px solid blue"; // Correct placement
      } else {
        cardElem.style.border = "2px solid red"; // Incorrect placement
      }
    });

    const ordered = [...placedIds].sort((a, b) => 
      events.find(e => e.id === a).year - events.find(e => e.id === b).year
    );

    // Provide feedback on the order
    if (
      JSON.stringify(placedIds) === JSON.stringify(ordered) &&
      placed.length === events.length
    ) {
      feedback.textContent = "✅ Bravo! You ordered all events correctly!";
      feedback.style.color = "green";
    } else {
      feedback.textContent = "❌ The order is incorrect. Please try again!";
      feedback.style.color = "red";
    }
  }
}
