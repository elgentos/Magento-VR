// Gui Interaction
AFRAME.registerComponent('gui-listener', {

  init: function () {
    this.el.addEventListener('mouseenter', function (evt) {
      evt.srcElement.closest("#sphere").setAttribute('src', 'assets/img/buttons/hexagon-hover.png');
    });

    this.el.addEventListener('mouseleave', function (evt) {
      evt.srcElement.closest("#sphere").setAttribute('src', 'assets/img/buttons/hexagon-white.png');
    });

    this.el.addEventListener('click', function (evt) {
    });
  }
});


// Gui with image interaction (TODO: refactor)
AFRAME.registerComponent('gui-listener-image', {

  init: function () {
    this.el.addEventListener('mouseenter', function (evt) {
      var button = evt.srcElement.previousElementSibling.previousElementSibling;
      button.setAttribute('src', 'assets/img/buttons/hexagon-hover.png');
    });

    this.el.addEventListener('mouseleave', function (evt) {
      var button = evt.srcElement.previousElementSibling.previousElementSibling;
      button.setAttribute('src', 'assets/img/buttons/hexagon-white.png');
    });

    this.el.addEventListener('click', function (evt) {    
      
    });
  }
});

// Buttons
AFRAME.registerComponent('gui-text', {
  schema: {
    value: { type: 'string' }
  },
  init: function() {
    // TODO: Add bigger collision box
    var html = '<a-entity id="sphere" mixin="textlabel" text="value: ' + this.data.value + '; align: center; color: #575757" position="0 0 0.10"></a-entity>';
    this.el.innerHTML = html;
  }
});

// Button List
AFRAME.registerComponent('list-column', {
  schema: {
    offset: { type: 'number' }
  },
  init: function() {
    var children =  this.el.children;
    for (var i = 0; i < children.length; i++) {
      children[i].setAttribute("position", "0 " + (i * (-1 * this.data.offset)) + " 0");
    }
  }
});

// Hexagon
AFRAME.registerComponent('hexagon-button', {
  schema: {
    text: { type: 'string' }
  },
  init: function() {
    var html =  '<a-entity>' +
                  '<a-image id="sphere" gui-listener src="assets/img/buttons/hexagon-white.png" position="0 0 0" scale="1.6 1.40 1.40"></a-image>' +
                  '<a-animation attribute="rotation" easing="ease-in" dur="1500" fill="forwards" begin="growButton" to="0 0 360"></a-animation>' +
                  '<a-text gui-listener value="' + this.data.text + '" align="center" color="#424242" width="4.2"></a-text>' +
                '</a-entity>';
    this.el.innerHTML = html;
  }
});

AFRAME.registerComponent('hexagon-image', {
  schema: {
    source: { type: 'string' }
  },
  init: function() {
    var html =  '<a-entity>' +
                  '<a-image id="sphere" gui-listener src="assets/img/buttons/hexagon-white.png" position="0 0 0" scale="1.6 1.40 1.40"></a-image>' +
                  '<a-animation attribute="rotation" easing="ease-in" dur="1500" fill="forwards" begin="growButton" to="0 0 360"></a-animation>' +
                  '<a-image gui-listener-image src="' + this.data.source + '" scale="0.812 0.812 0.812" position="0 0 0.002"></a-image>' +
                '</a-entity>';
    this.el.innerHTML = html;
  }
});

AFRAME.registerComponent('hexagon-grid', {
  schema: {
    columns: { type: 'number' }, 
    x: { type: 'number' },
    y: { type: 'number' },
    z: { type: 'number' }
  },
  init: function() {

    var buttonWidth= 1.2;
    var buttonHeight = 1.36;
    var forwardOffset = 0.01;

    var children =  this.el.children;
    var totalButtons = children.length;

    var columns = this.data.columns;
    var columnIndex = 0;
    var columnOffset = 0;
    var rowIndex = 0;
    var lowerButton = false;

    if(totalButtons < columns ) {
      columns = totalButtons;
    }

    // Align grid to center of origin point
    this.data.x -= (((totalButtons / (totalButtons / columns)) * buttonWidth) - buttonWidth ) / 2;
    this.el.setAttribute("position", this.data.x + " " + this.data.z + " " + this.data.y);

    // Set positition of buttons
    for (var i = 0; i < totalButtons; i++) {
      if(columnIndex >= columns) {
        rowIndex++;
        columnOffset = rowIndex * buttonHeight; 
        columnIndex = 0;
      }

      lowerButton = !lowerButton;
      forwardOffset = 0.0008 * i;
      verticalOffset = 0 - columnOffset;

      if(lowerButton) {
        verticalOffset = (buttonHeight / 2) - columnOffset;
      }

      children[i].setAttribute("position", (columnIndex * buttonWidth) + " " + verticalOffset + " " + forwardOffset);

      columnIndex++;
    }
  }
});