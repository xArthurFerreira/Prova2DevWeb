document.addEventListener("DOMContentLoaded", function () {
    const pokemonList = document.getElementById("pokemon-list");
    const loadingDiv = document.getElementById("loading");
    const errorDiv = document.getElementById("error");
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
  
    searchButton.addEventListener("click", function () {
      const query = searchInput.value.trim().toLowerCase();
      if (query) {
        searchPokemon(query);
      }
    });
  
    function searchPokemon(name) {
      pokemonList.innerHTML = ""; // Clear previous results
      loadingDiv.style.display = "block";
      errorDiv.style.display = "none";
  
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Pokémon not found");
          }
          return response.json();
        })
        .then(pokemonData => {
          loadingDiv.style.display = "none";
          const listItem = document.createElement("li");
          const img = document.createElement("img");
          img.src = pokemonData.sprites.front_default;
          img.alt = pokemonData.name;
          const name = document.createElement("p");
          name.textContent = pokemonData.name;
          listItem.appendChild(img);
          listItem.appendChild(name);
          pokemonList.appendChild(listItem);
        })
        .catch(error => {
          loadingDiv.style.display = "none";
          errorDiv.style.display = "block";
          errorDiv.textContent = "Failed to load Pokémon: " + error.message;
        });
    }
  });
  
