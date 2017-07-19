// var recognition = new webkitSpeechRecognition();
// var mic_icon = $('#mic_icon');
// var voice_result_string = $('#voice_result_string');

// recognition.lang = 'nl-NL';
// recognition.continuous = true;
// recognition.interimResults = true;

// recognition.onresult = function(event) { 
// 	var speech = event['results'][event.resultIndex][0]['transcript'];
// 	var n = speech.split(" ");
//     word = n[n.length - 1];

// 	setProperty(voice_result_string, "value", word);
// 	setProduct("shoe");
// }

// recognition.onspeechstart = function(event) {
// 	setProperty(voice_result_string, "value", "I'm listening..");
// 	setProperty(mic_icon, "color", "red");
// }

// recognition.onspeechend = function(event) {
// 	setProperty(mic_icon, "color", "#fff");
// }

// recognition.start();