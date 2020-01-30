// sm_move v1.0
// Moves layer selection and/or soloing. Hold SHIFT to add to the selection and/or soloing.
{
function moveSelection(dir, _shift){
  var comp = app.project.activeItem;
  var l = comp.layers;
  var k = 0;
  if (dir > 0){

    for (var i = l.length; i >= 1; i--){

      var curLayer = l[i];
      var ind = curLayer.index;

      try {
          var k = 0;
          while (comp.layer(ind + dir + k*dir).locked){
            k++;
          }

          var otherLayer = comp.layer(ind + dir + k*dir);

      } catch (e) {
          if (e instanceof SyntaxError) {
              continue;
          }
      }
      if (curLayer.selected && !otherLayer.locked){
        otherLayer.selected = true;
        if (!_shift){
          curLayer.selected = false;
        }
      }
    }


    } else {
      for (var j = 1; j <= l.length; j++){
        var curLayer = l[j];
        var ind = curLayer.index;
        try {
          var k = 0;
          while (comp.layer(ind + dir + k*dir).locked){
            k++;
          }

          var otherLayer = comp.layer(ind + dir + k*dir);


        } catch (e) {
            if (e instanceof SyntaxError) {
                continue;
            }
        }
        if (curLayer.selected && !otherLayer.locked){
          otherLayer.selected = true;
          if (!_shift){
            curLayer.selected = false;
          };
        }
      }
    }
  }

function moveSolo(dir, _shift){
  var comp = app.project.activeItem;
  var l = comp.layers;
  var k = 0;
  if (dir > 0){

    for (var i = l.length; i >= 1; i--){

      var curLayer = l[i];
      var ind = curLayer.index;

      try {
          var k = 0;
          while (!comp.layer(ind + dir + k*dir).enabled){
            k++;
          }

          var otherLayer = comp.layer(ind + dir + k*dir);

      } catch (e) {
          if (e instanceof SyntaxError) {
              continue;
          }
      }
      if (curLayer.solo && otherLayer.enabled){
        otherLayer.solo = true;
        if (!_shift){
          curLayer.solo = false;
        };

      }
    }


    } else {
      for (var j = 1; j <= l.length; j++){
        var curLayer = l[j];
        var ind = curLayer.index;
        try {
          var k = 0;
          while (!comp.layer(ind + dir + k*dir).enabled){
            k++;
          }

          var otherLayer = comp.layer(ind + dir + k*dir);


        } catch (e) {
            if (e instanceof SyntaxError) {
                continue;
            }
        }
        if (curLayer.solo && otherLayer.enabled){
          otherLayer.solo = true;
          if (!_shift){
            curLayer.solo = false;
          }
        }
      }
    }
  }


  function myScript(thisObj) {
      function myScript_buildUI(thisObj) {
                var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "sm_move", [0, 0, 50, 50]);

                res = "group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                  dropper: DropDownList{properties:{items:['Selection', 'Solo', 'Both']}},\
                  buttonGroup: Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                        upButton: Button{text:'up'},\
                        downButton: Button{text:'down'},\
                  }\
                }"

                // Adds resource string to panel
                myPanel.grp = myPanel.add(res);
                myPanel.grp.dropper.selection = 0;
                // Assign function to UI elements
                myPanel.grp.buttonGroup.upButton.onClick = function(){
                  var shift = ScriptUI.environment.keyboardState.shiftKey;
                  if (myPanel.grp.dropper.selection.text == "Selection"){
                    app.beginUndoGroup("sm_moveSelectionUp");
                    moveSelection(-1, shift);
                    app.endUndoGroup();
                  } else if (myPanel.grp.dropper.selection.text == "Solo") {
                    app.beginUndoGroup("sm_moveSoloUp");
                    moveSolo(-1, shift);
                    app.endUndoGroup();
                  } else if (myPanel.grp.dropper.selection.text == "Both") {
                    app.beginUndoGroup("sm_moveBothUp");
                    moveSelection(-1, shift);
                    moveSolo(-1, shift);
                    app.endUndoGroup();
                  };

                };
                myPanel.grp.buttonGroup.downButton.onClick = function(){
                  var shift = ScriptUI.environment.keyboardState.shiftKey;
                  if (myPanel.grp.dropper.selection.text == "Selection"){
                    app.beginUndoGroup("sm_moveSelectionDown");
                    moveSelection(1, shift);
                    app.endUndoGroup();
                  } else if (myPanel.grp.dropper.selection.text == "Solo") {
                    app.beginUndoGroup("sm_moveSoloDown");
                    moveSolo(1, shift);
                    app.endUndoGroup();
                  } else if (myPanel.grp.dropper.selection.text == "Both") {
                    app.beginUndoGroup("sm_moveBothDown");
                    moveSelection(1, shift);
                    moveSolo(1, shift);
                    app.endUndoGroup();
                  };;
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
