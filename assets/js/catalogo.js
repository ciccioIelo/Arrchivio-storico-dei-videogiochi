document.addEventListener("DOMContentLoaded", () => {
  const games = [
      { title: "Pong", year: 1972, genre: "Arcade", img: "assets/img/pong.jpg", staticPage: "pong.html" },
      { title: "Tetris", year: 1984, genre: "Puzzle", img: "assets/img/tetris.jpg" },
      { title: "Super Mario Bros", year: 1985, genre: "Platform", img: "assets/img/mario.jpg", staticPage: "mario.html" },
      { title: "Street Fighter II", year: 1991, genre: "Picchiaduro", img: "assets/img/streetfighter.jpg" },
      { title: "Pokémon Rosso/Blu", year: 1996, genre: "RPG", img: "assets/img/pokemon.jpg" },
      { title: "The Legend of Zelda", year: 1998, genre: "RPG", img: "assets/img/zelda.jpg" }
  ];

  const gameList = document.getElementById("gameList");
  const searchInput = document.getElementById("searchInput");
  const genreFilter = document.getElementById("genreFilter");
  const yearFilter = document.getElementById("yearFilter");
  const sortFilter = document.getElementById("sortFilter"); // Nuovo select per l'ordinamento

  /**
   * Renderizza i giochi filtrati nell'HTML.
   */
  function renderGames(filteredGames) {
      gameList.innerHTML = "";

      filteredGames.forEach(game => {
          // Se "staticPage" esiste, usa la pagina statica. Altrimenti, dettaglio dinamico
          let detailsPage = game.staticPage 
              ? game.staticPage
              : `dettaglio.html?game=${encodeURIComponent(game.title)}`;

          // Genera la card
          gameList.innerHTML += `
              <div class="col-lg-3 col-md-4 mb-4">
                  <div class="card">
                      <img src="${game.img}" class="card-img-top" alt="${game.title}">
                      <div class="card-body">
                          <h5 class="card-title">${game.title}</h5>
                          <p class="card-text">${game.year} | ${game.genre}</p>
                          <a href="${detailsPage}" class="btn btn-primary">Scopri di più</a>
                      </div>
                  </div>
              </div>
          `;
      });
  }

  /**
   * Applica i filtri (testo, genere, anno) e l'ordinamento selezionato.
   */
  function filterGames() {
      const searchText = searchInput.value.toLowerCase();
      const selectedGenre = genreFilter.value;
      const selectedYear = yearFilter.value;
      const sortValue = sortFilter.value; // es: "titleAsc", "titleDesc", "yearAsc", "yearDesc"

      // 1. Filtro
      let filteredGames = games.filter(game =>
          game.title.toLowerCase().includes(searchText) &&
          (selectedGenre === "" || game.genre === selectedGenre) &&
          (selectedYear === "" || game.year >= parseInt(selectedYear))
      );

      // 2. Ordinamento
      filteredGames.sort((a, b) => {
          switch (sortValue) {
              case "titleAsc":
                  // Ordina alfabeticamente A-Z per titolo
                  return a.title.localeCompare(b.title);
              case "titleDesc":
                  // Ordina alfabeticamente Z-A per titolo
                  return b.title.localeCompare(a.title);
              case "yearAsc":
                  // Ordina per anno crescente
                  return a.year - b.year;
              case "yearDesc":
                  // Ordina per anno decrescente
                  return b.year - a.year;
              default:
                  // Nessun ordinamento selezionato
                  return 0;
          }
      });

      // Renderizza i risultati
      renderGames(filteredGames);
  }

  // Event listeners
  searchInput.addEventListener("input", filterGames);
  genreFilter.addEventListener("change", filterGames);
  yearFilter.addEventListener("change", filterGames);
  sortFilter.addEventListener("change", filterGames);

  // Primo render iniziale
  filterGames();
});
