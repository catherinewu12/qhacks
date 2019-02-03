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

})