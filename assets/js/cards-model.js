class Card {
  number;
  name;
  type;
  types = [];
  image;
  base_stats = {};

  constructor(pokemonDetail) {
    console.log(pokemonDetail);

    this.number = pokemonDetail.id;
    this.name = pokemonDetail.name;
    this.type = pokemonDetail.types[0].type.name;
    this.types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
    this.image =
      pokemonDetail.sprites.other.home.front_default ||
      pokemonDetail.sprites.front_default;
    this.base_stats = pokemonDetail.stats;
  }
}
