chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({keyword: []}, function() {
        console.log("The keyword is an array.");
    });
});