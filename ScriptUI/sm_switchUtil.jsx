// sm_switchUtil v1.0 - 100319

{
  function doTheThing(_opStr, _tStr, _modifier){
    var comp = app.project.activeItem;
    var l = comp.layers;
    var is = [];
    var isNot = [];

    switch(_tStr) {
      case "Selected":
        
        for (var i = 1; i <= l.length; i++){

          if (l[i].selected == true){
            is.push(l[i]);
          } else {
            isNot.push(l[i]);
          };
        }
        break;
      case "Unselected":
        
        for (var i = 1; i <= l.length; i++){

          if (l[i].selected == false){
            is.push(l[i]);
          } else {
            isNot.push(l[i]);
          };
        }
        break;
      case "Shy":
        
        for (var i = 1; i <= l.length; i++){

          if (l[i].shy == true){
            is.push(l[i]);
          } else {
            isNot.push(l[i]);
          };
        }
        break;
      case "Unshy":
        
        for (var i = 1; i <= l.length; i++){

          if (l[i].shy == false){
            is.push(l[i]);
          } else {
            isNot.push(l[i]);
          };
        }
        break;
      case "Visible":
        
        for (var i = 1; i <= l.length; i++){

          if (l[i].enabled == true){
            is.push(l[i]);
          } else {
            isNot.push(l[i]);
          };
        }
        break;
      case "Hidden":
        
        for (var i = 1; i <= l.length; i++){

          if (l[i].enabled == false){
            is.push(l[i]);
          } else {
            isNot.push(l[i]);
          };
        }
        break;
      case "Soloed":
        
        for (var i = 1; i <= l.length; i++){

          if (l[i].solo == true){
            is.push(l[i]);
          } else {
            isNot.push(l[i]);
          };
        }
        break;
      case "Unsoloed":
        
        for (var i = 1; i <= l.length; i++){

          if (l[i].solo == false){
            is.push(l[i]);
          } else {
            isNot.push(l[i]);
          };
        }
        break;
      case "Locked":
        
        for (var i = 1; i <= l.length; i++){

          if (l[i].locked == true){
            is.push(l[i]);
          } else {
            isNot.push(l[i]);
          };
        }
        break;
      case "Unlocked":
        
        for (var i = 1; i <= l.length; i++){

          if (l[i].locked == false){
            is.push(l[i]);
          } else {
            isNot.push(l[i]);
          };
        }
        break;
      case "All":
        
        for (var i = 1; i <= l.length; i++){
          is.push(l[i]);
        }
        break;
      default:
        
        alert("Something went wrong with the input. Try again.")
    }

    switch(_opStr) {
      case "Select":
        
        for (var k = 0; k < is.length; k++){
          is[k].selected = true;
        }
        if (_modifier == "alt"){
          for (var m = 0; m < isNot.length; m++){
            isNot[m].selected = false;
          }
        }

        break;
      case "Deselect":
        
        for (var k = 0; k < is.length; k++){
          is[k].selected = false;
        }
        if (_modifier == "alt"){
          for (var m = 0; m < isNot.length; m++){
            isNot[m].selected = true;
          }
        }
        break;
      case "Shy":
        
        for (var k = 0; k < is.length; k++){
          is[k].shy = true;
        }

        if (_modifier == "alt"){
          for (var m = 0; m < isNot.length; m++){
            isNot[m].shy = false;
          }
        }
        break;
      case "Unshy":
        
        for (var k = 0; k < is.length; k++){
          is[k].shy = false;
        }
        if (_modifier == "alt"){
          for (var m = 0; m < isNot.length; m++){
            isNot[m].shy = true;
          }
        }
        break;
      case "Show":
        
        for (var k = 0; k < is.length; k++){
          if (!is[k].isTrackMatte){
            is[k].enabled = true;
          }
        }
        if (_modifier == "alt"){
          for (var m = 0; m < isNot.length; m++){
            isNot[m].enabled = false;
          }
        }
        break;
      case "Hide":
        
        for (var k = 0; k < is.length; k++){
          is[k].enabled = false;
        }
        if (_modifier == "alt"){
          for (var m = 0; m < isNot.length; m++){
            if (!isNot[m].isTrackMatte){
              isNot[m].enabled = true;
            }

          }
        }
        break;
      case "Solo":
        
        for (var k = 0; k < is.length; k++){
          if (is[k].enabled == true){
            is[k].solo = true;
          }

        }
        if (_modifier == "alt"){
          for (var m = 0; m < isNot.length; m++){
            if (isNot[m].enabled == true){
              isNot[m].solo = false;
            }
          }
        }
        break;
      case "Unsolo":
        
        for (var k = 0; k < is.length; k++){
          if (is[k].enabled == true){
            is[k].solo = false;
          }
        }
        if (_modifier == "alt"){
          for (var m = 0; m < isNot.length; m++){
            if (isNot[m].enabled == true){
              isNot[m].solo = true;
            }
          }
        }
        break;
      case "Lock":
        
        for (var k = 0; k < is.length; k++){
          is[k].locked = true;
        }
        if (_modifier == "alt"){
          for (var m = 0; m < isNot.length; m++){
            isNot[m].locked = false;
          }
        }
        break;
      case "Unlock":
        
        for (var k = 0; k < is.length; k++){
          is[k].locked = false;
        }
        if (_modifier == "alt"){
          for (var m = 0; m < isNot.length; m++){
            isNot[m].locked = true;
          }
        }
        break;
      default:
        
        alert("Something went wrong with the output. Try again.")
    }





  }
}

function getCheckboxes(_icGroup){
  var checks = [];
  for (var j = 0; j < _icGroup.children.length; j++){
    if (_icGroup.children[j].value == true){
      checks.push(_icGroup.children[j].text);
    }
  }
  return checks;

}
// Reference script to create palette with resource string elements
// Provided by CreativeDojo.net

{
   function myScript(thisObj) {
      function myScript_buildUI(thisObj) {
                var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "sm_switchUtil", [0, 0, 300, 300]);

                res = "group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                        pairGrp: Group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                          icGroup: Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'top'], spacing:2,\
                            icSelected: RadioButton{text:'Selected'},\
                            icUnselected: RadioButton{text:'Unselected'},\
                            icShy: RadioButton{text:'Shy'},\
                            icUnshy: RadioButton{text:'Unshy'},\
                            icVisible: RadioButton{text:'Visible'},\
                            icHidden: RadioButton{text:'Hidden'},\
                            icSolo: RadioButton{text:'Soloed'},\
                            icUnsolo: RadioButton{text:'Unsoloed'},\
                            icLocked: RadioButton{text:'Locked'},\
                            icUnlocked: RadioButton{text:'Unlocked'},\
                            icAll: RadioButton{text:'All'},\
                          },\
                          ocGroup: Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'top'], spacing:2,\
                              selectB: Button{text:'Select', preferredSize:[60,20]},\
                              shyB: Button{text:'Shy', preferredSize:[60,20]},\
                              showB: Button{text:'Show', preferredSize:[60,20]},\
                              soloB: Button{text:'Solo', preferredSize:[60,20]},\
                              lockB: Button{text:'Lock', preferredSize:[60,20]},\
                              qB: Button{text:'?', preferredSize:[60,20]},\
                          },\
                    },\
                }"

                // Adds resource string to panel
                myPanel.grp = myPanel.add(res);
                var instructionStr = "sm_switchUtil Instructions\n\n" +
                "Toggles selection or timeline switches (shyness, visibility, soloing, locking) based on the specified parameters.\n\n" +
                "To use, select a radio button on the left to specify which layers to operate on.\n\n" +
                "Press a button on the right to apply the switching/selection.\n\n" +
                "Hold shift to do the opposite function (Shift-clicking \"Lock\" will *unlock* the specified layers).\n\n" +
                "Hold alt or option to apply the opposite switching on the excluded layers. (For instance: with the \"Locked\" radio button on the left selected, alt- or option-clicking the \"Shy\" button on the right will shy all locked layers, but also *unshy all unlocked* layers.)\n\n" +
                "Shift and alt/option can be combined.";

                myPanel.addEventListener ("keydown", function (kd) {pressed (kd)});
                myPanel.addEventListener ("keyup", function (ku) {unpressed (ku)});
                function pressed (k) {
                if(k.keyName === "Shift"){
                  myPanel.grp.pairGrp.ocGroup.selectB.text = "Deselect";
                  myPanel.grp.pairGrp.ocGroup.shyB.text = "Unshy";
                  myPanel.grp.pairGrp.ocGroup.showB.text = "Hide";
                  myPanel.grp.pairGrp.ocGroup.soloB.text = "Unsolo";
                  myPanel.grp.pairGrp.ocGroup.lockB.text = "Unlock";
                  }
                }
                function unpressed (k) {
                if(k.keyName === "Shift"){
                  myPanel.grp.pairGrp.ocGroup.selectB.text = "Select";
                  myPanel.grp.pairGrp.ocGroup.shyB.text = "Shy";
                  myPanel.grp.pairGrp.ocGroup.showB.text = "Show";
                  myPanel.grp.pairGrp.ocGroup.soloB.text = "Solo";
                  myPanel.grp.pairGrp.ocGroup.lockB.text = "Lock";
                  }
                }

                // Assign function to UI elements
                myPanel.grp.pairGrp.ocGroup.selectB.onClick = function(){
                  if ( getCheckboxes(myPanel.grp.pairGrp.icGroup).length != 0){
                    var modifier = "none";
                    if (ScriptUI.environment.keyboardState.altKey){
                      modifier = "alt";
                    }

                    if (ScriptUI.environment.keyboardState.shiftKey){
                      app.beginUndoGroup("sm_switchUtil - Deselect");
                      doTheThing("Deselect", getCheckboxes(myPanel.grp.pairGrp.icGroup)[0], modifier);
                      app.endUndoGroup();
                    } else {
                      app.beginUndoGroup("sm_switchUtil - Select");
                      doTheThing("Select", getCheckboxes(myPanel.grp.pairGrp.icGroup)[0], modifier);
                      app.endUndoGroup();
                    }
                  }
                };

                myPanel.grp.pairGrp.ocGroup.shyB.onClick = function(){
                  if ( getCheckboxes(myPanel.grp.pairGrp.icGroup).length != 0){
                    var modifier = "none";
                    if (ScriptUI.environment.keyboardState.altKey){
                      modifier = "alt";
                    }

                    if (ScriptUI.environment.keyboardState.shiftKey){
                      app.beginUndoGroup("sm_switchUtil - Unshy");
                      doTheThing("Unshy", getCheckboxes(myPanel.grp.pairGrp.icGroup)[0], modifier);
                      app.endUndoGroup();
                    } else {
                      app.beginUndoGroup("sm_switchUtil - Shy");
                      doTheThing("Shy", getCheckboxes(myPanel.grp.pairGrp.icGroup)[0], modifier);
                      app.endUndoGroup();
                    }
                  }
                };

                myPanel.grp.pairGrp.ocGroup.showB.onClick = function(){
                  if ( getCheckboxes(myPanel.grp.pairGrp.icGroup).length != 0){
                    var modifier = "none";
                    if (ScriptUI.environment.keyboardState.altKey){
                      modifier = "alt";
                    }

                    if (ScriptUI.environment.keyboardState.shiftKey){
                      app.beginUndoGroup("sm_switchUtil - Hide");
                      doTheThing("Hide", getCheckboxes(myPanel.grp.pairGrp.icGroup)[0], modifier);
                      app.endUndoGroup();
                    } else {
                      app.beginUndoGroup("sm_switchUtil - Show");
                      doTheThing("Show", getCheckboxes(myPanel.grp.pairGrp.icGroup)[0], modifier);
                      app.endUndoGroup();
                    }
                  }
                };

                myPanel.grp.pairGrp.ocGroup.soloB.onClick = function(){
                  if ( getCheckboxes(myPanel.grp.pairGrp.icGroup).length != 0){
                    var modifier = "none";
                    if (ScriptUI.environment.keyboardState.altKey){
                      modifier = "alt";
                    }

                    if (ScriptUI.environment.keyboardState.shiftKey){
                      app.beginUndoGroup("sm_switchUtil - Unsolo");
                      doTheThing("Unsolo", getCheckboxes(myPanel.grp.pairGrp.icGroup)[0], modifier);
                      app.endUndoGroup();
                    } else {
                      app.beginUndoGroup("sm_switchUtil - Solo");
                      doTheThing("Solo", getCheckboxes(myPanel.grp.pairGrp.icGroup)[0], modifier);
                      app.endUndoGroup();
                    }
                  }
                };

                myPanel.grp.pairGrp.ocGroup.lockB.onClick = function(){
                  if ( getCheckboxes(myPanel.grp.pairGrp.icGroup).length != 0){
                    var modifier = "none";
                    if (ScriptUI.environment.keyboardState.altKey){
                      modifier = "alt";
                    }

                    if (ScriptUI.environment.keyboardState.shiftKey){
                      app.beginUndoGroup("sm_switchUtil - Unlock");
                      doTheThing("Unlock", getCheckboxes(myPanel.grp.pairGrp.icGroup)[0], modifier);
                      app.endUndoGroup();
                    } else {
                      app.beginUndoGroup("sm_switchUtil - Lock");
                      doTheThing("Lock", getCheckboxes(myPanel.grp.pairGrp.icGroup)[0], modifier);
                      app.endUndoGroup();
                    }
                  }
                };

                myPanel.grp.pairGrp.ocGroup.qB.onClick = function(){
                  alert(instructionStr);
                };

                // Setup panel sizing and make panel resizable
                myPanel.layout.layout(true);
                myPanel.grp.minimumSize = myPanel.grp.size;
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
