document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('button').addEventListener('click',
		onclick, false)

	function onclick() {
		//const movie = document.getElementById('txt').value;
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
			//get the string value of the input
			let x = document.getElementById("movie")
			let inputText = x.value

			// add input to storage
            chrome.storage.sync.get('keyword', function(data) {
                keyword = data.keyword;
                keyword.push(inputText);
                console.log(keyword);
                chrome.storage.sync.set({keyword: keyword}, function() {});
            });

			//send the input string to the content.js 
			chrome.tabs.sendMessage(tabs[0].id, {inputText: inputText}, 
				setCount)
		})
	}

	function setCount() {
		const div = document.createElement('div')
		div.textContent = `Spoilers Blocked!`
		document.body.appendChild(div)
	};

    // Add stored list of keywords to popup.html
	var keyword_list = document.getElementById("keyword_list");
    function updateList(keyword) {
        let div = document.createElement('div');
        div.textContent = keyword;
        /*div.addEventListener('click', function() {});*/
        keyword_list.appendChild(div);
    }
    chrome.storage.sync.get('keyword', function(data) {
        keyword = data.keyword;
        for (var x = 0; x < keyword.length; x++){
            updateList(keyword[x]);
        }
    });

}, false)
