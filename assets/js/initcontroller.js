$( document ).ready(function() {

  if(DEBUG_MOBILE) {
    fakeMobile();
  }

  if(DEBUG_VIVE) {
    fakeVive();
  }
});

var isMobile = false;
var isVive = false;

function fakeMobile() {
  initiateMobileControls();
  isMobile = true;
}

function fakeVive() {
  initiateViveControls();
  isVive = true;
}

function checkDevices() {
  
  isMobile = AFRAME.utils.device.isMobile();
  isVive = !AFRAME.utils.device.isMobile() && AFRAME.utils.device.checkHeadsetConnected();

  if(isVive) { 
    initiateViveControls(); 
  }

  if(isMobile) { 
    initiateMobileControls();
  }
}

function initiateMobileControls() {
  $("#interactTip").attr("value", "Look at a button to interact");

  // Interact image
  var interactImage =   '<a-image id="" src="assets/img/icons/mobile-icon.png" scale="1.40 1 1" position="0.41 0 0"></a-image>' +
                        '<a-animation attribute="rotation" from="0 0 0" to="0 0 8" easing="ease-in" dur="5000" delay="500"></a-animation>';
  $("#interactImage").html(interactImage);

  // Add crosshair object
  var html = '<a-entity id="mobileCrosshair" position="0 0 -3" geometry="primitive: ring; radiusOuter: 0.06; radiusInner: 0.04;" material="color: cyan; shader: flat" cursor="maxDistance: 30; fuse: true">' +
              '<a-animation begin="click" easing="ease-in" attribute="material.color" from="yellow" to="cyan" dur="150"></a-animation>' +
              '<a-animation begin="fusing" easing="ease-in" attribute="material.color" from="cyan" to="yellow" dur="1500"></a-animation>' +
              '<a-animation begin="click" easing="ease-in" attribute="scale" fill="backwards" from="0.3 0.3 0.3" to="1 1 1" dur="150"></a-animation>' +
              '<a-animation begin="fusing" easing="ease-in" attribute="scale" fill="forwards" from="1 1 1" to="0.3 0.3 0.3" dur="1500"></a-animation>' +
            '</a-entity>';
  $("#mainCamera").append(html);
}
  
function initiateViveControls() {

  $("#interactTip").attr("value", "Point and click on a button to interact");

  // Interact image
  var interactImage = '<a-image id="" src="assets/img/icons/vive-controls.png" scale="1.40 1 1" position="0.41 0 0"></a-image>';
  $("#interactImage").html(interactImage);

  // Add controllers objects
  var html = '<a-entity>' +
                '<a-entity vive-controls="hand: left" mixin="controller"></a-entity>' +
                '<a-entity id="pointer" raycaster="objects: #sphere" vive-controls="hand: right" mixin="controller" controller-cursor="color: yellow"></a-entity>'
              '</a-entity>';
  $("#viveControllers").append(html);
}

// Reset Vive position at change
window.onvrdisplaypresentchange = function() {
  checkDevices();
  d3.select('#cameraWrapper').attr('position', '0 0 0').attr('rotation', '0 0 0');
}

// Delayed addition of physics body component to controllers due to AFRAME 0.4.0 changes
AFRAME.registerComponent('controller-loaded', {
  init: function() {
    this.el.addEventListener('model-loaded', function() {
      this.addState('loaded');
    });
  }
});