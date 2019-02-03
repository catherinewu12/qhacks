chrome.runtime.onMessage.addListener(function (request) {
    if (request.method == 'blockSpoilers') {
        blockSpoilers(request.inputText);
    } else if (request.method == 'removeItem') {
	    removeItem(request.inputText);
    }

	findSpoilersInText = function(text, spoilerList){
		let textWords = text.split(' ')
		for (let i=0; i<textWords.length;i++){
			for (let x=0; x<spoilerList.length;x++){
			if (textWords.slice(i, sp0oilerList[x].split(' ').length).join(' ').toLowerCase()==spoilerList[x].toLowerCase())
				return true

			}
		}
		return false;

	}
})

function removeItem(item) {
    var searchString = 'p:contains(' + item + ')';
    $(searchString).css('-webkit-filter', '');
}

function blockSpoilers(list) {
    var searchString = '';
	list.forEach(function (item) {
	    //making a string for paragraphs that contain each spoiler
	    searchString = searchString + "p:contains('" + item + "'), " + ":header:contains('" + item + "'), " + "a:contains('" + item + "'), ";
	    console.log((searchString));
	});
	searchString = searchString.substring(0, searchString.length - 2);
	console.log($(searchString));
	$(searchString).css('-webkit-filter', 'blur(5px)');
}

chrome.storage.sync.get('keyword', function(data) {
        spoilerList = data.keyword;
        console.log(spoilerList);
        blockSpoilers(spoilerList);
});