document.addEventListener('DOMContentLoaded', () => {
    const monuments = [
      {
        name: 'Piazza del Duomo',
        imgSrc: 'assets/images/piazza_del_duomo.jpg',
        options: ['Piazza del Duomo', 'Basilica di Santa Croce', 'Piazza Sant\'Oronzo']
      },
      {
        name: 'Basilica di Santa Croce',
        imgSrc: 'assets/images/basilica_santa_croce.jpg',
        options: ['Piazza del Duomo', 'Basilica di Santa Croce', 'Piazza Sant\'Oronzo']
      },
      {
        name: 'Piazza Sant\'Oronzo',
        imgSrc: 'assets/images/piazza_sant_oronzo.jpg',
        options: ['Piazza del Duomo', 'Basilica di Santa Croce', 'Piazza Sant\'Oronzo']
      }
    ];
  
    const gameContainer = document.getElementById('game-container');
  
    monuments.forEach((monument, index) => {
      const monumentDiv = document.createElement('div');
      monumentDiv.classList.add('monument');
  
      const img = document.createElement('img');
      img.src = monument.imgSrc;
      img.alt = `Image of ${monument.name}`;
      monumentDiv.appendChild(img);
  
      const optionsDiv = document.createElement('div');
      optionsDiv.classList.add('options');
  
      monument.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option, monument.name, button);
        optionsDiv.appendChild(button);
      });
  
      monumentDiv.appendChild(optionsDiv);
      gameContainer.appendChild(monumentDiv);
    });
  
    function checkAnswer(selected, correct, button) {
      if (selected === correct) {
        button.style.backgroundColor = 'green';
        alert('Correct!');
      } else {
        button.style.backgroundColor = 'red';
        alert('Try again!');
      }
    }
  });
  