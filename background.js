chrome.contextMenus.create({"title": "save highlight", "contexts": ["selection"], "onclick": onClickSave});

/**
 * When the user clicks "save highlight" in the context menu,
 * the highlighted text must be stored in storage immediately.
 * 
 */
function onClickSave(info) {}