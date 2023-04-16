const cardList = document.querySelector(".card-list");

const renderTypes = (types) => {
  return types.map((typeSlot) => `<li>${typeSlot.type.name}</li>`);
};

const renderPokemons = (pokemon) => {
  return `
    <li>
        <span>#${pokemon.id} </span>
        <span>${pokemon.name}</span>
        <div>
            <ol>
            ${renderTypes(pokemon.types).join("")}
            </ol>
            <img
            src="${pokemon.sprites.other.dream_world.front_default} "
            alt="${pokemon.name}"
            />
        </div>
    </li>
    `;
};

pokeApi
  .getPokemons()
  .then((pokemonData) => {
    pokemonData.map((pokemon) => {
      cardList.insertAdjacentHTML("beforeend", renderPokemons(pokemon));
    });
  })
  .catch((error) => console.log(error));
