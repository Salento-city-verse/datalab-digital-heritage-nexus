document.addEventListener('DOMContentLoaded', () => {
  const heritageData = {
    "Art": [
      {
        "name": "Lecce Baroque Art",
        "description": "Explore the intricate Baroque architecture of Lecce, renowned for its historical and artistic significance. This city is often referred to as the 'Florence of the South'.",
        "location": "Lecce",
        "image": "https://th.bing.com/th/id/R.4157d72b7ca58d8fa2696016e2ec08ab?rik=0mQnQbC6QB5TjQ&pid=ImgRaw&r=0",
        "link": "https://lionsinthepiazza.com/lecce-baroque-architecture/"
      },
      {
        "name": "Frescoes of Otranto Cathedral",
        "description": "Admire the ancient frescoes in the Otranto Cathedral, depicting biblical scenes and historical figures. The cathedral's mosaics date back to the 12th century.",
        "location": "Otranto",
        "image": "https://www.viaggiatricecuriosa.it/wp-content/uploads/2019/05/chiesa-san-pietro-affreschi-abside-maggiore-768x576.jpg",
        "link": "https://www.comune.otranto.le.it/cultura-e-turismo/cattedrale-di-otranto"
      },
      {
        "name": "Museo Provincial Sigismondo Castromediano",
        "description": "Located in the heart of Lecce, the museum showcases modern and contemporary art by both Italian and international artists.",
        "location": "Lecce",
        "image": "https://jetsettingfools.com/wp-content/uploads/2015/01/IMG_3059-1024x677.jpg",
        "link": "https://jetsettingfools.com/free-museums-in-lecce-italy/"
      }
    ],
    "Architecture": [
      {
        "name": "Castello Aragonese",
        "description": "A historic castle located in Taranto, built by the Aragonese dynasty, showcasing military architecture with a stunning sea view.",
        "location": "Taranto",
        "image": "https://www.turismoitinerante.com/site/wp-content/uploads/2022/06/Castello-Aragonese-Taranto-1024x646.jpg",
        "link": "http://castelloaragonesetaranto.com/"
      },
      {
        "name": "Santa Croce Basilica",
        "description": "A stunning example of Lecce Baroque architecture, with beautiful sculptures, intricate details, and magnificent facades.",
        "location": "Lecce",
        "image": "https://th.bing.com/th/id/R.4157d72b7ca58d8fa2696016e2ec08ab?rik=0mQnQbC6QB5TjQ&pid=ImgRaw&r=0",
        "link": "https://basilicasantacrocelecce.it/"
      },
      {
        "name": "Roman Amphitheatre of Lecce",
        "description": "An ancient Roman amphitheater, built around the 2nd century AD, located in the center of Lecce, showcasing the grandeur of Roman architecture.",
        "location": "Lecce",
        "image": "https://th.bing.com/th/id/R.ffb7eaefa962172cb5fdf8a8cc1d56fa?rik=c6hSbGMkBrMSsQ&pid=ImgRaw&r=0",
        "link": "https://it.wikipedia.org/wiki/Anfiteatro_romano_di_Lecce"
      }
    ],
    "Nature": [
      {
        "name": "Porto Selvaggio Natural Park",
        "description": "A pristine coastal nature reserve featuring stunning cliffs, crystal-clear waters, and lush Mediterranean vegetation, ideal for hiking and nature walks.",
        "location": "Nardò",
        "image": "https://travel.thewom.it/content/uploads/sites/4/2023/07/shutterstock_698500489-830x554.jpg",
        "link": "https://www.puglia.com/porto-selvaggio/"
      },
      {
        "name": "Grotta della Poesia",
        "description": "A natural swimming pool in the limestone cliffs, one of Salento's most popular scenic spots, known for its crystal-clear waters and poetic beauty.",
        "location": "Roca Vecchia",
        "image": "https://images.posarellivillas.com/ccontent_page/3821951627376801xx/master/grotta-della-poesia-2.jpg",
        "link": "https://www.grottedellapoesia.com/"
      },
      {
        "name": "Alimini Lakes",
        "description": "A pair of freshwater lakes surrounded by lush nature, perfect for birdwatching and canoeing, located near Otranto.",
        "location": "Otranto",
        "image": "https://turismo.puglia.it/wp-content/uploads/sites/124/spiaggia-alimini-otranto-hd.jpg",
        "link": "https://turismo.puglia.it/lecce/laghi-alimini/"
      }
    ]
  }; 
  
  const tourContentDiv = document.getElementById('personalized-tour-content');
  const interestButtons = document.querySelectorAll('.interest-button');

  function displayTourContent(interest) {
    tourContentDiv.innerHTML = '';

    const selectedInterest = heritageData[interest];

    if (selectedInterest && selectedInterest.length > 0) {
      selectedInterest.forEach(site => {
        const siteElement = document.createElement('div');
        siteElement.classList.add('site-item');
        siteElement.innerHTML = `
          <h3>${site.name}</h3>
          <img src="${site.image}" alt="${site.name}" />
          <p><strong>Location:</strong> ${site.location}</p>
          <p>${site.description}</p>
          <a href="${site.link}" target="_blank">Learn more</a>
        `;
        tourContentDiv.appendChild(siteElement);
      });
    } else {
      tourContentDiv.innerHTML = `<p>No relevant content available for this interest.</p>`;
    }
  }

  interestButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('.interest-card');
      const selectedInterest = card.getAttribute('data-interest');
      displayTourContent(selectedInterest);
    });
  });
});