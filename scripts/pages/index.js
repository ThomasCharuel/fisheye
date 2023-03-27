async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes
  // de test dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  const photographers = [
    {
      "name": "Mimi Keel",
			"id": 243,
			"city": "London",
			"country": "UK",
			"tagline": "Voir le beau dans le quotidien",
			"price": 400,
			"portrait": "MimiKeel.jpg"
    },
    {
      "name": "Ellie-Rose Wilkens",
			"id": 930,
			"city": "Paris",
			"country": "France",
			"tagline": "Capturer des compositions complexes",
			"price": 250,
			"portrait": "EllieRoseWilkens.jpg"
    },
  ];
  // et bien retourner le tableau photographers seulement une fois récupéré
  return ({
    photographers: [...photographers, ...photographers, ...photographers],
  });
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
