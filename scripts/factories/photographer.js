function photographerFactory(data) {
  const { id, name, portrait } = data;

  const picture = `assets/images/photographers/${id}/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    const photographerPageLink = document.createElement('a');
    photographerPageLink.setAttribute('href', `/pages/photographer.html?id=${id}`);

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    const h2 = document.createElement('h2');
    h2.textContent = name;

    photographerPageLink.appendChild(img);
    photographerPageLink.appendChild(h2);

    article.appendChild(photographerPageLink);
    return (article);
  }
  return { name, picture, getUserCardDOM };
}
