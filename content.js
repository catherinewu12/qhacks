chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

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

/*
	//receive the passed value from user input
	var re = new RegExp(request.inputText,'gi');
	var matches = document.body.innerHTML.match(re);


    console.log(body);
	console.log(matches);

	if (matches.length > 2){
		//change all major content tags into "CAT"
		var tags = document.getElementsByTagName("P")
		var summary = document.getElementsByClassName("summary_text")
		var content = document.getElementsByTagName("meta")
		
		for (var i=0; i<tags.length; i++) {
			tags[i].innerHTML = 'SPOILERS'
		}
		for (var i=0; i<summary.length; i++) {
			summary[i].innerHTML = 'SPOILERS'
		}

	sendResponse({count: matches.length});
}
*/

sendResponse({count: 0});
})