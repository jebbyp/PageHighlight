/**
 Create a context menu item with the following properties.
 The context menu item appears only when the user highlights text
 on the page.
*/
chrome.contextMenus.create({"title": "save highlight", "contexts": ["selection"], "onclick": onClickSave});

/**
 * When the user clicks "save highlight" in the context menu:
 * 	- the selected text must be put into storage
 *  - the selected text should appear highlighted
 */
function onClickSave(info) {
	saveToStorage(info);
}

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
