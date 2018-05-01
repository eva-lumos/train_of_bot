require('tracking')

const destCanvas = document.createElement('canvas');
destCanvas.id = 'frameCanvas';
const videoBuffer = document.createElement('video');
videoBuffer.id = 'videoBuffer';
videoBuffer.width = destCanvas.width = window.gameWindowSize.width;
videoBuffer.height = destCanvas.height = window.gameWindowSize.height;
destCanvas.style.position = 'absolute';
destCanvas.style.left = 'calc(50% - 320px)';
destCanvas.style.top = 0;
destCanvas.style.pointerEvents = 'none';
document.querySelector('#game-manager').appendChild(destCanvas);
document.body.appendChild(videoBuffer);
const context = destCanvas.getContext('2d');

//captureStream takes in an fps to capture at
const srcData = document.querySelector('#gameCanvas').captureStream(60);
videoBuffer.srcObject = srcData

tracking.ColorTracker.registerColor('green', function(r, g, b) {
  if (r < 20 && g > 130 && b < 50) {
    return true;
  }
  return false;
});

tracking.ColorTracker.registerColor('white', function(r, g, b) {
  if (r > 230 && r < 250 && g > 230 && g < 250 && b > 230 && b < 250 ) {
    if (r - g == 0 && g - b == 0 ){
      return true;
    }
  }
  return false;
});

tracking.ColorTracker.registerColor('gray', function(r, g, b) {
  if (r > 160 && r < 225 && g > 160 && g < 225 && b > 160 && b < 225 ) {
    if (r - g == 0 && g - b == 0 ){
      return true;
    }
  }
  return false;
});

tracking.ColorTracker.registerColor('white', function(r, g, b) {
  if (r > 190 && r < 245 && g > 190 && g < 245 && b > 190 && b < 245 ) {
    if (r - g == 0 && g - b == 0 ){
      return true;
    }
  }
  return false;
});

tracking.ColorTracker.registerColor('black', function(r, g, b) {
  if (r > 33 && r < 75 && g > 33 && g < 75 && b > 33 && b < 75 ) {
    return true;
  }
  return false;
});

var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow', 'green', 'white', 'black']);
colors.setMinDimension(10);

colors.on('track', function(event) {
  context.clearRect(0, 0, destCanvas.width, destCanvas.height);
  if (event.data.length === 0) {
    // No colors were detected in this frame.
  } else {
    event.data.forEach(function(rect) {
      context.strokeStyle = rect.color;
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    });
  }
});
var trackerTask = tracking.track('#videoBuffer', colors);
