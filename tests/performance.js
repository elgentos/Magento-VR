var facesObject;
var framesObject;

var lastFaceCount = 0;

var csvOutput = "FPS,Faces|"
var maxFaces = 40000;

var totalTime = 0;
var isPaused = true;

function setup() {
	 facesObject = $(".rs-group").last().prev().prev().children().last().prev().prev().children().last()[0];
     framesObject = $(".rs-group").first().children().last().children().last()[0];
     console.log("Face check: " + facesObject.innerHTML);
     console.log("FPS check: " + framesObject.innerHTML);
     isPaused = false;
}

var spawnloop = window.setInterval(function(){
	if(!isPaused) {
		spawnObject();
	}
}, 3000);

var testloop = window.setInterval(function(){
	if(!isPaused) {
		totalTime += 1000;
		console.log("Time passed: " + totalTime / 1000 + " seconds");
		var faces = facesObject.innerHTML;

		if(parseInt(faces) > maxFaces) {
			console.log("%c DONE", 'background: orange; color: white; font-size: 24px');
			console.log(csvOutput);
			clearInterval(testloop);
			clearInterval(spawnloop);
		}

		if(faces != lastFaceCount) {
			console.log("%c" + (faces / maxFaces * 100) + "%", 'background: green; color: white; font-size: 14px');
			csvOutput += faces + "," + framesObject.innerHTML + "|";
			lastFaceCount = faces;
		}  	
	}
}, 1000);

function spawnObject(gltfModel, description) {
	var product = $("#product");
	var html = '<a-entity position="0 1 -3" material="opacity: 0;">' +
					'<a-entity gltf-model="assets/gltf/testball.gltf" " rotation="-90 0 0" scale="0.125 0.125 0.125"></a-entity>' + 
				'</a-entity>';
	
	product.append(html);
}

