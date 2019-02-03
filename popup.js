var keyword_list = document.getElementById("keyword_list");
var spoilList;

//retrieve from storage
chrome.storage.sync.get('keyword', function(data) {
        spoilList = data.keyword;
        updateList(spoilList);
        blockSpoilers(spoilList);
});

//listen for load events and button clicks
document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('button').addEventListener('click', onclick, false);

	// A function to run when the 'block' button is clicked. It will go through
    // the process to use apis to get a list of characters and block their occurrences.
	async function onclick() {
		chrome.tabs.query({currentWindow: true, active: true}, async function(tabs) {
			//get the string value of the input
			let inputText = $('#movie').val();
            //chrome.tabs.sendMessage(tabs[0].id, {inputText: inputText}, setCount);

            // won't add duplicates
            for (let i=0; i<spoilList.length;i++){
                if (spoilList[i]==inputText)
                    return;
            }

            // call apis from stdlib to get the link to imdb then get the list of characters from there.
            let link = await getImdbLink(inputText);
            let characters = await getCharacters(link);

            // update spoilers list, block the new spoilers
			spoilList.push(inputText);
			spoilList = spoilList.concat(characters);
			updateList(spoilList);
			blockSpoilers(spoilList);
			saveStorage();
			$('#movie').val('');
		})
	}
	}, false);



// FUNCTIONS

// a function to do the api call to get a link via keywords
	async function getImdbLink(keyWords){

	    let link = await lib.jlaframboise.searchtermstoimdblink['@dev']({url: keyWords, queries:[["cite", "text"]]});
        return link
    }

    // a function to do the api call to get the characters list from a link
    async function getCharacters(url){
	    //https://www.imdb.com/title/tt0076759/fullcredits?ref_=tt_cl_sm#cast

	    let characters = await lib.jlaframboise.scrapechars['@dev']({url: url, queries:[[".character", "text"]]});
        return characters
    }

function saveStorage() {
    chrome.storage.sync.set({keyword: spoilList}, function() {});
}

function blockSpoilers(list) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "blockSpoilers", inputText: list}, function () {});
    });
}

function removeItem(item) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {method: "removeItem", inputText: item}, function () {});
    });
}

// a function to update the list of blocked words on the GUI.
function updateList(list) {
    $(keyword_list).empty();
    for (let x = 0; x < list.length; x++) {
        let div = document.createElement('div');
        let text = document.createElement('p');
        text.textContent = list[x];
        text.classList.add('currentBlock');
        div.appendChild(text);
        div.addEventListener('click', function() {
            let textRemove = this.textContent;
            for (let x = 0; x < spoilList.length; x++){
                if (spoilList[x] === textRemove) {
                    spoilList.splice(x, 1);
                    break;
                }
            }
            removeItem(textRemove);
            updateList(spoilList);
            blockSpoilers(spoilList);
            saveStorage();
        });
        keyword_list.appendChild(div);
    }
}