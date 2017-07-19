
<html>
  <head>
    <script src="config.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    <script src="https://aframe.io/releases/0.5.0/aframe.min.js"></script>
    <script src="dist/aframe-extras/aframe-extras.js"></script>
    <script src="https://rawgit.com/ngokevin/aframe-event-set-component/master/dist/aframe-event-set-component.min.js"></script>
    <script src="https://rawgit.com/wmurphyrd/aframe-super-hands-component/master/dist/super-hands.min.js"></script>
    <script src="dist/cursor/cursor.js"></script>
    <script src="assets/js/gui-components.js"></script>
    <script src="assets/js/initcontroller.js"></script>
    <script src="https://d3js.org/d3.v4.min.js"></script>
  </head>

  <body>
    <div>
      <a-scene physics id="aframeScene">

        <?php include('template/assets.html'); ?>

        <?php include('template/decorations.html'); ?>

        <?php include('template/gui.html'); ?>

        <!-- Product -->
        <a-entity id="product"></a-entity>
      </a-scene>
    </div>
  </body>
</html>

<script src="assets/js/speech.js"></script>
<script src="assets/js/shop.js"></script>

<!-- STRESSTEST -->
<!-- <script src="tests/performance.js"></script> -->