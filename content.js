
chrome.runtime.onMessage.addListener(function (request, sender,
	sendResponse) {

	const re = new RegExp(request.inputText,'gi')
	const matches = document.documentElement.textContent.match(re)
	
	console.log(matches.length)
	sendResponse({count: matches.length})
	
})

//look for the input movie name