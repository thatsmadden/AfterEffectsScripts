//sm_setIntervalMarkers 2019

var comp = app.project.activeItem;
var spacing = parseInt(prompt("How many frames between markers?", "144"));
var numMarkers = Math.floor(((comp.duration-comp.time)*comp.frameRate)/spacing);
var mark = new MarkerValue("");
app.beginUndoGroup("sm_setIntervalMarkers");
for (var i = 0; i <= numMarkers; i++){

  comp.markerProperty.setValueAtTime((i*spacing)/comp.frameRate + comp.time, mark);
}
app.endUndoGroup();
