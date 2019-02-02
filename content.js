chrome.runtime.onMessage.addListener(function (request, sender,
	sendResponse) {

	//receive the passed value from user input
	const re = new RegExp(request.inputText,'gi')
	const matches = document.documentElement.textContent.match(re)
	
	if (matches.length > 2){
		//change all major content tags into "CAT"
		var tags = document.getElementsByTagName("P")
		var summary = document.getElementsByClassName("summary_text")
		for (var i=0; i<tags.length; i++) {
			tags[i].innerHTML = 'CAT'
		}
		for (var i=0; i<summary.length; i++) {
			summary[i].innerHTML = 'CAT'
		}
	}

	
	//document.getElementById.textContent = 'CAT'
	//send back the number of occurrences
	sendResponse({count: matches.length})
	
})
