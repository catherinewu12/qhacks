chrome.runtime.onMessage.addListener(function (request) {
    if (request.method == 'blockSpoilers') {
        blockSpoilers(request.inputText);
    } else if (request.method == 'removeItem') {
	    removeItem(request.inputText);
    }
})

function removeItem(list) {
    var searchString = '';
    list.forEach(function (item) {
	    //making a string for paragraphs that contain each spoiler
	    searchString = searchString + "p:contains('" + item + "'), " + ":header:contains('" + item + "'), " + "a:contains('" + item + "'), ";
	});
	searchString = searchString.substring(0, searchString.length - 2);
    $(searchString).css('-webkit-filter', '');
}

// a function to block out each paragraph and header that contain a spoiler word
function blockSpoilers(list) {
    var searchString = '';
	list.forEach(function (item) {
	    //making a string for paragraphs that contain each spoiler
	    searchString = searchString + "p:contains('" + item + "'), " + ":header:contains('" + item + "'), " + "a:contains('" + item + "'), ";
	});
	searchString = searchString.substring(0, searchString.length - 2);
	$(searchString).css('-webkit-filter', 'blur(5px)');
}

chrome.storage.sync.get('keyword', function(data) {
        spoilerList = data.keyword;
        console.log(spoilerList);
        blockSpoilers(spoilerList);
});