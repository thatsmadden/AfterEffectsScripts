// sm_shapeHelper v0.2



{
  function sm_shapeHelper(_m){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;

    for (var i = 0; i < l.length; i++){
      var rootGroup = l[i].property("ADBE Root Vectors Group");
      for (var j = 1; j<= rootGroup.numProperties; j++ ){

        var tGroup = rootGroup.property(j).property("ADBE Vector Transform Group");
        tGroup.property("ADBE Vector " + _m).selected = true;
      }

    }
  }

  function sm_selectedShapeHelper(){
    var comp = app.project.activeItem;
    var props = comp.selectedProperties;
    var curPath = "";

    if (props.length == 1){
      for (var j = 0; j < props[0].propertyDepth; j++){
        if (j == 0) {
          curPath = ".property(\"" + props[0].matchName + "\")";
        } else {
          if (props[0].propertyGroup(j).matchName == "ADBE Vector Group"){
              break;

          } else {
            curPath = ".property(\"" + props[0].propertyGroup(j).matchName + "\")" + curPath;
          }

        }
      }
      for (var k = 0; k < comp.selectedLayers.length; k++){
        var rootGroupStr = "comp.layer(" + comp.selectedLayers[k].index + ")" + ".property(\"ADBE Root Vectors Group\")";
        var curCheckPropStr = rootGroupStr + ".property(\"ADBE Vector Group\")" + curPath;
        //alert(curCheckPropStr);
        try {
            eval(rootGroupStr);
        } catch (e) {
            if (e instanceof SyntaxError) {
                continue;
            }
        }
        var rootGroup = eval(rootGroupStr);
        for (var k = 1; k<= rootGroup.numProperties; k++){

          try {
              eval(curCheckPropStr.replace("\"ADBE Vector Group\"", k.toString()));
          } catch (e) {
              if (e instanceof SyntaxError) {
                  continue;
              }
          }
          var curCheckProp = eval(curCheckPropStr.replace("\"ADBE Vector Group\"", k.toString()));
          if (curCheckProp !=null){
            curCheckProp.selected = true;
          }
        }

        }




    } else {
    alert("Sorry. Only one property at a time.");
    }
  }

  function myScript(thisObj) {
      function myScript_buildUI(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "sm_shapeHelper", [0, 0, 50, 25]);

        res = "group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
          dropper: DropDownList{properties:{items:['Scale','Position','Anchor Point','Opacity', 'Selected']}, preferredSize:[200,25]},\
          doButton: Button{text:'*', size:[20,20]},\
          qButton: Button{text:'?', size:[20,20]},\
          }\
        }"

        // Adds resource string to panel
        myPanel.grp = myPanel.add(res);
        myPanel.grp.dropper.selection = 0;
        // Assign function to UI elements
        myPanel.grp.doButton.onClick = function(){
          if (myPanel.grp.dropper.selection.text !== "Selected"){
            var modeTextEditA = myPanel.grp.dropper.selection.text.replace(" Point", "");
            var modeTextEditB = modeTextEditA.replace("Opacity", "Group Opacity");
            sm_shapeHelper(modeTextEditB);
          } else {
            sm_selectedShapeHelper();
          }


        }

        myPanel.grp.qButton.onClick = function(){
          alert("Selects properties within Shape Layer groups according to the drop-down. The \"Anchor Point\", \"Opacity\", \"Position\", \"Rotation\", and \"Scale\" options select those respective properties within the Shape Layer Group's Transform group. Use \"Selected\" to mirror the current property selection across all Shape Groups on the layer. (Works with only one property selection at the moment.)")

        }

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
