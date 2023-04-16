const pokeApi = {};

pokeApi.getPokemonDetail = async (pokemon) => {
  const response = await fetch(pokemon.url);
  return await response.json();
};

pokeApi.getPokemons = async (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailPokemons) => Promise.all(detailPokemons))
    .catch((error) => console.log(error));
};
