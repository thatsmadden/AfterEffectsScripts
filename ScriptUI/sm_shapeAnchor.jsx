
function sm_moveShapeAnchor(col, row){
  var xStr = "";
  var yStr = "";
  var matchFound = false;
  var selProps = app.project.activeItem.selectedProperties;
  switch (col) {
    case "l":
      xStr = "s[0]";
      break;
    case "m":
      xStr = "0";
    break;
    case "r":
      xStr = "-s[0]";
      break;
  };
  switch (row) {
    case "t":
      yStr = "s[1]";
      break;
    case "m":
      yStr = "0";
    break;
    case "b":
      yStr = "-s[1]";
      break;
  };

  for (var j = 0; j < selProps.length; j++){
    if (selProps[j].matchName == "ADBE Vector Shape - Rect" || selProps[j].matchName == "ADBE Vector Shape - Ellipse"){


      matchFound = true;

    }

    if (selProps[j].matchName == "ADBE Vector Rect Position" || selProps[j].matchName == "ADBE Vector Ellipse Position"){

      matchFound = true;

    }
  }

  if (!matchFound){
    alert("No shapes selected. Try again.");
    return;
  }

  app.beginUndoGroup("sm_shapeAnchor");
  for (var i = 0; i< selProps.length; i++){
    if (selProps[i].matchName == "ADBE Vector Shape - Rect" || selProps[i].matchName == "ADBE Vector Shape - Ellipse"){

      selProps[i].property("Position").expression = "s = thisProperty.propertyGroup(1).size*.5;\n[" + xStr + "," + yStr + "]";

      if (row == "m" && col == "m"){
        selProps[i].property("Position").expression = "";
      }

    }

    if (selProps[i].matchName == "ADBE Vector Rect Position" || selProps[i].matchName == "ADBE Vector Ellipse Position"){

      selProps[i].expression = "s = thisProperty.propertyGroup(1).size*.5;\n[" + xStr + "," + yStr + "]";

      if (row == "m" && col == "m"){
        selProps[i].expression = "";
      }

    }
  }
  app.endUndoGroup();
  matchFound = false;



}


{
   function myWindow(thisObj) {
      function myWindow_buildUI(thisObj) {
                var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "sm_shapeAnchor", [0, 0, 300, 300]);

                res = "group{orientation:'column',alignment:['left', 'top'],\
                    top: Group{orientation:'row',\
                      LBtn: Button{size:[20,20]},\
                      MBtn: Button{size:[20,20]},\
                      RBtn: Button{size:[20,20]},\
                    },\
                    mid: Group{orientation:'row',\
                      LBtn: Button{size:[20,20]},\
                      MBtn: Button{size:[20,20]},\
                      RBtn: Button{size:[20,20]},\
                    },\
                    bottom: Group{orientation:'row',\
                      LBtn: Button{size:[20,20]},\
                      MBtn: Button{size:[20,20]},\
                      RBtn: Button{size:[20,20]},\
                    },\
                  },\
                }"


                // Adds resource string to panel
                myPanel.grp = myPanel.add(res);

                //

                myPanel.grp.top.LBtn.onClick = function(){
                  sm_moveShapeAnchor("l", "t");
                };

                myPanel.grp.top.MBtn.onClick = function(){
                  sm_moveShapeAnchor("m", "t");
                };

                myPanel.grp.top.RBtn.onClick = function(){
                  sm_moveShapeAnchor("r", "t");
                };

                myPanel.grp.mid.LBtn.onClick = function(){
                  sm_moveShapeAnchor("l", "m");
                };

                myPanel.grp.mid.MBtn.onClick = function(){
                  sm_moveShapeAnchor("m", "m");
                };

                myPanel.grp.mid.RBtn.onClick = function(){
                  sm_moveShapeAnchor("r", "m");
                };

                myPanel.grp.bottom.LBtn.onClick = function(){
                  sm_moveShapeAnchor("l", "b");
                };

                myPanel.grp.bottom.MBtn.onClick = function(){
                  sm_moveShapeAnchor("m", "b");
                };

                myPanel.grp.bottom.RBtn.onClick = function(){
                  sm_moveShapeAnchor("r", "b");
                };


                // Setup panel sizing and make panel resizable
                myPanel.layout.layout(true);
                //myPanel.grp.minimumSize = myPanel.grp.size;
                myPanel.layout.resize();
                myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}

                return myPanel;
      }

      // Build script panel
      var myWindowPal = myWindow_buildUI(thisObj);

      if ((myWindowPal != null) && (myWindowPal instanceof Window)) {
          myWindowPal.center();
          myWindowPal.show();
       }
   }

   // Execute script
   myWindow(this);
}
