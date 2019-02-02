chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({keyword: 'bear'}, function() {
        console.log("The keyword is bear.");
    });
});