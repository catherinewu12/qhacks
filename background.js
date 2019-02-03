//Initialize the storage of the keywords from the movie
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({keyword: []}, function() {
    });
});