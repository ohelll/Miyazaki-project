function fetchData(url, callback) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => callback(data))
    .catch((error) => console.error("Error fetching data:", error));
}

fetchData("https://ghibliapi.vercel.app/films", function (films) {
  const filmsByMiyazaki = films.filter(
    (film) => film.director === "Hayao Miyazaki"
  );

  const filmsBy = document.getElementById("filmsBy");
  films.forEach((film) => {
    const listFilm = document.createElement("li");
    listFilm.textContent = `${film.title} : ${film.director}`;

    if (film.director === "Hayao Miyazaki") {
      listFilm.style.color = "red";
    }
    filmsBy.appendChild(listFilm);
  });

  const directors = document.getElementById("directors");
  const filmsDirectors = [...new Set(films.map((film) => film.director))];
  function compareName(a, b) {
    const [, nameA] = a.split(" ");
    const [, nameB] = b.split(" ");

    return nameA.localeCompare(nameB);
  }
  filmsDirectors.sort(compareName);
  filmsDirectors.forEach((director) => {
    const listDirector = document.createElement("li");
    listDirector.textContent = `${director}`;
    directors.appendChild(listDirector);
  });

  const filmsByDir = document.getElementById("directorsfilmsList");
  const filmsByDirectors = [...new Set(films.map((film) => film.director))];
  function compareName(a, b) {
    const [, nameA] = a.split(" ");
    const [, nameB] = b.split(" ");

    return nameA.localeCompare(nameB);
  }
  filmsByDirectors.sort(compareName);
  filmsByDirectors.forEach((director) => {
    const directorlist = document.createElement("div");
    const directorTitle = document.createElement("li");
    directorTitle.textContent = director;
    directorlist.appendChild(directorTitle);

    const directorFilms = films.filter((film) => film.director === director);
    const filmsList = document.createElement("ul");

    directorFilms.forEach((film) => {
      const listFilmBy = document.createElement("li");
      listFilmBy.textContent = `${film.title}`;
      filmsList.appendChild(listFilmBy);
    });

    directorlist.appendChild(filmsList);
    filmsByDir.appendChild(directorlist);
  });
});
