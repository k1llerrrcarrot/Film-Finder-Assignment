const movieList = document.getElementById("movie-list");

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

const addEventListeners = function() {
    const radioBtns = document.getElementsByClassName("radio-button");
    const radioBtnsArray = Array.from(radioBtns);

    radioBtnsArray.forEach((item) => {
        item.addEventListener("change", function(e) {
            onChangeEvent(e.target);
        })
    })

    searchButton.addEventListener("click", function() {
        addMoviesToDOM(filterMoviesOnWord(searchBar.value));
    })

    searchBar.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            searchButton.click();
        }
    })
}

const onChangeEvent = function(activatedButton) {
    switch (activatedButton.value){
        case "latest-movies":
            addMoviesToDOM(latestFilter());
            break;
        case "avenger-movies":
            addMoviesToDOM(filterMoviesOnWord("Avengers"));
            break;
        case "xmen-movies":
            addMoviesToDOM(filterMoviesOnWord("X-Men"));
            break;
        case "princess-movies":
            addMoviesToDOM(filterMoviesOnWord("Princess"));
            break;
        case "batman-movies":
            addMoviesToDOM(filterMoviesOnWord("Batman"));
    }
}

const clearDOM = function() {
    for (i = 0; i < movieList.childElementCount;) {
        movieList.removeChild(movieList.firstElementChild);
    }
}

const filterMoviesOnWord = function(wordInTitle) {
    let wordInTitleLowerCase = wordInTitle.toLowerCase();

    let filteredMovies = movies.filter((item) => {
        return item.title.toLowerCase().indexOf(wordInTitleLowerCase) > -1;
    })

    return filteredMovies;
}

const latestFilter = function() {
    let filteredMovies = movies.filter ((item) => {
        return parseInt(item.year) >= 2014;
    })

    return filteredMovies;
}

const addMoviesToDOM = function(movieArray) {
    clearDOM();

    let movieDOM = movieArray.map((item) => {
        let newLi = document.createElement("li");
        let newA = document.createElement("a");
        let newImg = document.createElement("img");
        
        movieList.appendChild(newLi);
        newLi.appendChild(newA);
        newA.appendChild(newImg);
        
        newLi.classList.add("movie-list-item");
        newA.href = "https://www.imdb.com/title/" + item.imdbID + "/";
        newA.target = "_blank";
        newImg.src = item.poster;

        return newLi;
    })
}

addEventListeners();
addMoviesToDOM(movies);