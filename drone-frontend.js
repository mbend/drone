function init() {
    var tracker = initTracker("#example");
    tracking.track("#example .drone", tracker);
}

function initTracker(element) {
    // Initialise a color tracker
    var tracker = new tracking.ColorTracker();

    TrackerUtils.startTrackingColors(tracker);

    // Whenever there is a new color detected, mark them
    tracker.on('track', function(event) {
        markColors(event.data, element);
        console.log(event.data);
    });

    return tracker;
}

function markColors(colors, element) {
    // Do the marking
    var canvas = $(element + ' .canvas').get(0);
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, context.width, context.height);

    for (var i = 0; i < colors.length; i++) {
        drawRectangle(colors[i], context);
        writeRectangle(colors[i], element + " .output")
    }
}

function drawRectangle(rect, context) {
    context.strokeStyle = rect.color;
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
}

function writeRectangle(rect, element) {
    $(element)
        .append("<p>")
        .append(rect.color + ": " + rect.width + "X" + rect.height)
        .append(" @ " + rect.x + ":" + rect.y)
}

window.addEventListener("load", init);