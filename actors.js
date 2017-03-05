function getActors() {
	var XHR = new XMLHttpRequest();

	XHR.open('GET', API('actors/'), true);

	XHR.send();

	XHR.onload = "ЭЭЭЭксперименты"
}



function renderActorsList(actors) {
	
	var HTMLContent = '';

	actors.forEach( (actor) => {
		HTMLContent += getActorTemplate(actor);
	});

	var actorsList = document.querySelector('.actors-list');

	actorsList.innerHTML = HTMLContent;
	initListeners();

}


function getActorTemplate(actor) {
	return `
	<div class="person">
		<div class="person__photo">
			<img src="${actor.photo}" alt="">
		</div>
		<div class="person__info">
			<span>${actor.firstname} ${actor.lastname}</span>
			<span>${actor.birthdate}</span>

			<button class="js-delete-actor" data-id="${actor.id}">Удалить</button>
		</div>
	</div>
	<hr>
	`
}


function deleteActor(id) {

	var XHR = new XMLHttpRequest();

	XHR.open('DELETE', API(`actors/${id}/`), true);

	XHR.send();

	XHR.onload = getActors;

}


function API(route) {
	var domain = 'http://163.172.130.181:8000/api/v1/';
	return domain + route;
}




getActors();




function initListeners() {
	var deleteButtons = document.querySelectorAll('.js-delete-actor');

	deleteButtons.forEach( (button) => {
		button.addEventListener('click', function(e) {
			var actorId = e.target.dataset.id;

			deleteActor(actorId);
		})
	})
}


function postActorToApi(actorData) {

	var XHR = new XMLHttpRequest();

	XHR.open('POST', API('actors/'), true);

	XHR.send(actorData);

	XHR.onload = getActors;
}

document
	.querySelector('#add-actor')
	.addEventListener('click', (e) => {

		e.preventDefault();

		var actorForm = document.forms.newActor;

		var actorData = new FormData(actorForm);

		postActorToApi(actorData);
	})