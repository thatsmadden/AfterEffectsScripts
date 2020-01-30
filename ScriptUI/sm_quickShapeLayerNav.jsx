function navShapeGroups(dir){
  var direction = ((dir == 1) ? 'down' : 'up');
  var comp = app.project.activeItem;
  var properties = comp.selectedProperties;
  if (properties.length == 1) {
    var p = properties[0];
    if (p.matchName == "ADBE Vector Group"){

      var ind = p.propertyIndex;
      var parGroup = p.propertyGroup(1);
      var sibCount = parGroup.numProperties;
      //alert("I am sibling " + ind + " of " + sibCount + " siblings.")
      if (dir == -1 && ind > 1) {
        p.selected = false;
        parGroup.property(ind + dir).selected = true;
      }

      if (dir == 1 && ind < sibCount){
        p.selected = false;
        parGroup.property(ind + dir).selected = true;
      }
    }
  }
}



{
   function myScript(thisObj) {
      function myScript_buildUI(thisObj) {
                var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "sm_quickShapeLayerNav", [0, 0, 50, 50]);

                res = "group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                        upButton: Button{text:'⯅'},\
                        downButton: Button{text:'⯆'},\
                }"

                // Adds resource string to panel
                myPanel.grp = myPanel.add(res);

                // Assign function to UI elements
                myPanel.grp.upButton.onClick = function(){
                  navShapeGroups(-1);
                };
                myPanel.grp.downButton.onClick = function(){
                  navShapeGroups(1);
                };

                // Setup panel sizing and make panel resizable
                myPanel.layout.layout(true);
                //myPanel.grp.minimumSize = myPanel.grp.size;
                myPanel.layout.resize();
                myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}

                return myPanel;
      }

      // Build script panel
      var myScriptPal = myScript_buildUI(thisObj);

      if ((myScriptPal != null) && (myScriptPal instanceof Window)) {
          myScriptPal.center();
          myScriptPal.show();
       }
   }

   // Execute script
   myScript(this);
}
