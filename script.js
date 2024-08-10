const API_KEY = 'ae9001c802msh71622dbbe0ccbe7p1fae74jsnf6aa006413ce';
const API_URL = 'https://imdb8.p.rapidapi.com/title/find?q=movie';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

function fetchMovies() {
    fetch(API_URL, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  
            if (data.results) {
                displayMovies(data.results);
            } else {
                console.error('No results found:', data);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        if (movie.image) {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <img src="${movie.image.url}" alt="${movie.title}">
                <div class="movie-title">${movie.title}</div>
            `;
            movieContainer.appendChild(movieElement);
        }
    });
}
