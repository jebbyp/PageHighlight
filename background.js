/**
 When the extension is installed or upgraded,
 create a context menu item with the following properties.
 The context menu item appears only when the user selects text
 on the page.
*/
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        title: 'highlight',
        id: 'PageHighlight',
        contexts: ['selection'],
    });
});

/**
 * The listener for the context menu item with id 'PageHighlight'.
 * When the user clicks this context menu item,
 * the selected text is saved to storage.
 */
chrome.contextMenus.onClicked.addListener(function(info) {
	if (info.menuItemId == 'PageHighlight') {
		saveToStorage(info);
	}
});

/**
 * Put the selected text into storage.
 * Text will be saved by urls in a set.
 */
function saveToStorage(info) {
	pageUrl = info.pageUrl;
	chrome.storage.sync.get(pageUrl, function(storageObject) {
		// get existing saved texts on the webpage, if any
		var savedTexts = storageObject[pageUrl] || [];
		savedTexts.push(info.selectionText);

		var newStorageObject = {};
		newStorageObject[pageUrl] = savedTexts;

		chrome.storage.sync.set(newStorageObject);
	});
}