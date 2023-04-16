const pokeApi = {};

const getPokemonDetail = async (pokemonUrl, isSelect = false) => {
  const response = await fetch(pokemonUrl);
  const pokemonDetail = await response.json();
  // console.log(pokemonDetail);
  if (isSelect) return new Card(pokemonDetail);
  return new Pokemon(pokemonDetail);
};

const getPokemons = async (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) =>
      pokemons.map((pokemon) => getPokemonDetail(pokemon.url))
    )
    .then((detailPokemons) => Promise.all(detailPokemons))
    .catch((error) => console.log(error));
};

const getPokemonById = (pokemon_id) => {
  if (!pokemon_id) return false;

  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`;
  const pokemonDetail = getPokemonDetail(url, true);

  return pokemonDetail;
};
