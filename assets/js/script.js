let offset = 0;
const limit = 20;
const cardList = document.querySelector(".card-list");
const body = document.querySelector("body");
const divObserver = document.querySelector(".observer");

cardList.onclick = async (event) => {
  const pokemon = await getPokemonById(
    event.target.parentNode.closest("li")?.id
  );
  body.insertAdjacentHTML("beforeend", renderCard(pokemon));
  document.querySelector("#btn-back").onclick = () => {
    document.querySelector(".modal").remove();
  };
};

const calculatePosition = (pokemonNumber) => {
  if (pokemonNumber > 10263) return "";

  let position = "0000";
  const digits = String(pokemonNumber).length.toString();

  for (let i = 0; i < digits; i++) position = position.slice(0, -1);

  position += pokemonNumber;

  if (position > 1010) position -= 8990;
  return position;
};

const renderPokemons = (pokemon) => {
  const position = calculatePosition(pokemon.number);

  return `
    <li class='${pokemon.type}' id='${pokemon.number} '>
        <span>#${position}</span>
        <span>${pokemon.name}</span>
        <div>
            <ol>
            ${pokemon.types
              .map((type) => `<li class='${type}'>${type}</li>`)
              .join("")}
            </ol>
            <img
            src="${pokemon.image}"
            alt="${pokemon.name}"
            />
        </div>
    </li>
    `;
};

const renderCard = (pokemon) => {
  const position = calculatePosition(pokemon.number);
  const totalScore = pokemon.base_stats.reduce(
    (prev, curr) => prev + curr.base_stat,
    0
  );

  return `
  <div class="modal">
  <div class="modal-content ${pokemon.type}" id="${pokemon.number} ">
      <header>
        <button class='${pokemon.type}' id="btn-back">back</button>
      </header>
      <div class="modal-infos">
        <div>
          <h2>${pokemon.name}</h2>
          <span>#${position}</span>
          <ol>
            ${pokemon.types
              .map((type) => `<li class='${type}'>${type}</li>`)
              .join("")}
          </ol>
        </div>
        <img
          src="${pokemon.image}"
          alt="${pokemon.name}"
        />
        <div class="modal-details">
          <h5>Base Stats</h5>
          <ul>
            ${pokemon.base_stats
              .map((state) => {
                return `
                  <li class="">
                    <span>${state.stat.name}</span>
                    <span>${state.base_stat}</span>
                    <div>
                      <div style='width: ${state.base_stat}%' class='${
                  state.base_stat >= 50 ? "green" : "red"
                } '></div>
                    </div>
                  </li>
                `;
              })
              .join("")}
          </ul>
          <h4>Total Score</h4>
          <div class='total-score'>
            <span>${totalScore}</span>
            <div>
              <div style='width: ${totalScore / 7}%' class='${
    totalScore >= 350 ? "green" : "red"
  }'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
  `;
};

(loadPokemons = () => {
  getPokemons(offset, limit)
    .then((pokemonData) => {
      pokemonData.map((pokemon) => {
        cardList.insertAdjacentHTML("beforeend", renderPokemons(pokemon));
      });
    })
    .catch((error) => console.log(error));
  offset += limit;
})();

const observer = new IntersectionObserver(async (entries) => {
  if (entries.some((entry) => entry.isIntersecting)) {
    loadPokemons();
  }
});

observer.observe(divObserver);
