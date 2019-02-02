document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('button').addEventListener('click',
		onclick, false)

	function onclick() {
		//const movie = document.getElementById('txt').value;
		chrome.tabs.query({currentWindow: true, active: true},
		function(tabs) {
			//get the string value of the input
			let x = document.getElementById("movie")
			let inputText = x.value

			//send the input string to the content.js 
			chrome.tabs.sendMessage(tabs[0].id, {inputText: inputText}, 
				setCount)
		})
	}

	function setCount(res) {
		const div = document.createElement('div')
		let num = res.count
		div.textContent = `${num} occurrences`
		document.body.appendChild(div)
	
	}
}, false)