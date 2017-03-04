function getMovies() {

	var XHR = new XMLHttpRequest();

	XHR.open('GET', API('/movies/'), true);

	XHR.send();

	XHR.onload = function() {
		var movies = JSON.parse(XHR.responseText);

		showMovies(movies);
	}
}

function uploadMovie(movieData) {
	
	var XHR = new XMLHttpRequest();

	XHR.open('POST', API('/movies/'), true);

	XHR.send(movieData);

	XHR.onload = function() {
		getMovies();
	}
}

function deleteMovie(id) {
	var XHR = new XMLHttpRequest();

	XHR.open('DELETE', API('/movies/' + id + '/'), true);

	XHR.send();

	XHR.onload = function() {
		getMovies();
	}
}

function showMovies(movies) {
	var HTML = '';

	movies.forEach(function(movie, index) {
		HTML += movieTemplate(movie);
	});

	var moviesContainer = document.querySelector('.movies-list');

	moviesContainer.innerHTML = HTML;

	initListeners();
}

function movieTemplate(movie, parameters) {

	parameters = parameters || {
		genres: [],
		countries: [],
		directors: [],
		actors: []
	}

	return `
	<div class="movie">
		<div class="movie__photo">
			<img src="${movie.poster || '/'}" alt="">
		</div>
		<div class="movie__info">
			<span>Название: ${movie.title}</span>
			<span>Дата съемок: ${movie.created}</span>
			<span>Дата премьеры: ${movie.premiere}</span>
			<span>Продолжительность: ${movie.duration}</span>
			<span>Жанр: ${parameters.genres.join(', ')}</span>
			<span>Страна: ${parameters.countries.join(', ')}</span>
			<span>Режиссер: ${parameters.directors.join(', ')}</span>
			<span>Актеры: ${parameters.actors.join(', ')}</span>

			<button class="delete-movie">Удалить</button>
		</div>
	</div>
	<hr>`;
}

function API(query) {
	var api_domain = 'http://163.172.130.181:8000/api/v1';
	return api_domain + query;
}

function initListeners() {
	var delButtons = document.querySelectorAll('.delete-movie');

	delButtons.forEach( function(button, i) {
		button.addEventListener('click', (e) => {
			let id = e.target.dataset.id;

			deleteMovie(id);
		})
	});
}


getMovies();

document.querySelector("#add-movie").addEventListener('click', (e) => {
	e.preventDefault();

	var movieData = new FormData(document.forms.newMovie);

	uploadMovie(movieData);

	document.forms.newMovie.reset();
})