document.addEventListener("deviceready", onDeviceReady, false);
    
// Cordova is ready
    //
    function onDeviceReady() {
        console.log("Cordova Ready");
		$('#playbutton').hide();
    }


var serviceURL = "http://www.dictiondoctor.com/DDServices/";
//var serviceURL = "http://localhost/~daniel.neumann/DDServices/";
$('#screen2Page').live('pageshow', function(event) {
	$.mobile.allowCrossDomainPages = true;
	var id = getUrlVars()["id"];
//	alert("Called with id=" + id);
	console.log(serviceURL+'getword.php?id='+id);
	$.getJSON(serviceURL + 'getword.php?id='+id, displayWord);
	
});

function displayWord(data) {

	var screen2data = data.item;
	console.log(screen2data);
//	alert("Word= " + screen2data.Name);
//	$('#screendirection').append("ChangedText");
//	$('#screendirection')[0].innerHTML=screen3data.directionString;
	var audiosource = "sounds/w"+screen2data.wordID+".wav";
	$('#audiocontrol').attr('src',audiosource);
	$('#wordbutton').text(screen2data.Name);
	$("#wordbutton").click(function() {
	  playAudio(audiosource);
	});
	$('#recordbutton').click(function() {
		recordAudio();
	});
	$('#playbutton').click(function() {
		playRecording();
	});
	
	
	
	
//	$('#wordbutton').refresh;
	$('#IPAbutton').text(screen2data.IPA);
	var screenref = "screen" + screen2data.nextScreenType + ".html?id=" + screen2data.nextScreenID;
	console.log(screenref);
	//$('#navbuttons li').remove();
	//$('#navbuttons').append('<li><a href="'+screenref+'" data-role="button" data-theme="b" id="btnNext">Next</a></li>');
	$('#btnNext').attr('href', screenref);
//	$('#btnNext').text(screenref);
//	$('#btnNext').listview('refresh');

}
var my_media = null;
var mediaTimer = null;

       // Play audio
       //
function playAudio(src) {
		console.log("called playaudio with " + src);
         
               // Create Media object from src
			   my_media = new Media(src, onSuccess, onError);
			   my_media.play()
         
       }
function playRecording() {
			console.log("called playrecording");

	               // Create Media object from src
				   var src = "sounds/myrecording.wav";
	               my_media = new Media(src, onSuccess, onError);
				   my_media.play()

	       }
function recordAudio() {
			$('#playbutton').hide();
	        var src = "sounds/himmel.mp3";
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







