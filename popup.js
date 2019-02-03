document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('button').addEventListener('click', onclick, false);

	async function onclick() {
		//const movie = document.getElementById('txt').value;
		chrome.tabs.query({currentWindow: true, active: true}, async function(tabs) {
			//get the string value of the input
			let x = document.getElementById("movie")
			let inputText = x.value
            chrome.tabs.sendMessage(tabs[0].id, {inputText: inputText},
                setCount)

            let link = await getImdbLink(inputText);
            let characters = await getCharacters(link);
			// add input to storage
            chrome.storage.sync.get('keyword', function(data) {
                keyword = (data.keyword).concat(characters);
                keyword.push(inputText);
                console.log(keyword);
                chrome.storage.sync.set({keyword: keyword}, function() {});
            });
			updateList(inputText);

			//chars = await loadLinkAndChars(inputText)
            //console.log(chars)

            // console.log(link)
            //
            // console.log("link var then hardcoded one:")
            // console.log(link)
            // console.log("https://www.imdb.com/title/tt0076759/fullcredits?ref_=tt_cl_sm#cast")
            // console.log("Characters: ")
            // console.log(characters)
			//send the input string to the content.js 
			//chrome.tabs.sendMessage(tabs[0].id, {inputText: inputText},
				//setCount)
		})
	}

	//send the input string to the content.js
	//chrome.runtime.sendMessage({inputText: keyword[0]}, setCount)

	function setCount(res) {
		const div = document.createElement('div')
		var check = res.count
		if (check > 2){
		    div.textContent = `Spoilers Blocked!`
		    document.body.appendChild(div)
	    }
	};


	async function getImdbLink(keyWords){

	    let link = await lib.jlaframboise.searchtermstoimdblink['@dev']({url: keyWords, queries:[["cite", "text"]]});

        return link
    }

    async function getCharacters(url){
	    //https://www.imdb.com/title/tt0076759/fullcredits?ref_=tt_cl_sm#cast

	    let characters = await lib.jlaframboise.scrapechars['@dev']({url: url, queries:[[".character", "text"]]});

        return characters
    }


    // Add stored list of keywords to popup.html
	var keyword_list = document.getElementById("keyword_list");
    function updateList(keyword) {
        let div = document.createElement('div');
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
