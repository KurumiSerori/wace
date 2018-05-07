chrome.browserAction.onClicked.addListener(function() {
	var indexUrl = chrome.extension.getURL('webui-aria2/index.html');
	chrome.tabs.getSelected(null, function(tab) { 
		var tabUrl = tab.url;
		// alert(tabUrl);
		// alert(tab.status);
		if(tabUrl == "chrome://newtab/") {	// current tab is blank, open in current tab
			chrome.tabs.update(tab.id, { url: indexUrl });
		}
		else if(tabUrl == indexUrl) {	// current tab is already in extension page, just refresh
			chrome.tabs.reload(new Number(tab.id));
		}
		else {	// create a new tab for extension to run
			chrome.tabs.create({ url: indexUrl });
		}
	});
});


// Pop up a chrome notification
function showNotification(id, opt) {
	var notification = chrome.notifications.create(id, opt, function(notifyId) {
		return notifyId
	});
	setTimeout(function() {
		chrome.notifications.clear(id, function() {});
	}, 3000);
}

// Update Notification
var manifest = chrome.runtime.getManifest();
var previousVersion = localStorage.getItem("version");
if (previousVersion == "" || previousVersion != manifest.version) {
	var opt = {
		type: "basic",
		title: "Update",
		message: "wace is updating to" + manifest.version + "!",
		iconUrl: "favicon.ico"
	};
	var id = new Date().getTime().toString();
	showNotification(id, opt);
	localStorage.setItem("version", manifest.version);
}
