/**
 * On extension install or upgrade,
 * create context menu items with the specified properties
*/
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        title: 'highlight',
        id: 'highlight',
        contexts: ['selection']
    });
});

/**
 * The listener for the context menu items created above
 */
chrome.contextMenus.onClicked.addListener(function(info) {
	saveOrRemoveText(info);
});

function saveOrRemoveText(info) {
	var pageUrl = info.pageUrl;

	chrome.storage.sync.get(pageUrl, function(storageObject) {
		var savedTexts = storageObject[pageUrl] || [];
		var text = info.selectionText;

		if (savedTexts.includes(text)) {
			removeTextFromStorage(savedTexts, text, pageUrl);
		} else {
			saveTextToStorage(savedTexts, text, pageUrl);
		}

	});
}

/**
 * Save the selected text into storage.
 */
function saveTextToStorage(savedTexts, text, pageUrl) {
	savedTexts.push(text);
	updateStorage(savedTexts, pageUrl);
}

/**
 * Remove the selected text from storage
 */
function removeTextFromStorage(savedTexts, text, pageUrl) {
	savedTexts.pop(text);
	updateStorage(savedTexts, pageUrl);
}

function updateStorage(savedTexts, pageUrl) {
	var newStorageObject = {};
	newStorageObject[pageUrl] = savedTexts;

	chrome.storage.sync.set(newStorageObject);
}