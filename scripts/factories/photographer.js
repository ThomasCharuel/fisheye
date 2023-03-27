function photographerFactory(data) {
  const { id, name, portrait } = data;

  const picture = `assets/images/photographers/${id}/${portrait}`;

  function getUserCardDOM() {
    return (`
      <article>
        <a href="/pages/photographer.html?id${id}">
          <img src="/assets/images/photographers/${id}/${portrait}">
          <h2>${name}</h2>
        </a>
      </article>
    `);
  }
  return { name, picture, getUserCardDOM };
}
