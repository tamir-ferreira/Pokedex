const pokeApi = {};

const getPokemonDetail = async (pokemon) => {
  const response = await fetch(pokemon.url);
  const pokemonDetail = await response.json();

  return new Pokemon(pokemonDetail);
};

const getPokemonCardDetail = async (pokemon) => {
  const response = await fetch(pokemon.url);
  const pokemonDetail = await response.json();

  return new Card(pokemonDetail);
};

const getPokemons = async (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(getPokemonDetail))
    .then((detailPokemons) => Promise.all(detailPokemons))
    .catch((error) => console.log(error));
};

const getPokemonById = (pokemon_id) => {
  if (!pokemon_id) return false;

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`;

  return fetch(url).then((response) => response.json());
};
