createButton();

function createButton() {
	var button = document.createElement("button");
	button.innerHTML = "Clear this page";

	var div = document.getElementById("clearPage");
	div.appendChild(button);

	button.addEventListener("click", removePage());
}

function removePage() {}