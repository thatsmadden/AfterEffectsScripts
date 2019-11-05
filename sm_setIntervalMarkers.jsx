//sm_setIntervalMarkers v1.0
// Copyright (c) 2019 Steve Madden. All rights reserved.

// Adds markers to the current composition spaced out the number of frames provided by the user, starting at the playhead.
// To use: Make sure your composition timeline is focused in the interface, your playhead is where you want your first marker, and run the script, and follow the prompts.

// Legal stuff:
// This script is provided "as is," without warranty of any kind, expressed or
// implied. In no event shall the author be held liable for any damages
// arising in any way from the use of this script.

var comp = app.project.activeItem;
var spacing = parseInt(prompt("How many frames between markers?", "144"));
var numMarkers = Math.floor(((comp.duration-comp.time)*comp.frameRate)/spacing);
var mark = new MarkerValue("");

if (spacing != null && spacing !=0){
  app.beginUndoGroup("sm_setIntervalMarkers");
  for (var i = 0; i <= numMarkers; i++){
    comp.markerProperty.setValueAtTime((i*spacing)/comp.frameRate + comp.time, mark);
  }
  app.endUndoGroup();
};
