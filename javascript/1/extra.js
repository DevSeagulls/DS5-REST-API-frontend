function getExtra(type, selector) {

	$.ajax({
		type: 'GET',
		url: API('/' + type + '/'),
		success: function(data, text) {
			showExtra(data, type, selector);
		}
	});

}

function uploadExtra(extraData, type) {

	// $.ajax({
	// 	type: 'POST',
	// 	data: extraData,
	// 	contentType: 'multipart/form-data',
	// 	url: API('/' + type + '/'),
	// 	success: function(data, text) {
	// 		getExtra(type, `.${type}-list`);
	// 	}
	// });

	var XHR = new XMLHttpRequest();

	XHR.open('POST', API('/'+ type +'/'), true);

	XHR.send(extraData);

	XHR.onload = function() {
		getExtra(type, `.${type}-list`);
	}

}

function deleteExtra(type, id) {

	$.ajax({
		type: 'DELETE',
		url: API('/' + type + '/' + id + '/'),
		success: function(data, text) {
			getExtra(type, `.${type}-list`);
		}
	});

}

function showExtra(array, type, selector) {
	var HTML = '';

	array.forEach(function(item, index) {
		HTML += extraTemplate(type, item);
	});

	var extraContainer = document.querySelector(selector);

	extraContainer.innerHTML = HTML;

	initListeners(type);
}

function extraTemplate(type, item) {
	return `
	<div class="extra">
		<span>${item.name}</span>
		<button data-id="${item.id}" data-type="${type}" class="delete-extra-${type}">Удалить</button>
	</div>
	<hr>`;
}

function API(query) {
	var api_domain = 'http://163.172.130.181:8000/api/v1';
	return api_domain + query;
}

function initListeners(type) {
	var delButtons = document.querySelectorAll(`.delete-extra-${type}`);

	delButtons.forEach( function(button, i) {
		button.addEventListener('click', (e) => {
			let id   = e.target.dataset.id;
			let type = e.target.dataset.type;

			deleteExtra(type, id, `.${type}-list`);
		})
	});
}


getExtra('countries', '.countries-list');
getExtra('genres',    '.genres-list');

document.querySelector("#add-country").addEventListener('click', (e) => {
	e.preventDefault();

	var countryData = new FormData(document.forms.newCountry);

	uploadExtra(countryData, 'countries');

	document.forms.newCountry.reset();
});

document.querySelector("#add-genre").addEventListener('click', (e) => {
	e.preventDefault();

	var genreData = new FormData(document.forms.newGenre);

	uploadExtra(genreData, 'genres');

	document.forms.newGenre.reset();
});