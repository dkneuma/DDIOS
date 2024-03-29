document.addEventListener("deviceready", onDeviceReady, false);
    
// Cordova is ready
    //
    function onDeviceReady() {
        console.log("Cordova Ready");
    }


var serviceURL = "http://www.dictiondoctor.com/DDServices/";
//var serviceURL = "http://localhost/~daniel.neumann/DDServices/";



var my_media = null;
var mediaTimer = null;
var myletterIPA = null;
var myRule = null;

$('#screen5Page').live('pageshow', function(event) {
	$.mobile.allowCrossDomainPages = true;
	var id = getUrlVars()["id"];
//	alert("Called with id=" + id);
	$.getJSON(serviceURL + 'getletter.php?callback=?','id='+id, function(data){
			var letterdata = data.item;
			var newstring = "Unit "+letterdata.letterID+" "+letterdata.letterIPA;
			$('#letter5sound').text(newstring);
	
		});

	
	console.log(serviceURL+'getword.php?id='+id);
	$.getJSON(serviceURL + 'getword.php?callback=?','id='+id, function(data){
			var screen2data = data.item;
			
			$('#word5button').text(screen2data.Name);
			myletterIPA = screen2data.IPALetter;
			myRule = screen2data.ruleID;
			var screenref = "screen" + screen2data.nextScreenType + ".html?id=" + screen2data.nextScreenID;
			console.log(screenref);
			//$('#navbuttons li').remove();
			//$('#navbuttons').append('<li><a href="'+screenref+'" data-role="button" data-theme="b" id="btnNext">Next</a></li>');
			$('#btn5Next').attr('href', screenref);
		//	$('#btnNext').text(screenref);
		//	$('#btnNext').listview('refresh');
		
		
	});
	$.getJSON(serviceURL + 'getquiz.php?callback=?','id='+id, function(data){
			$('#ipa5List li').remove();
			var letters = data.items;
			$.each(letters, function(index, letter) {
				console.log(index,letter)
		//					//append to letterlist
				$('#ipa5List').append('<li>' + letter.IPALetter +'</li>');
			});
			$('#ipa5List').listview('refresh');
			$('#ipa5List').selectable();
			$('#ipa5List li').click(function(){
				
				if (this.innerHTML == myletterIPA) {
					alert("Correct. The IPA Symbol for this sound is: " + myletterIPA);    
				}
				else {
					alert("Wrong IPA Letter for this sound");
				}
		
				
				
				});
			
	});
	
	$.getJSON(serviceURL + 'getrules.php?callback=?','id='+id, function(data){
			$('#rule5List li').remove();
			var rules = data.items;
			$.each(rules, function(index, rule) {
				console.log(index,rule)
		//					//append to letterlist
				$('#rule5List').append('<li>' + rule.ruleID + ' ' + rule.ruleText +'</li>');
			});
			$('#rule5List').listview('refresh');
			$('#rule5List').selectable();
			$('#rule5List li').click(function(){
				
				if (parseInt(this.innerHTML) == myRule) {
				alert("Correct rule for this word");    
			} else {
				alert("Wrong rule for this word");
			}
				
				});
			
	});
	
});



       // Play audio
       //
       function playAudio(src) {
           if (my_media == null) {
               // Create Media object from src
               my_media = new Media(src, onSuccess, onError);
           } // else play current audio
           // Play audio
           my_media.play();
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







