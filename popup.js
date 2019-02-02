
document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('button').addEventListener('click',
		onclick, false)

	function onclick() {
		//const movie = document.getElementById('txt').value;
		chrome.tabs.query({currentWindow: true, active: true},
		function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, "Blocking Spoilers", 
				setCount)
		})
	}

	function setCount(res) {
		const div = document.createElement('div')

		div.textContent = `${res.count} bears`
		document.body.appendChild(div)
	}
}, false)
/*

document.addEventListener('DOMContentLoaded', ()=> {
	const movie = document.getElementById('movie')
	window.addEventListener('DOMContentLoaded', function(){
		chrome.tabs.query({currentWindow: true, active: true},
			function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {}, setCount)
			}
	})
	}
	
	document.querySelector('button').addEventListener('click',
		onclick, false)

	function onclick() {
		//const movie = document.getElementById('txt').value;
		//chrome.runtime.sendMessage()
		//var movie = document.getElementById('movie')
		chrome.tabs.query({currentWindow: true, active: true},
		function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, "Blocking Spoilers"){
				file: "contents.js"
			} function() {
				chrome.tabs.sendMessage(tabs[0].id, {
					movie: movie
				},
				setCount)
			

	function setCount(res, movie) {
		const div = document.createElement('div')

		div.textContent = `${res.count} bears`
		document.body.appendChild(div)
	}
		})
	}
}, false)
//receive the movie name and do stuff 
*/
