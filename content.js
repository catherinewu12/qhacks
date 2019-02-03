chrome.runtime.onMessage.addListener(function (request) {

	spoilerList = request.inputText;
	console.log(spoilerList)
	var searchString = '';
	spoilerList.forEach(function (item) {
	    searchString = searchString + "p:contains('" + item + "'), ";
	    console.log((searchString));
	});
	searchString = searchString.substring(0, searchString.length - 2);
	console.log($(searchString));
	$(searchString).css('-webkit-filter', 'blur(5px)');


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