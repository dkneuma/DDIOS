document.addEventListener("deviceready", onDeviceReady, false);
    
// Cordova is ready
    //
    function onDeviceReady() {
        console.log("Cordova Ready");
    }


var serviceURL = "http://www.dictiondoctor.com/DDServices/";
//var serviceURL = "http://localhost/~daniel.neumann/DDServices/";
$('#screen2Page').live('pageshow', function(event) {
	$.mobile.allowCrossDomainPages = true;
	$.mobile.loader.prototype.options.text = "loading";
	  $.mobile.loader.prototype.options.textVisible = false;
	  $.mobile.loader.prototype.options.theme = "a";
	  $.mobile.loader.prototype.options.html = "";
	var id = getUrlVars()["id"];
//	alert("Called with id=" + id);
	console.log(serviceURL+'getword.php?id='+id);
	$.getJSON(serviceURL + 'getletter.php?callback=?','id='+id, function(data){
			var letterdata = data.item;
			var newstring = "Unit "+letterdata.letterID+" "+letterdata.letterIPA;
			$('#letter2sound').text(newstring);
	
		});
	$.getJSON(serviceURL + 'getword.php?callback=?','id='+id, function(data){
		
			var screen2data = data.item;
			console.log(screen2data);
			var audio2source = serviceURL+"/sounds/w"+screen2data.wordID+".mp3";
			$('#audio2control').attr('src',audio2source);
			$('#word2button').text(screen2data.Name);
			$('#word2button').click(function() {
			$('#audio2control').get(0).play(); 
		//	 playAudio(audiosource);
		
			});
			$('#record2button').click(function() {
				//recordAudio();
				captureAudio();
			});
			$('#play2button').click(function() {
				playRecording();
			});
			$('#IPA2button').text(screen2data.IPA);
			var screenref = "screen" + screen2data.nextScreenType + ".html?id=" + screen2data.nextScreenID;
			console.log(screenref);
			//$('#navbuttons li').remove();
			//$('#navbuttons').append('<li><a href="'+screenref+'" data-role="button" data-theme="b" id="btnNext">Next</a></li>');
			$('#btn2Next').attr('href', screenref);
		//	$('#btnNext').text(screenref);
		//	$('#btnNext').listview('refresh');

	});
	
	
});

var my_media = null;
var mediaTimer = null;

       // Play audio
       //
// UPDATED for CAPTURE API
 	function playAudio(src) {
			console.log("called playaudio with " + src);

	               // Create Media object from src
				   my_media = new Media(src, onSuccess, onError);
				   my_media.play()

	       }
	function playRecording() {
				console.log("called playrecording");

		               // Create Media object from src
					  // var src = "myrecording.wav";
		              // my_media = new Media(src, onSuccess, onError);
					   my_media.play()

		       }

			function captureAudio() {
                console.log("Called captureAudio");
			        // Launch device audio recording application, 
			        // allowing user to capture up to 2 audio clips
                navigator.device.capture.captureAudio(captureSuccess, captureError, {limit: 1, duration: 3});
			    }
			
			 function captureSuccess(mediaFiles) {
			        var i, len;
			        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
			          //  uploadFile(mediaFiles[i]);
						console.log(mediaFiles[i]);
			        }
                   // $('#audio2control').attr('src',mediaFiles[0].fullPath);
					my_media = new Media(mediaFiles[0].fullPath, onSuccess, onError)
				
			    }

			    // Called if something bad happens.
			    // 
			    function captureError(error) {
			        var msg = 'An error occurred during capture: ' + error.code;
			        navigator.notification.alert(msg, null, 'Uh oh!');
			    }
/*
	function recordAudio() {
				$('#play2button').hide();
		       var src = "sounds/d24.wav";
		        var mediaRec = new Media(src, onSuccess, onError);

		        // Record audio
		        mediaRec.startRecord();
				console.log("recording");
		        // Stop recording after 3 sec
		        var recTime = 0;
		        var recInterval = setInterval(function() {
		            recTime = recTime + 1;
		         //   setAudioPosition(recTime + " sec");
		            if (recTime >= 3) {
		                clearInterval(recInterval);
		                mediaRec.stopRecord();
						console.log("stop recording");
						$('#playbutton').show();
		            }
		        }, 1000);
		    }
*/

	function onSuccess() {
		            console.log("playAudio():Audio Success");
		        }

		        // onError Callback 
	function onError(error) {
		            alert('code: '    + error.code    + '\n' + 
		                  'message: ' + error.message + '\n');
		        }


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}







