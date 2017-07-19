function setProperty(target, property, value) {
	AFRAME.utils.entity.setComponentProperty(target, property, value);
}

function setProduct(gltfModel, description) {
	var product = $("#product");
	var html = '';

	// Generate product HTML
	if(isMobile) {
		html = '<a-entity position="0 0 0">' +
      				'<a-animation attribute="rotation"dur="10000"fill="forwards"to="0 360 0"repeat="indefinite" easing="linear"></a-animation>' +
             		'<a-entity gltf-model="' + MODEL3D_FOLDER + gltfModel + '" rotation="-90 0 0" scale="0.125 0.125 0.125"></a-entity>' +
          		'</a-entity>';
	} else {
		html = '<a-entity id="sphere" class="interactable" grabbable stretchable hoverable geometry="primitive: box; width: 0.3; height: 0.15; depth: 0.15" position="0 3 0" material="opacity: 0;" dynamic-body>' +
					'<a-entity gltf-model="' + MODEL3D_FOLDER + gltfModel + '" " rotation="-90 0 0" scale="0.125 0.125 0.125"></a-entity>' + 
				'</a-entity>';
	}
	
	product.empty();
	product.append(html);

	$("#productDescription").attr("value", description);
	$("#productDetails").attr("visible", "true");

	var debugDescription = gltfModel.charAt(0).toUpperCase() + gltfModel.slice(1) + ' is probably the greatest product we have to offer! Anyway, lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu eros sit amet justo condimentum finibus. Duis mi risus, lacinia at ipsum rhoncus, facilisis hendrerit leo. Aliquam erat volutpat. Sed lectus lacus, rutrum quis velit non, auctor porttitor urna. Cras eu neque id odio semper interdum vel vel urna. Cras et est sit amet magna ultrices pharetra vel et libero.';
	$("#productDescriptionList").attr("value", debugDescription);
}

function openProductList() {
	$("#categoryList").attr("visible", "true");
	$("#startScreen").attr("visible", "false");
}

function closeProductList() {
	$("#productList").empty();
	$("#categoryList").attr("visible", "true");
}

// Load categories
var categories;

$( document ).ready(function() {
  getCategories();
  setupApp();
});

function getCategories() {
	$.get(API_LINK + "vrshop", function(categoriesList) {
		categories = JSON.parse(categoriesList);
		buildCategoryList(categories);
	});
}

function setupApp() {
	// Set promotion images
	$.get(API_LINK + "vrshop/index/locationdetails", function(locationDetails) {

		var location = JSON.parse(locationDetails);

		var promotion1 = API_LINK + "media/vrshop/" + location['promotion1'];
		var promotion2 = API_LINK + "media/vrshop/" + location['promotion2'];

		$.get('template/locations/' + location['template'] + '.html', function(template) {
		  	var scene = $("#aframeScene");
		  	scene.append(template);
		  	$('#promotion1').attr("src", promotion1);
			$('#promotion2').attr("src", promotion2);
		});
	});
}

function buildCategoryList(categoriesList) {
	var html = '<a-entity hexagon-grid="columns: 4; x: 0; z: 2; y: -3.5">';
		for(var loopindex in categories) {
			for(var id in categories[loopindex]) {
				html += '<a-entity hexagon-button="text: ' + categories[loopindex][id]['name'] + '" onclick="buildProductList(' + loopindex + ', ' + id + ')"></a-entity>';
			}
		};
	html += "</a-entity>";
	buildGrid("#categoryList", html);
}

function buildProductList(objectIndex, categoryId) {

	var html = '<a-entity hexagon-grid="columns: 4; x: 0; z: 2; y: -3.5">';

	jQuery.each(categories[objectIndex][categoryId]['products'], function(id, product) {
		var productString = JSON.stringify(product);
		html += '<a-entity hexagon-image="source: ' + product['image'] + '" onclick="setProduct(\'' + product['3dmodel'] + '\', \'' + product['description'] + '\')"></a-entity>';
	});
	
	html += "</a-entity>";

	buildGrid("#productList", html);

	$("#productList").prepend('<a-text value="Pick a product" position="0 4 -3.5" scale="2 2 2" align="center"></a-text>');
	$("#productList").append('<a-entity hexagon-button="text: Back" onclick="closeProductList()" position="-3 0 -3.5"></a-entity>');

	$("#productList").attr("visible", "true");
	$("#categoryList").attr("visible", "false");
}

function buildGrid(target, html) {
	$(target).append(html);
}