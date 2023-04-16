let offset = 0;
const limit = 10;
const cardList = document.querySelector(".card-list");
const body = document.querySelector("body");
const divObserver = document.querySelector(".observer");

cardList.onclick = (event) => {
  const pokemon = getPokemonById(event.target.parentNode.closest("li")?.id);
  pokemon.then((jsonBody) => {
    body.insertAdjacentHTML("beforeend", renderCard(jsonBody));
    document.querySelector("#btn-back").onclick = () => {
      document.querySelector(".modal").remove();
    };
  });
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
        <span>#${position} </span>
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
  console.log(pokemon);

  const position = calculatePosition(pokemon.number);

  return `
  <div class="modal">
  <div class="modal-content ${pokemon.type}" id="${pokemon.number} ">
      <header>
        <button id="btn-back">Voltar</button>
        <button>Favoritar</button>
      </header>
      <div class="modal-infos">
        <div>
          <h2>${pokemon.name}</h2>
          <span>${position}</span>
          <ol>
            <li class="${pokemon.type}">Grass</li>
            <li class="${pokemon.type}">Poison</li>
          </ol>
        </div>
        <img
          src="${pokemon.image}"
          alt="${pokemon.name}"
        />
        <div class="modal-details">
          <h5>Base Stats</h5>
          <ul>
            <li class="">
              <span>HP</span>
              <span>45</span>
              <div>
                <div></div>
              </div>
            </li>
            <li class="">
              <span>HP</span>
              <span>45</span>
              <div>
                <div></div>
              </div>
            </li>
            <li class="">
              <span>HP</span>
              <span>45</span>
              <div>
                <div></div>
              </div>
            </li>
          </ul>
          <h4>Type defenses</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
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

/* ---------------- OBSERVADOR FINAL DA LISTA DE CARDS ------------------ */
const observer = new IntersectionObserver(async (entries) => {
  if (entries.some((entry) => entry.isIntersecting)) {
    loadPokemons();
  }
});

observer.observe(divObserver);
