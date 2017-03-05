function getDirectors() {

	var XHR = new XMLHttpRequest();

	XHR.open('GET', API('/directors/'), true);

	XHR.send();

	XHR.onload = function() {
		var directors = JSON.parse(XHR.responseText);

		showDirectors(directors);
	}
}

function uploadDirector(directorData) {
	
	var XHR = new XMLHttpRequest();

	XHR.open('POST', API('/directors/'), true);

	XHR.send(directorData);

	XHR.onload = function() {
		getDirectors();
	}
}

function deleteDirector(id) {
	var XHR = new XMLHttpRequest();

	XHR.open('DELETE', API('/directors/' + id + '/'), true);

	XHR.send();

	XHR.onload = function() {
		getDirectors();
	}
}

function showDirectors(directors) {
	var HTML = '';

	directors.forEach(function(director, index) {
		HTML += directorTemplate(director);
	});

	var actorsContainer = document.querySelector('.directors-list');

	actorsContainer.innerHTML = HTML;

	initListeners();
}

function directorTemplate(director) {
	return `
	<div class="person">
		<div class="person__photo">
			<img src="${director.photo || '/'}" alt="">
		</div>
		<div class="person__info">
			<span>${director.firstname} ${director.lastname}</span>
			<span>${director.birthdate}</span>

			<button class="delete-director" data-id="${director.id}">Удалить</button>
		</div>
	</div>
	<hr>`;
}

function API(query) {
	var api_domain = 'http://163.172.130.181:8000/api/v1';
	return api_domain + query;
}

function initListeners() {
	var delButtons = document.querySelectorAll('.delete-director');

	delButtons.forEach( function(button, i) {
		button.addEventListener('click', (e) => {
			let id = e.target.dataset.id;

			deleteDirector(id);
		})
	});
}


getDirectors();

document.querySelector("#add-director").addEventListener('click', (e) => {
	e.preventDefault();

	var directorData = new FormData(document.forms.newDirector);

	uploadDirector(directorData);

	document.forms.newDirector.reset();
})