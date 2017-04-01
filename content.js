highlightSavedTexts(document.URL);

/**
 * When there is a change in a webpage's saved texts,
 * highlight the most recently saved text
 */
chrome.storage.onChanged.addListener(function(changedPages, namespace) {
	for (pageURL in changedPages) {
		chrome.storage.sync.get(pageURL, function(storageObject) {
			highlightSavedTexts(pageURL, 1);
		});
	}
});

/**
 * Highlight previously saved texts of this page
 */
function highlightSavedTexts(pageURL, count) {
	chrome.storage.sync.get(pageURL, function(storageObject) {
		if (storageObject[pageURL] != undefined) {
			var savedTexts = storageObject[pageURL];
			var lastIndex = savedTexts.length-1;
			// if count undefined, highlight all texts
			count = count || savedTexts.length;
			var HTMLElement = document.documentElement;
			
			for (i = lastIndex; i > lastIndex-count; i--) {
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

		var middle = "<span class='highlight'>" + savedText + "</span>";

		var endIndex = startIndex + savedText.length;
		var end = HTMLContent.slice(endIndex);

		var newHTMLContent = start + middle + end;

		HTMLElement.innerHTML = newHTMLContent;
	}
}