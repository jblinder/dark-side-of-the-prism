$(document).ready(function () {
	var clips = ["darkside.ogg","brain.ogg","money.ogg", "breath.ogg", "eclipse.ogg", "gig.ogg", "ontherun.ogg","speaktome.ogg","time.ogg", "usandthem.ogg"];   
	// Basic list of providers based on media coverage
	var prismSitez = ["google.com", "gmail.com", "facebook.com", "bing.com", "yahoo.com", "aol.com","apple.com","skype.com", "microsoft.com", "youtube.com","hotmail.com"];
	var isPlaying = false;	
	var currentSite = 0;
	var isWeWatched = false;
	var prismPlayer;

	var isInIFrame = (window.location != window.parent.location);
	if ( isInIFrame ) {
		throw '';
	}

	for (var i = 0; i < prismSitez.length; i++) {
  		if(window.location.host.indexOf(prismSitez[i]) > -1) {
  			console.log("sitecheck: " + window.location.host);
 			isWeWatched = true;
 			currentSite = i;
 			console.log(prismSitez[i]);
 		}	
	}
	function playAudio() {
		if ( (isWeWatched === true) && prismPlayer == null ) {
			prismPlayer = document.createElement('audio');
			prismPlayer.id = "prism-player";
			if ( currentSite > clips.length ) currentSite = clips.length;
			prismPlayer.src = "http://66.228.34.242/audio/live/"+ clips[currentSite];
			prismPlayer.play();
			prismPlayer.addEventListener('ended', function () {

				setTimeout(function () { prismPlayer.play(); }, 500);
			}, false);

			isPlaying = true; // Content script getting loaded twice on gamil.com <- WTF?
		}
	}
	if ( isWeWatched === true) {
		document.body.innerHTML += '<div style="position:absolute; top:-500px; left:80%;" id="prism-prism"><img src="http://66.228.34.242/audio/picon.jpg" style="width:75%; heigh:75%;"/></div>';	
		function hide(){
			 $('#prism-prism').animate({ opacity: 0}, 6000);
		}
		setTimeout(function(){
	 		$('#prism-prism').css('z-index', 9999); 
			$('#prism-prism').animate({top: '10px'}, 1500, function(){ hide();});
		}, 100);
	}
	// Load script, determine whether to play audio
	self.port.on("ready", function(bPlay) {
		if (bPlay) {
			playAudio();
		}
	});

	// Preferences button hit, refresh
	self.port.on("click", function(bPlay) {
		window.location.reload(true);
	});
});

	
	
	
	
	
	
	
	