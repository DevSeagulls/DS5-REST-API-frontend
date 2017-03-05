function getActors() {

	var XHR = new XMLHttpRequest();

	XHR.open('GET', API('/actors/'), true);

	XHR.send();

	XHR.onload = function() {
		var actors = JSON.parse(XHR.responseText);

		showActors(actors);
	}
}

function uploadActor(actorData) {
	
	var XHR = new XMLHttpRequest();

	XHR.open('POST', API('/actors/'), true);

	XHR.send(actorData);

	XHR.onload = function() {
		getActors();
	}
}

function deleteActor(id) {
	var XHR = new XMLHttpRequest();

	XHR.open('DELETE', API('/actors/' + id + '/'), true);

	XHR.send();

	XHR.onload = function() {
		getActors();
	}
}

function showActors(actors) {
	var HTML = '';

	actors.forEach(function(actor, index) {
		HTML += actorTemplate(actor);
	});

	var actorsContainer = document.querySelector('.actors-list');

	actorsContainer.innerHTML = HTML;

	initListeners();
}

function actorTemplate(actor) {
	return `
	<div class="person">
		<div class="person__photo">
			<img src="${actor.photo || '/'}" alt="">
		</div>
		<div class="person__info">
			<span>${actor.firstname} ${actor.lastname}</span>
			<span>${actor.birthdate}</span>

			<button class="delete-actor" data-id="${actor.id}">Удалить</button>
		</div>
	</div>
	<hr>`;
}

function API(query) {
	var api_domain = 'http://163.172.130.181:8000/api/v1';
	return api_domain + query;
}

function initListeners() {
	var delButtons = document.querySelectorAll('.delete-actor');

	delButtons.forEach( function(button, i) {
		button.addEventListener('click', (e) => {
			let id = e.target.dataset.id;

			deleteActor(id);
		})
	});
}


getActors();

document.querySelector("#add-actor").addEventListener('click', (e) => {
	e.preventDefault();

	var actorData = new FormData(document.forms.newActor);

	uploadActor(actorData);

	document.forms.newActor.reset();
})