const events = [
  {
    id: 1,
    title: "Foundation of Lupiae (modern Lecce)",
    description: "The Messapians founded Lupiae, which would become Lecce.",
    year: -500
  },
  {
    id: 2,
    title: "Roman Conquest",
    description: "The Romans conquered Salento and integrated it into the Empire.",
    year: -267
  },
  {
    id: 4,
    title: "Ottoman Attacks on Otranto",
    description: "Otranto was invaded by Ottoman forces in 1480.",
    year: 1480
  },
  {
    id: 3,
    title: "Baroque Transformation of Lecce",
    description: "Lecce saw a flourish of Baroque architecture, especially in the 17th century.",
    year: 1600
  },
  {
    id: 5,
    title: "Salento Grecanico Cultural Revival",
    description: "Revival of the Griko dialect and traditions in the 20th century.",
    year: 1970
  }
];

window.onload = () => {
  const cardContainer = document.getElementById('cards');
  const timeline = document.getElementById('timeline');

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
    checkOrder();
  });

  function checkOrder() {
    const placed = [...timeline.children];
    const placedIds = placed.map(c => parseInt(c.id.replace('card-', '')));
    
    placed.forEach((cardElem, index) => {
      const cardId = parseInt(cardElem.id.replace('card-', ''));
      const expected = events.slice(0).sort((a, b) => a.year - b.year)[index]?.id;
      if (cardId === expected) {
        cardElem.style.border = "2px solid green";
      } else {
        cardElem.style.border = "2px solid red";
      }
    });

    const ordered = [...placedIds].sort((a, b) => events.find(e => e.id === a).year - events.find(e => e.id === b).year);
    
    if (JSON.stringify(placedIds) === JSON.stringify(ordered) && placed.length === events.length) {
      setTimeout(() => alert("Bravo! You ordered all events correctly!"), 100);
    }
  }
};
