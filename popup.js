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
			getCharacters(inputText);

			//send the input string to the content.js 
			//chrome.tabs.sendMessage(tabs[0].id, {inputText: inputText},
				//setCount)
		})
	}

	function setCount(res) {
		const div = document.createElement('div')
		var check = res.count
		if (check > 2){
		div.textContent = `Spoilers Blocked!`
		document.body.appendChild(div)
	}
	};


	function getCharacters(keyWords){
	    //keywordsForUrl = keyWords.replace(" ", "%20");
	    //address = "https://jlaframboise.lib.id/searchtermstoimdblink@dev/?url="+keywordsForUrl+"&queries=%5B%5B%22cite%22%2C%20%22text%22%5D%5D"
	    lib.jlaframboise.searchtermstoimdblink['@dev']({url: keyWords, queries:[["cite", "text"]]}, (err, result) => {
	        //handle result
            console.log("Got from server?");
            console.log(result);
            //chrome.tabs.sendMessage(tabs[0].id, result);
        })
    }


    // Add stored list of keywords to popup.html
	var keyword_list = document.getElementById("keyword_list");
    function updateList(keyword) {
        let div = document.createElement('div');
        div.textContent = keyword;
        /*div.addEventListener('click', function() {});*/
        let text = document.createElement('p');
        text.textContent = keyword;
        text.classList.add('currentBlock');
        div.appendChild(text);
        div.addEventListener('click', function() {
            let textRemove = this.textContent;
            console.log(textRemove);
            chrome.storage.sync.get('keyword', function(data) {
                keyword = data.keyword;
                for (let x = 0; x < keyword.length; x++){
                    if (keyword[x] === textRemove) {
                        keyword.splice(x, 1);
                        break;
                    }
                }
                console.log(keyword);
                chrome.storage.sync.set({keyword: keyword}, function() {});
            });
            this.parentNode.removeChild(this);
        });
        keyword_list.appendChild(div);
    }
    chrome.storage.sync.get('keyword', function(data) {
        keyword = data.keyword;
        for (var x = 0; x < keyword.length; x++){
            updateList(keyword[x]);
        }
    });

}, false)
