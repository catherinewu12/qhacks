
chrome.runtime.onMessage.addListener(function (request, sender,
	sendResponse) {

	const re = new RegExp('bear','gi')
	const matches = document.documentElement.textContent.match(re)
	sendResponse({count: matches.length})
	
})

//look for the input movie name instead of bears