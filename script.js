window.onload = () => {
  // Fetch events from the events.json file
  fetch('events.json')
    .then(response => response.json())
    .then(events => {
      const cardContainer = document.getElementById('cards');
      const timeline = document.getElementById('timeline');
      const messageContainer = document.getElementById('message'); // Message display

      // Shuffle and create cards
      const shuffled = events.sort(() => 0.5 - Math.random());

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

      timeline.addEventListener('dragover', e => e.preventDefault());
      
      timeline.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        const card = document.getElementById(`card-${id}`);
        if (!timeline.contains(card)) {
          timeline.appendChild(card);
          card.style.cursor = "default";
        }
        checkOrder(events);
      });

      function checkOrder(events) {
        const placed = [...timeline.children];
        const placedIds = placed.map(c => parseInt(c.id.replace('card-', '')));
        
        placed.forEach((cardElem, index) => {
          const cardId = parseInt(cardElem.id.replace('card-', ''));
          const expected = events.slice(0).sort((a, b) => a.year - b.year)[index]?.id;
          if (cardId === expected) {
            cardElem.style.border = "2px solid blue"; // Correct placement
          } else {
            cardElem.style.border = "2px solid red"; // Incorrect placement
          }
        });

        const ordered = [...placedIds].sort((a, b) => events.find(e => e.id === a).year - events.find(e => e.id === b).year);
        
        if (JSON.stringify(placedIds) === JSON.stringify(ordered) && placed.length === events.length) {
          setTimeout(() => alert("Bravo! You ordered all events correctly!"), 100);
        } else {
          showIncorrectOrderMessage(); // Show message for incorrect order
        }
      }

      // Function to show a message when order is incorrect
      function showIncorrectOrderMessage() {
        messageContainer.innerHTML = '<p style="color: red; font-size: 18px;">The order is incorrect. Please try again!</p>';
      }
    })
    .catch(error => console.error('Error loading events:', error));
};
