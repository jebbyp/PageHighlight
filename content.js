highlightSavedTexts(document.URL);

/**
 * Highlight previously saved texts of this page.
 */
function highlightSavedTexts(pageURL) {
	chrome.storage.sync.get(pageURL, function(storageObject) {
		if (storageObject[pageURL] != undefined) {
			var savedTexts = storageObject[pageURL];
			var HTMLElement = document.documentElement;
			
			for (i = 0; i < savedTexts.length; i++) {
				updateHTML(savedTexts[i], HTMLElement);
			}
		}
	});
}

/**
 * Construct the new innerHTML of the document HTML element
 */
function updateHTML(savedText, HTMLElement) {
	var HTMLContent = HTMLElement.innerHTML;

	var startIndex = HTMLContent.indexOf(savedText);
	if (startIndex != -1) {
		var start = HTMLContent.slice(0, startIndex);

		var middle = "<p class='highlight'>" + savedText + "</p>";

		var endIndex = startIndex + savedText.length;
		var end = HTMLContent.slice(endIndex);

		var newHTMLContent = start + middle + end;

		HTMLElement.innerHTML = newHTMLContent;
	}
}