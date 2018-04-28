require('tracking')
var html2canvas = require('html2canvas')

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

var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
colors.setMinDimension(5);

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
