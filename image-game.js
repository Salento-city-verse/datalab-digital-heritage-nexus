const monuments = [
    {
      name: "Piazza del Duomo",
      image: "assets/images/lecce1.jpg",
      options: ["Piazza del Duomo", "Piazza Mazzini", "Piazza Sant'Oronzo"]
    },
    {
      name: "Basilica di Santa Croce",
      image: "assets/images/lecce2.jpg",
      options: ["Piazza Sant'Oronzo", "Basilica di Santa Croce", "Piazza del Duomo"]
    },
    {
      name: "Piazza Sant'Oronzo",
      image: "assets/images/lecce3.jpg",
      options: ["Piazza Mazzini", "Piazza Sant'Oronzo", "Basilica di Santa Croce"]
    }
  ];
  
  let currentIndex = 0;
  
  function loadMonument(index) {
    const monument = monuments[index];
    const image = document.getElementById("monument-image");
    const choicesContainer = document.getElementById("choices-container");
  
    image.src = monument.image;
    choicesContainer.innerHTML = "";
  
    monument.options.forEach(option => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => handleAnswer(option, monument.name);
      choicesContainer.appendChild(button);
    });
  }
  
  function handleAnswer(selected, correct) {
    if (selected === correct) {
      alert("Correct!");
    } else {
      alert("Oops! Try again.");
    }
  
    currentIndex++;
    if (currentIndex < monuments.length) {
      loadMonument(currentIndex);
    } else {
      setTimeout(() => alert("Game Over! Thanks for playing."), 300);
      currentIndex = 0;
      loadMonument(currentIndex);
    }
  }
  
  window.onload = () => {
    loadMonument(currentIndex);
  };
  