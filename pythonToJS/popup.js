document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('#movie').addEventListener('click', onclick, false)

	function onclick() {
		chrome.tabs.query({currentWindow: true, active: true},
		function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, "Blocking Spoilers")
			$.ajax({
			    type: "POST",
			    url: "C:\_Root Folder\ComputerPrograming\qhacks\teest.py",
			    //data: { param: text}
			}).done(function( o ) {
			     // do something
				 chrome.tabs.sendMessage(tabs[0].id, o)
			});

			
		})
	}

}, false)

		
