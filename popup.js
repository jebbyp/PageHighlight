createButton();

function createButton() {
	var button = document.createElement("button");
	button.innerHTML = "Clear this page";

	var div = document.getElementById("clearPage");
	div.appendChild(button);

	button.addEventListener("click", removePageFromStorage());
}

function removePageFromStorage() {
	chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
		if (tabs.length != 0) {
			var pageURL = tabs[0].url;
			chrome.storage.sync.remove(pageURL);
		}
	});
}