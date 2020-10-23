// sm_launcher v1.6


{
  /////////////////////// sm_calculatedNull
  function sm_calculatedNull(){
    var c = app.project.activeItem;
    var layers = c.selectedLayers;

    app.beginUndoGroup("sm_calculatedNull");

    for (var i=0; i<layers.length; i++){
      var l = layers[i];
      var newNull = c.layers.addNull();
      newNull.name = l.name + "_calculatedNull";
      var p, s, r;

      p = newNull.position;
      s = newNull.scale;
      r = newNull.rotation;
      p.expression = "l1=thisComp.layer(\"" + l.name + "\");\n" +
        "l1.toComp(l1.anchorPoint);";

      r.expression = "l1=thisComp.layer(\"" + l.name + "\");\n" +
        "d = l1.toComp(l1.anchorPoint + [100,0]) - l1.toComp(l1.anchorPoint);\n" +
        "radiansToDegrees(Math.atan2(d[1],d[0]));";

      s.expression = "l1=thisComp.layer(\"" + l.name + "\");\n" +
        "p1 = l1.toComp(l1.anchorPoint);\n" +
        "p2 = l1.toComp(l1.anchorPoint + [100, 0]);\n" +
        "s = length(p1,p2);\n" +
        "[s,s];";

        p.expressionEnabled = true;
        r.expressionEnabled = true;
        s.expressionEnabled = true;
    }
    app.endUndoGroup();
  }

  /////////////////////// sm_circlePath

  function sm_circlePath(){
    var comp = app.project.activeItem;
    var p = comp.selectedProperties;

    if (p.length == 0){
      alert("Choose some properties you'd like to send around a circle.")
    } else {
      app.beginUndoGroup("sm_circlePath");
      for (i=0; i< p.length; i++){
        if (p[i] instanceof Property) {
          var _p = p[i];
          var _n = p[i].name;
          var drive, radius, pDepth, sLayer;
          _p.expression = "d=effect(\"circleDrive_" + _n + "\")(1);\n" +
            "r=effect(\"circleRadius_" + _n + "\")(1);\n" +
            "angle=degreesToRadians(d);\n" +
            "x=Math.sin(angle);\n" +
            "y=-Math.cos(angle);\n" +
            "r*[x,y] + value;";
          pDepth = _p.propertyDepth;
          sLayer = _p.propertyGroup(pDepth);
          drive = sLayer.property("Effects").addProperty("ADBE Angle Control");
          drive.name = "circleDrive_" + _n;
          radius = sLayer.property("Effects").addProperty("ADBE Slider Control");
          radius.name ="circleRadius_" + _n;
      }
      app.endUndoGroup();
    }
  }
}

  /////////////////////// sm_connector
  function sm_connector(){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;
    if (l.length !==2 || l[0].name == l[1].name){
      alert("Choose two layers that have different names.");
    } else {
      var l1 = l[0];
      var l2 = l[1];
      app.beginUndoGroup("sm_connector");
      var newShape, shapeGroup, shapePathGroup, connectPath, connectPathData, shapeStroke, sTransform;
      // new shape group and connector line
      newShape = comp.layers.addShape();
      shapeGroup = newShape.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
      sTransform = shapeGroup.property("ADBE Vector Transform Group");

      shapeGroup.property("ADBE Vector Materials Group").remove();

      shapePathGroup = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");
      connectPath = shapePathGroup.property("ADBE Vector Shape");
      sTransform = shapeGroup.property("ADBE Vector Transform Group");
      var sPosition = sTransform.property("ADBE Vector Position");
      var sRotation = sTransform.property("ADBE Vector Rotation");
      var sScale = sTransform.property("ADBE Vector Scale");
      sPosition.expression = "cSize = [thisComp.width/2,thisComp.height/2];\n" +
        "l1=thisComp.layer(\"" + l1.name + "\");\n" +
        "l1.toComp(l1.anchorPoint) - cSize;\n";
      sScale.expression = "l1=thisComp.layer(\"" + l1.name + "\");\n" +
        "l2=thisComp.layer(\"" + l2.name + "\");\n" +
        "p1 = l1.toComp(l1.anchorPoint);\n" +
        "p2 = l2.toComp(l2.anchorPoint);\n" +
        "s = length(p1,p2);\n" +
        "[s,100];\n";
        sRotation.expression = "l1=thisComp.layer(\"" + l1.name + "\");\n" +
          "l2=thisComp.layer(\"" + l2.name + "\");\n" +
          "p1 = l1.toComp(l1.anchorPoint);\n" +
          "p2 = l2.toComp(l2.anchorPoint);\n" +
          "delta = p1-p2;\n" +
          "(Math.atan2(delta[1], delta[0])*180/Math.PI)+180;"
      sPosition.expressionEnabled = true;
      sScale.expressionEnabled = true;
      sRotation.expressionEnabled = true;

      connectPathData = new Shape();
      connectPathData.vertices = [[0,0],[100,0]];
      connectPathData.closed = false;
      connectPath.setValue(connectPathData);

      var shapeStroke = newShape.property("ADBE Root Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
      app.endUndoGroup();
    }
  }

  /////////////////////// sm_convexHull

  function sm_convexHull(_p){
    var preString = "\/\/ This is a messy way to calculate a minimum enclosing shape given a set of 2D points. Just replace the \"points[0]=.... ;\" section with your own selection of points.\r\n\r\n\/\/ The expression uses a Graham scan to find the points on the outer edge of the shape-- utilizing a cross product to find the point with the greatest \"left-turn\" for the next vertex on the hull.\r\n\r\n\/\/ It\'s meant to go on a path shape-- either a mask path or a Shape Layer path.\r\nfunction indexOfMin(arr) { \/\/ find index of point that has the lowest x-position.\r\n\tif (arr.length === 0) {\r\n\t\treturn -1;\r\n\t}\r\n\tvar curMin = arr[0][0];\r\n\tvar minIndex = 0;\r\n\r\n\tfor (var i = 1; i < arr.length; i++) {\r\n\t\tif (arr[i][0] < curMin) {\r\n\t\t\tminIndex = i;\r\n\t\t\tcurMin = arr[i][0];\r\n\t\t}\r\n\t}\r\n\treturn minIndex;\r\n}\r\n\r\n\/\/ create the necessary things\r\npoints = [];\r\nt = [];\r\nhull = [];\r\npInd = [];\r\nhullInd = 0;\r\n\n";

    var postString = "\n\/\/ simple modulo to make sure our indices stay in-range of the length of the points array\r\n\r\nfunction cInd(_i) {\r\n\treturn _i % points.length;\r\n}\r\n\r\n\/\/ find left-most point\r\n\r\ni1 = indexOfMin(points);\r\n\r\n\r\n\/\/ add leftMost to hullArray\r\naddToHull(i1);\r\n\r\n\/\/ tentative winner\r\ncwInd = cInd(i1 + 1);\r\n\r\n\/\/ loop through every point to find the actual winner\r\nfor (var j = 1; j < points.length; j++) {\r\n\r\n\tcheckInd = cInd(pInd[hullInd - 1] + j); \/\/ the contender\r\n\r\n\tv1 = sub(hull[hullInd - 1], points[cwInd]); \/\/ vector from the last point on the hull to the tentative winner\r\n\tv2 = sub(hull[hullInd - 1], points[checkInd]); \/\/ vector from the last point on the hull to the contender\r\n\tif (cross(v1, v2)[2] < 0) { \/\/ if v2 is counter-clockwise to v1, v2 is the new winner\r\n\t\tcwInd = checkInd;\r\n\t}\r\n\r\n\t\/\/ when we reach the end of the loop, add the winner to the hull\r\n\r\n\tif (j == points.length - 1) {\r\n\t\treached = addToHull(cwInd);\r\n\t\tcwInd = cInd(cwInd + 1);\r\n\r\n\r\n\t\t\/\/ reset loop until the winning hull point is the left-most point again\r\n\t\tif (!reached) {\r\n\t\t\tj = 1;\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction addToHull(_pInd) {\r\n\ttemp = hullInd;\r\n\tendReached = false;\r\n\r\n\tif (pInd[0] == null || pInd[0] !== _pInd) {\r\n\t\thull[hullInd] = points[_pInd]; \/\/ add winning point to hull\r\n\t\tpInd[hullInd] = _pInd; \/\/ store index of this point\'s index \r\n\t\tt[hullInd] = [0, 0]; \/\/ add point tangents\r\n\t\thullInd++;\r\n\t} else {\r\n\t\tendReached = true;\r\n\t}\r\n\treturn endReached;\r\n}\r\n\r\ncreatePath(hull, t, t, true);";

    var comp = app.project.activeItem;

    var pointsString = "";
    var newShapeName = "";

    if (!_p){
      var l = comp.selectedLayers;
      for (var i = 0; i < l.length; i++){
        pointsString += "points[" + i.toString() + "] = fromCompToSurface(thisComp.layer(\"" + l[i].name + "\").toComp(thisComp.layer(\"" + l[i].name + "\").anchorPoint));\r\n";
      }
      newShapeName = l[0].name;
    } else {
      var props = app.project.activeItem.selectedProperties;
      var pInd = 0;

      for (var i = 0; i< props.length; i++){
        if (props[i].matchName == "ADBE Vector Group"){
          props[i].propertyGroup(props[i].propertyDepth).name;
          pointsString += "points[" + pInd.toString() + "] = fromCompToSurface(thisComp.layer(\"" + props[i].propertyGroup(props[i].propertyDepth).name + "\").toComp(thisComp.layer(\"" + props[i].propertyGroup(props[i].propertyDepth).name + "\").content(\"" + props[i].name + "\").transform.position));\r\n";
          pInd++;
        }
        newShapeName = props[0].propertyGroup(props[0].propertyDepth).name;
      }
    }




    var newShape = comp.layers.addShape();
    newShape.name = "convexHull_" + newShapeName;
    shapeGroup = newShape.property("ADBE Root Vectors Group");
    shapePathGroup = shapeGroup.addProperty("ADBE Vector Shape - Group"); // add a path
    shapePath = shapePathGroup.property("ADBE Vector Shape");

    shapePath.expression = preString + pointsString + postString;
    shapePath.expressionEnabled = true;
    shapeStroke = shapeGroup.addProperty("ADBE Vector Graphic - Stroke");
  }



  /////////////////////// sm_destroyFolderStructure
  function sm_destroyFolderStructure(){
    var selectedThings = app.project.selection;

    if (selectedThings.length == 1 && selectedThings[0] instanceof FolderItem){
      app.beginUndoGroup("sm_destroyFolderStructure");

      var topFolder = selectedThings[0];
      var containingFolder = topFolder.parentFolder;
      var tempFolder = app.project.items.addFolder("sm_destroyFolderTarget");
      tempFolder.parentFolder = containingFolder;
      var sFolder = dfs_findSolidsFolder();

      dfs_emptyContents(topFolder);
      var nameHolder = topFolder.name;
      topFolder.remove();
      tempFolder.name = nameHolder;

      app.endUndoGroup();
    } else {
      alert("Select a folder and try again");
    }



    function dfs_emptyContents(_curItem){
      if (_curItem instanceof FolderItem){
        if (_curItem == sFolder){
          _curItem.parentFolder = app.project.rootFolder;
        } else {
          for (var j=_curItem.items.length; j>=1;j--){
            dfs_emptyContents(_curItem.item(j));
          }
        }

      } else if ((_curItem instanceof FootageItem) && (_curItem.mainSource instanceof SolidSource)){
        _curItem.parentFolder = sFolder;
      }else {
        _curItem.parentFolder = tempFolder;
      }
    }

    function dfs_findSolidsFolder(){
      var solidsFound = false;
      // find exisiting Solids Folder
      for (var i = 1; i<=app.project.items.length; i++){

        if (solidsFound){break;} // stop the loop after the first instance of a Solids folder is found

        // if a Solids folder is found
        if (app.project.item(i) instanceof FolderItem && app.project.item(i).name == "Solids"){
          solidsFound = true;
          var _sFolder = app.project.item(i); // make the first found Solids folder the destination for all of the Solids
        }
      }

      if (!solidsFound){
        var _sFolder = app.project.items.addFolder("Solids"); // make a Solids folder; set it to be the destination for all of the Solids
      }

      return _sFolder;
    }
  }

  /////////////////////// sm_everyOtherLayer
  function sm_everyOtherLayer(_s){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;
    var lSet = _s ? 0 : 1;
    app.beginUndoGroup("sm_everyOtherLayer");
    for (var i = 0; i < l.length; i++){
      var curLayer = l[i];
      if (i%2 == lSet){
        curLayer.selected = true;
      } else {
        curLayer.selected = false;
      }
    }
    app.endUndoGroup();
  }
  /////////////////////// sm_expressionSwitch
  function sm_expressionSwitch(_mode){
    var p = app.project.activeItem.selectedProperties;
    for (var i = 0; i < p.length; i++){
      p[i].expressionEnabled = !_mode;
    }
  }

  /////////////////////// sm_face
  function sm_face(){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;

    if (l.length !== 5){
      alert("Select 5 layers in this order:\n" +
        "1. Top left corner.\n" +
        "2. Top right corner.\n" +
        "3. Bottom left corner.\n" +
        "4. Bottom right corner\n" +
        "5. The layer to apply the corner pin."
        );
    } else {
      app.beginUndoGroup("sm_face");
      var cp = l[4].Effects.addProperty("CC Power Pin");
      cp(1).expression = "tl=thisComp.layer(\"" + l[0].name + "\");\n" +
            "fromComp(tl.toComp(tl.anchorPoint));";
      cp(2).expression = "tr=thisComp.layer(\"" + l[1].name + "\");\n" +
            "fromComp(tr.toComp(tr.anchorPoint));";
      cp(3).expression = "bl=thisComp.layer(\"" + l[2].name + "\");\n" +
            "fromComp(bl.toComp(bl.anchorPoint));";
      cp(4).expression = "br=thisComp.layer(\"" + l[3].name + "\");\n" +
            "fromComp(br.toComp(br.anchorPoint));";
      app.endUndoGroup();
    }
  }

  /////////////////////////// sm_fastShape
  function sm_fastShape(_mode){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;
    switch(_mode){
      case 0:
        app.beginUndoGroup("sm_fastShape");
        break;
      case 1:
        app.beginUndoGroup("sm_fastShapeTangents");
        break;
      case 2:
        app.beginUndoGroup("sm_fastShapeExtraControl");
        break;
      case 3:
        app.beginUndoGroup("sm_fastShapeExtraControl");
        break;
    }
    //var layerGroup = [];
    var layerText = "[";
    var pointText = "";

    for (i=0; i<l.length; i++){
      if (_mode == 2 || _mode == 3){
        pointText += "points[" + i.toString() + "] = fromCompToSurface(layers[" + i.toString() + "].toComp(layers[" + i.toString() + "].anchorPoint));\n" +
        "iT[" + i.toString() + "] = fromCompToSurface(layers[" + i.toString() + "].toComp(layers[" + i.toString() + "].anchorPoint - [100,0])) - points[" + i.toString() + "];\n" +
        "oT[" + i.toString() + "] = fromCompToSurface(layers[" + i.toString() + "].toComp(layers[" + i.toString() + "].anchorPoint + [100,0])) - points[" + i.toString() + "];\n\n";
      }
      if(i+1 !== l.length){
        layerText += "\nthisComp.layer(\"" + l[i].name + "\"),";

      } else {
        layerText += "\nthisComp.layer(\"" + l[i].name + "\")\n]";
      }
    }

    var newShape, pathContainer, shapePath, shapeStroke,shapeGroup, shapeData;
    // new shape group and connector line
    newShape = comp.layers.addShape();
    newShape.name = "fastShape_" + l[0].name;
    shapeGroup = newShape.property("ADBE Root Vectors Group");
    shapePathGroup = shapeGroup.addProperty("ADBE Vector Shape - Group"); // add a path
    shapePath = shapePathGroup.property("ADBE Vector Shape");
    switch(_mode){
      case 0:
        shapePath.expression = "var layers = " + layerText + ";\n" +
        "var points =[];\n" +
        "var t = [];\n" +
        "for (var i = 0; i < layers.length; i++){\n" +
        "	points[i] = fromCompToSurface(layers[i].toComp(layers[i].anchorPoint));\n" +
        "	t[i]=[0,0];\n}\n" +
        "createPath(points,t,t,true);\n";
        break;
      case 1:
        shapePath.expression = "var layers = " + layerText + ";\n" +
        "var points =[];\n" +
        "var iT = [];\n" +
        "var oT = [];\n" +
        "for (var i = 0; i < layers.length; i++){\n" +
        "	points[i] = fromCompToSurface(layers[i].toComp(layers[i].anchorPoint));\n" +
        "	iT[i] = fromCompToSurface(layers[i].toComp(layers[i].anchorPoint - [100,0])) - points[i];\n" +
        "	oT[i] = fromCompToSurface(layers[i].toComp(layers[i].anchorPoint + [100,0])) - points[i];\n" +
        "}\n" +
        "createPath(points,iT,oT,true);\n";
        break;
      case 2:
        shapePath.expression = "var layers = " + layerText + ";\n" +
        "var points =[];\n" +
        "var iT = [];\n" +
        "var oT = [];\n" +
        pointText +
        "createPath(points,iT,oT,true);\n";
        break;

      case 3:
        shapePath.expression = "var layers = " + layerText + ";\n" +
        "var points =[];\n" +
        "var iT = [];\n" +
        "var oT = [];\n" +
        pointText +
        "createPath(points,iT,oT,true);\n";
        break;
    }


    shapePath.expressionEnabled = true;
    shapeStroke = shapeGroup.addProperty("ADBE Vector Graphic - Stroke");
    app.endUndoGroup();
  }

  /////////////////////// sm_isolateProperties
  function sm_isolateProperties(_mode){
    var comp = app.project.activeItem;
    var sL = comp.selectedLayers;
    var props = comp.selectedProperties;
    var deepestProp = null;
    var pathsToSelect = new Array();



    // get deepest property
    for (var i = 0; i < props.length; i++){
      var curProp = props[i];
      if (deepestProp == null){
        deepestProp = curProp;
      } else {
        if (curProp.propertyDepth >= deepestProp.propertyDepth){
          deepestProp = curProp;
        }
      }

      //build property path
      for (var j = 0; j < deepestProp.propertyDepth; j++){
        if (j == 0) {
          curPath = ".property(\"" + deepestProp.name + "\")";
        } else {
          curPath = ".property(\"" + deepestProp.propertyGroup(j).name + "\")" + curPath;
        }
      }

      pathsToSelect.push(curPath);
    }



    // do the selecting
    switch (_mode) {
      case 0: // no key press -- select matching properties on selected layers
        //loop through layers and select the properties
        for (var k = 1; k <= comp.layers.length; k++){
          if (comp.layer(k).selected == true){
            isolatePropertiesSelect(k);
          } // end layer selected conditional
        } // end layer loop
        break;

      case 1: // shift held -- select matching properties on all layers
        for (var k = 1; k <= comp.layers.length; k++){
          isolatePropertiesSelect(k);
        } // end layer loop
        break;

      case 2: // alt or option held -- select matching properties on layers with same label
        for (var k = 1; k <= comp.layers.length; k++){
          if (comp.layer(k) !== sL[0] && comp.layer(k).label == sL[0].label){
            isolatePropertiesSelect(k);
          } // end layer conditional
        } // end layer loop
        break;

      case 3: // alt/option + shift held -- same as mode 0
        for (var k = 1; k <= comp.layers.length; k++){
          if (comp.layer(k).selected == true){
            isolatePropertiesSelect(k);
          } // end layer selected conditional
        } // end layer loop
        break;
      default:
        break;
    }

    function isolatePropertiesSelect(_k){
      for (var m = 0; m < pathsToSelect.length; m++){

        var curCheckPropStr = "comp.layer(" + _k + ")" + pathsToSelect[m];
        try {
            eval(curCheckPropStr);
        } catch (e) {
            if (e instanceof SyntaxError) {
                continue;
            }
        }

        var curCheckProp = eval(curCheckPropStr);
        if (curCheckProp !=null){
          curCheckProp.selected = true;
        }
      } // end pathsToSelect loop
    } // end isolatePropertiesSelect function


  }

  /////////////////////////// sm_lookAt
  function sm_lookAt(){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;
    var p = comp.selectedProperties;
    var l2 = l[0];
    var i, pl = p.length;

    app.beginUndoGroup("sm_lookAt");

    for (i=0; i<pl; i++){
      p[i].expression = "l2 = thisComp.layer(\"" + l2.name + "\");\n" +
        "p1 = toComp(anchorPoint);\n" +
        "p2 = l2.toComp(l2.anchorPoint);\n" +
        "d = p2-p1;\n" +
        "radiansToDegrees(Math.atan2(d[1],d[0])) + value";
      p[i].expressionEnabled = true;
    }

    app.endUndoGroup();
  }

  /////////////////////////// sm_nullInPlace
  function sm_nullInPlace(){
    var c = app.project.activeItem;
    var sL = c.selectedLayers;
    if (sL.length == 0){
        alert("Choose a layer to add a parented null in place.")
      } else {
          app.beginUndoGroup("sm_nullInPlace");
          for (i=0; i<sL.length; i++){
            var l = sL[i];
            var n = sL[i].name;
            var lI, lT, lPos, lRot, lRotX, lRotY, lRotZ, lOr, newNull;
            lI = l.index;
            lT = l.transform;
            newNull = c.layers.addNull();
            newNull.name = n + "_nullInPlace";
            nT = newNull.transform;
            newNull.moveBefore(l);
            lPos = lT.position.value;

            if (l.parent !== null){
              newNull.parent = l.parent;
            }

            if (l.threeDLayer == true){
              newNull.threeDLayer = true;
              lRotX = lT.xRotation.value;
              lRotY = lT.yRotation.value;
              lRotZ = lT.zRotation.value;
              lOr = lT.orientation.value;
              nT.xRotation.setValue(lRotX);
              nT.yRotation.setValue(lRotY);
              nT.zRotation.setValue(lRotZ);
              nT.orientation.setValue(lOr);
              nT.position.setValue(lPos);

            } else {
              var lRot = lT.property("Rotation").value;
              nT.rotation.setValue(lRot);
              nT.position.setValue(lPos);
            }

            l.parent = newNull;
          }
          app.endUndoGroup();
      }
  }


  /////////////////////////// sm_parentChain
  function sm_parentChain(){
  	var s = app.project.activeItem.selectedLayers;
  	var i;
  	app.beginUndoGroup("sm_parentChain");
  	for (i = 0; i < (s.length-1); ++i) {
  		s[i + 1].parent = s[i];
  	}
  	app.endUndoGroup();

  }

  /////////////////////////// sm_parentSwap

  function sm_parentSwap(){

    var sL = app.project.activeItem.selectedLayers;
    var pairs = new Array();
    for (var i = 0; i< sL.length; i++){
      var curPair = new Object();
      curPair.me = sL[i];
      curPair.newParent = sL[i].parent.parent;
      pairs.push(curPair);
      var nextPair = new Object();
      nextPair.me = sL[i].parent;
      nextPair.newParent = sL[i];
      pairs.push(nextPair);

    }

    if (pairs.length !== 0){
      app.beginUndoGroup("sm_parentSwap");
      for (var j = 0; j < pairs.length; j++){
        pairs[j].me.parent = pairs[j].newParent;
      }
      app.endUndoGroup();
    }

  }

  /////////////////////////// sm_quickBake
  function sm_quickBake(_mode){
    var _r = _mode == 2;
    var p = app.project.activeItem.selectedProperties;

    var i, pV;
    app.beginUndoGroup("sm_quickBake");
    if (_mode == 3){
      var l = app.project.activeItem.selectedLayers;
      for (var j = 0; j < l.length; j++){
        p = l[j].property("Transform").property("Position");
        pV = p.value;
        p.expressionEnabled = false;
        p.setValue(pV);
      }

    }
    for (i=0; i<p.length; i++){

      if (p[i] instanceof Property) {
        if (!_r){
          pV = p[i].value;
          p[i].expression = "";
          p[i].setValue(pV);
        } else {
          pV = p[i].value;
          p[i].expressionEnabled = false;
          p[i].setValue(pV);
        }
      }
    }
    app.endUndoGroup();
  }

  /////////////////////////// sm_remapKeys
  function sm_remapKeys(){
    var comp = app.project.activeItem;
    var p = comp.selectedProperties;
    var i;

    app.beginUndoGroup("sm_lookAt");

    for (i=0; i<p.length; i++){
      p[i].expression = "s = ;\nvalueAtTime(linear(s, 0, 100, key(1).time, key(numKeys).time));";
      p[i].expressionEnabled = false;
    }

    app.endUndoGroup();
  }

  /////////////////////////// sm_quickShapeCombine
  function sm_quickShapeCombine(){
    var comp = app.project.activeItem;
    var sL = comp.selectedLayers;
    var indArr = new Array();
    app.beginUndoGroup("sm_quickShapeCombine");
    comp.openInViewer();
    $.sleep(250);
    app.executeCommand(2004); // deselect

    // push layer indices into array
    for (var h = 0; h < sL.length; h++){
      indArr.push(sL[h].index);
    }

    // sort the indices of the selected layers
    var sInd = indArr.sort(compare);

    for (var i = 1; i < sInd.length; i++){
      var l = comp.layer(sInd[i]);
      if (l.property("ADBE Root Vectors Group").property("ADBE Vector Group") !== null && l.property("ADBE Root Vectors Group") !== null){
        for (var j = 1; j<=l.property("ADBE Root Vectors Group").numProperties; j++){
          l.property("ADBE Root Vectors Group").property(j).selected = true;
          app.executeCommand(19); // copy

          comp.layer(sInd[0]).property("ADBE Root Vectors Group").selected = true;
          app.executeCommand(20); // paste
          app.executeCommand(2004); // deselect
        } // end Group cut and paste loop
      } // end Shape Group check
    } // end sorted index loop

    for (var k = 0; k < sL.length; k++){
      if (sL[k].index !== sInd[0]){
        sL[k].remove();
      }
    }


    app.endUndoGroup();

    function compare(a, b) {
      return a - b;
    }
  }

  function sm_quickShapeBreakOut(){
    app.beginUndoGroup("sm_quickShapeBreakOut");
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;
    for (var i = 0; i < l.length; i++){
      var pathCount = 0;
      var curLayer = l[i];
      var shapeGroup = curLayer.property("ADBE Root Vectors Group");
      for (var j = 1; j <= shapeGroup.numProperties; j++){
        var curProp = curLayer.property("ADBE Root Vectors Group").property(j);
        if (curProp.matchName == "ADBE Vector Group"){
          var newCurLayer = curLayer.duplicate();
          newCurLayer.name = curLayer.name + "_" + j;
          var newShapeGroup = newCurLayer.property("ADBE Root Vectors Group");
          for (k = newShapeGroup.numProperties; k >= 1; k--){
            if (newShapeGroup.property(k).matchName == "ADBE Vector Group" && k != j){
              newShapeGroup.property(k).remove();
            }
          }
        }
      }


    }
    app.endUndoGroup();
  }

  /////////////////////////// sm_replaceWithSolid
  function sm_replaceWithSolid(){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;
    app.beginUndoGroup("sm_replaceWithSolid");
    for (var i = 0; i < l.length; i++){
      if (l[i].source instanceof FootageItem && !(l[i].source.mainSource instanceof SolidSource) || l[i].source instanceof CompItem){
        mySolid = comp.layers.addSolid([1.0,1.0,1.0], l[i].name + "_Solid", l[i].width, l[i].height, 1);
        l[i].replaceSource(mySolid.source,true);
        mySolid.remove();
      }

    }
    app.endUndoGroup();
  }
  /////////////////////////// sm_restoreOrder
  function sm_restoreOrder(){
    var comp = app.project.activeItem;
    var props = comp.selectedProperties;
    var l = comp.selectedLayers;
    var curTime = comp.time;
    app.beginUndoGroup("sm_restoreOrder");
    app.executeCommand(2004);


    for (var i = 0; i < props.length; i++){
      var curProp = props[i];

      if (curProp.selectedKeys !== null && curProp.numProperties == null){
        for (var k = 0; k <l.length; k++){
          var curCheckPropStr = "comp.layer(" + l[k].index + ")" + buildPropPath(curProp);
        	try {
              // alert(curCheckPropStr);
        	    eval(curCheckPropStr);
        	} catch (e) {
        	    if (e instanceof SyntaxError) {
        	        continue;
        	    }
        	}

        	var curCheckProp = eval(curCheckPropStr);
        	if (curCheckProp !=null && curCheckProp.numKeys !== 0){
        		// do the transfer
            curCheckProp.selected = true;
            app.executeCommand(18); // cut
            app.executeCommand(20); // paste
            app.executeCommand(2004); // deselect
        	}
        }


      }
    }
    app.endUndoGroup();


    function buildPropPath(_curProp){
      var curPath;

      for (var j = 0; j < _curProp.propertyDepth; j++){
      	if (j == 0) {
      		curPath = ".property(\"" + _curProp.name + "\")";
      	} else {
      		curPath = ".property(\"" + _curProp.propertyGroup(j).name + "\")" + curPath;
      	}

      }
      return curPath;

    }
  }

  /////////////////////////// sm_revealShapeColor
  function sm_revealShapeColor(_mode){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;

    for (var i = 0; i < l.length; i++){
      var curLayer = l[i];
      var curShape = l[i].property("ADBE Root Vectors Group");
      if (curShape !== null){
        dive(curShape);
      }

    }
    function dive(_prop){
      for (var k = 1; k <= _prop.numProperties; k++){
        if (_prop.property(k).matchName =="ADBE Vector Group" || _prop.property(k).matchName =="ADBE Vectors Group"){
          dive(_prop.property(k));
        }

        if (_prop.property(k).matchName =="ADBE Vector Graphic - " + _mode){
          _prop.property(k).property("ADBE Vector " + _mode + " Color").selected = true;

        }
      }
    }
  }




  /////////////////////////// sm_selectImmediateChildren
  function sm_selectImmediateChildren(){
    var comp = app.project.activeItem;
    var sL = comp.selectedLayers;
    var l = comp.layers;

    if (sL.length == 1){
      app.beginUndoGroup("sm_selectImmediateChildren");
      for (var i = 1; i <= l.length; i++){
        if (l[i].parent == sL[0]){
          l[i].selected = true;
        } else {
          l[i].selected = false;
        }
      }
      app.endUndoGroup();

    } else {
      alert("Select one layer and try again.");
    }
  }

  /////////////////////////// sm_selectUnparented
  function sm_selectUnparented(_mode){
    var l = app.project.activeItem.layers;
    switch (_mode){
      case 0:
        for (var i = 1; i <= l.length; i++){
          var curLayer = l[i];
          if (curLayer.parent == null){
            if (!curLayer.locked){curLayer.selected = true;}
          } else {
            curLayer.selected = false;
          }
        }
      break;
      case 1:
        for (var i = 1; i <= l.length; i++){
          var curLayer = l[i];
          if (curLayer.parent == null){
            if (!curLayer.locked){curLayer.selected = true;}
          }
        }
        break;
      case 2:
        for (var i = 1; i <= l.length; i++){
          var curLayer = l[i];
          if (curLayer.parent !== null){
            if (!curLayer.locked){curLayer.selected = false;}
          }
        }
        break;
      case 3:
      break;

    }

  }
}
{
  /////////////////////////// sm_strayFileFinder
  function sm_strayFileFinder(){
    var thisProject = app.project;
    var slash = $.os.indexOf("Windows") != (-1) ? "\\" : "/"; //Inline if statement to consolidate the OS check
    var outsideList = new Array();



    alert("Select the root of the folder where all of your assets should be.");
    var topFolder = Folder.selectDialog("Root of Project Directory.");
    if (topFolder !== null) {

      var topFD = generateFullPath(topFolder);
      var projectPath = thisProject.file.fsName;
      var projPathCheck = projectPath.replace(topFD, "");
      if (projectPath == projPathCheck) {
        outsideList.push(projectPath);
      }

      getEverythingEverywhere(thisProject);

      if (outsideList.length >= 1) {
        var lineBreak;

        var fileList = "";
        var alertText = "The following files are outside of your project folder\:";
        for (var k = 0; k < outsideList.length; k++) {
          if (k == outsideList.length - 1) {
            lineBreak = "";
          } else {
            lineBreak = "\n";
          }

          fileList += outsideList[k] + lineBreak;
        }

        alert(alertText + "\n" + fileList); //

      } else {
        alert("Everything seems to be in its right place.");
      }

    } else {
      alert("Try again.");
    }
    function getEverythingEverywhere(everything, _topFD) {
      for (var i = 1; i <= everything.numItems; i++) {
        var curItem = everything.item(i);
        var curMS = curItem.mainSource;
        if (curItem instanceof FootageItem && !(curMS instanceof SolidSource)) {
          if (imgSeqCheck(curItem)) {
            generateFullPath(curItem.file.parent)
            var curPath = generateFullPath(curItem.file.parent) + slash + curItem.name.toString();
          } else {
            var curPath = decodeURI(curMS.file.fsName).toString();
          }

          var pathCheck = curPath.replace(topFD, "");
          if (curPath == pathCheck && repeatChecker(curPath)) {
            outsideList.push(curPath);
          }

        }
      }
    }

    function imgSeqCheck(activeItem) { // Start with the active/selected item
      var isSequence = false; // Assume it isn't an image sequence

      if (activeItem.mainSource instanceof FileSource) {
        if (!activeItem.mainSource.isStill) {
          // Do a test import to see if the file is a still image
          try {
            var tempIO = new ImportOptions(activeItem.mainSource.file);
            tempIO.importAs = ImportAsType.FOOTAGE;
            var tempFI = app.project.importFile(tempIO);
            isSequence = tempFI.mainSource.isStill;
            tempFI.remove();
            return isSequence;
          } catch (e) {
            return isSequence;
          }
        }
      }
    }


    function repeatChecker(thingToTest) {
      var noRepeats = true; // assume there are no repeats

      for (var j = 0; j < outsideList.length; j++) { // compare current path to everything in outsideList, if a match is found, break out of the loop, and return false
        if (thingToTest == outsideList[j]) {
          noRepeats = false;
          break;
        }
      }
      return noRepeats;
    }

    function generateFullPath(sourceFile) {
      return decodeURI(sourceFile.fsName).toString();
    }
  }

}
{
  ///////////////////////////////////// sm_toComp
  function sm_toComp(){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;
    var p = comp.selectedProperties;
    var l1 = l[0];
    var i, pl = p.length;

    app.beginUndoGroup("sm_toComp");

    for (i=0; i<pl; i++){
      p[i].expression = "l1=thisComp.layer(\"" + l1.name + "\");\n" +
        "l1.toComp(l1.anchorPoint);\n";
      p[i].expressionEnabled = true;
    }

    app.endUndoGroup();
  }

  /////////////////////// sm_trimIn
  function sm_trimIn(){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;
    var curTime = comp.time;
    app.beginUndoGroup("sm_trimIn");
    for (var i = 0; i < l.length; i++){
      var curLayer = l[i];
      for (var j = 0; j <= comp.duration*comp.frameRate; j+=5){

        var z = curLayer.position.valueAtTime(j*comp.frameDuration,false)[2];

        if (z <= 8600){
          //alert(z);
          curLayer.inPoint = (j-5)*comp.frameDuration;
          break;
        }

      }
    }
    app.endUndoGroup();
  }

  /////////////////////// sm_trimOut
  function sm_trimOut(){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;
    var curTime = comp.time;
    app.beginUndoGroup("sm_trimOut");
    for (var i = 0; i < l.length; i++){
      var curLayer = l[i];
      for (var j = comp.duration*comp.frameRate; j >= 0 ; j-=5){

        var z = curLayer.position.valueAtTime(j*comp.frameDuration,false)[2];

        if (z >= -1000){
          //alert(z);
          curLayer.outPoint = (j+5)*comp.frameDuration;
          break;
        }

      }
    }
    app.endUndoGroup();
  }

}
{
  /////////////////////// sm_unevenWheel
  function sm_unevenWheel(){
		var comp = app.project.activeItem;
		var allLayers = comp.layers;
		var l = comp.selectedLayers;
		var i;

		var points = parseInt(prompt("How many points do you want? (Enter as many as 26.)", "5"));

		if (points > 26) {
			points = parseInt(prompt("Sorry. It has to be 26 or fewer.", "26"));
		}

		for (j=0; j<allLayers.length;){
			if(allLayers[j+1].name !== "groundNull"){
				var groundNullCheck = false;
				j++;
			} else {
				var groundNullCheck = true;
				break;
			}
		}

		if (groundNullCheck == true){
			app.beginUndoGroup("sm_unevenWheel");
				for (i=0; i<l.length; i++){
					addPoints(l[i],points);
				}
			app.endUndoGroup();
		} else {
			app.beginUndoGroup("sm_unevenWheel");
			var groundNullAdd = comp.layers.addNull();
			groundNullAdd.name = "groundNull";
			for (i=0; i<l.length; i++){
				addPoints(l[i], points);
			}
			app.endUndoGroup();
		}
		function addPoints(l, points){
			var letters = "abcdefghijklmnopqrstuvwxyz";
			var a, size, scope;
			size = [l.width/2,l.height/2];
			scope = Math.floor(Math.sqrt(Math.pow(size[0],2) + Math.pow(size[1],2)));
			for (a=0; a<points; a++){
				var e = l.Effects.addProperty("Point Control");
				e.name = letters.charAt(a);
				var prop = e.property(1);

				prop.expression = "function edge(p){\n" +
					"for (i=0; i<" + scope +";){\n" +
					"q=[" + size[0] + "," + size[1] + "]+p*(" + scope +"-i);\n" +
					"s=thisLayer.sampleImage(q,[.5,.5])[3];\n" +
					"if (s<=.1){i=i+4;} else {break;}\n" +
					"}\n" +
					"return q;\n" +
					"}\n" +
					"n=thisProperty.propertyGroup(1).propertyIndex;\n" +
					"a=(2*Math.PI/" + points + ")*n;\n" +
					"p=[Math.sin(a),-Math.cos(a)];\n" +
					"edge(p);\n" +
					"q";
				p = prop.value;
				prop.expression = "";
				prop.setValue(p);
			}

			var unevenExpression = "tL=thisLayer;\n";
			var maxCompare = "";

			for (i=0; i<points; i++){
				letter = letters.charAt(i);
				if (i < points-1){
					maxCompare += letter + ",";
					unevenExpression += letter + "=tL.toComp(tL.effect(\"" + letter + "\")(1))[1];\n";
				} else {
					maxCompare += letter;
					unevenExpression += letter + "=tL.toComp(tL.effect(\"" + letter + "\")(1))[1];\n" +
						"pS=Math.max(" + maxCompare + ");\n" +
						"gNull = thisComp.layer(\"groundNull\");\n" +
						"gT=gNull.toComp(gNull.anchorPoint)[1];\n" +
						"bump=pS-gT;\n" +
						"value-[0,bump];";
				}
			}

			l.transform.position.expression = unevenExpression;
		}
	}

}
{ /////////////////////// sm_versionUp
  function sm_versionUp(_shift){

    var filepath = decodeURI(app.project.file);
    var filename = decodeURI(app.project.file.name);
    var verRX = /_[a-z][0-9][0-9]/g;

    var ver = verRX.exec(filename); // "_a01" formatted version string from filename

    if (_shift){
      var newfilename = filename.replace(ver[ver.length-1], versionUpLetter(ver[ver.length-1]));
    } else {
      var newfilename = filename.replace(ver[ver.length-1], versionUpNumber(ver[ver.length-1]));
    }

    var saveFile = File(encodeURI(filepath.replace(filename, newfilename)));
    app.project.save(saveFile);

    function versionUpNumber(_str){
      return _str.substring(0,2) + (parseInt(_str.substring(2)) + 101).toString().substring(1);
    }

    function versionUpLetter(_str){
      var l = _str.substring(1,2);
      var allL = "abcdefghijklmnopqrstuvwxyza";
      return "_" + allL.substring(allL.indexOf(l)+1, allL.indexOf(l)+2) + "01";
    }
  }
}
{

  function launcherUI(thisObj) {
      function launcherUI_buildUI(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "sm_launcher");

        res = "group{orientation:'row',alignment:['fill', 'center'],alignChildren:['fill', 'center'], spacing:2,\
          dropper: DropDownList{properties:{items:['calculatedNull', 'circlePath', 'connector', 'convexHull', 'destroyFolderStructure','expressionSwitch','everyOtherLayer','face', 'fastShape', 'isolateProperties','lookAt', 'nullInPlace', 'parentChain','parentSwap','quickBake', 'quickShapeCombine', 'replaceWithSolid','restoreOrder','revealShapeColor - Fill','revealShapeColor - Stroke','selectImmediateChildren','selectUnparented','strayFileFinder','toComp', 'unevenWheel', 'versionUp']}, preferredSize:[200,25]},\
          doButton: Button{text:'*',alignment:['right', 'center'],maximumSize:[25,25]},\
          qButton: Button{text:'?',alignment:['right', 'center'],maximumSize:[25,25]},\
          }\
        }"

        // Adds resource string to panel
        myPanel.grp = myPanel.add(res);
        myPanel.grp.dropper.selection = 0;
        // Assign function to UI elements
        myPanel.grp.doButton.onClick = function(){
          switch(myPanel.grp.dropper.selection.text){


            case "calculatedNull":
            sm_calculatedNull();
            break;

            case "circlePath":
            sm_circlePath();
            break;

            case "connector":
            sm_connector();
            break;

            case "convexHull":
            sm_convexHull(ScriptUI.environment.keyboardState.shiftKey);
            break;

            case "destroyFolderStructure":
            sm_destroyFolderStructure();
            break;

            case "everyOtherLayer":
            sm_everyOtherLayer(ScriptUI.environment.keyboardState.shiftKey);
            break;

            case "expressionSwitch":
            sm_expressionSwitch(ScriptUI.environment.keyboardState.shiftKey);
            break;

            case "face":
            sm_face();
            break;

            case "fastShape":
            var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
            var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
            sm_fastShape(shiftPressed + altPressed);
            break;

            case "isolateProperties":
            var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
            var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
            sm_isolateProperties(shiftPressed + altPressed);
            break;

            case "lookAt":
            sm_lookAt();
            break;

            case "nullInPlace":
            sm_nullInPlace();
            break;

            case "parentChain":
            sm_parentChain();
            break;

            case "parentSwap":
            sm_parentSwap();
            break;

            case "quickBake":
            var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
            var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
            sm_quickBake(shiftPressed + altPressed);
            break;

            case "quickShapeCombine":
            if (ScriptUI.environment.keyboardState.shiftKey){
              sm_quickShapeBreakOut();
            } else {
              sm_quickShapeCombine();
            }

            break;

            case "replaceWithSolid":
            sm_replaceWithSolid();
            break;

            case "restoreOrder":
            sm_restoreOrder();
            break;

            case "revealShapeColor - Fill":
            sm_revealShapeColor("Fill");
            break;

            case "revealShapeColor - Stroke":
            sm_revealShapeColor("Stroke");
            break;

            case "selectImmediateChildren":
            sm_selectImmediateChildren();
            break;

            case "selectUnparented":
            var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
            var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
            sm_selectUnparented(shiftPressed + altPressed);
            break;

            case "strayFileFinder":
            sm_strayFileFinder();
            break;

            case "toComp":
            sm_toComp();
            break;

            case "trimIn":
            sm_trimIn();
            break;

            case "trimOut":
            sm_trimOut();
            break;

            case "unevenWheel":
            sm_unevenWheel();
            break;

            case "versionUp":
            sm_versionUp(ScriptUI.environment.keyboardState.shiftKey);
            break;

            default:
            alert("Make sure you select something from the dropdown.")
          }

        }

        myPanel.grp.qButton.onClick = function(){
          switch(myPanel.grp.dropper.selection.text){


            case "calculatedNull":
            alert("Creates a 2D null that follows a layer using expressions on the rotation, scale, and position. Select a layer, and run the script.");
            break;

            case "circlePath":
            alert("Applies an expression that will send the selected 2-dimensional properties around a circle using radius and driver expression controllers. Select a property and run the script.");
            break;

            case "connector":
            alert("Creates a shape layer with a stroked path that spans two selected nulls using expressions on the position, scale, and rotation within the shape layer's transform group.\n" +
            "Choose two nulls with different names, and run the script.");
            break;

            case "convexHull":
            alert("Given a layer selection, this script creates a Shape Layer with a path expression that calculates the minimum enclosing shape of the layers via their anchor points.\n\nOr, hold shift to use the positions of a Shape Layer Group selection.");
            break;

            case "destroyFolderStructure":
            alert("With a folder selected in the Project window, run the script to pull everything to the root of that folder, and remove the subfolders.\n\nBest used when you have collected projects imported into collected projects.");
            break;

            case "everyOtherLayer":
            alert("Given a selection of layers, this script will deselect every other layer. Note: this script knows the order in which you select the layers, so best to select your layers in layer-stack order to get the best results.");
            break;

            case "face":
            alert("Applies CC Power Pin on a layer with expressions on each corner to follow 4 selected layers. Select 5 layers in this order, and then run the script:\n" +
            "1.) Top left corner. 2.) Top right corner. 3.) Bottom left corner. 4.) Bottom right corner. 5.) The layer to apply the corner pin.");
            break;

            case "fastShape":
            alert("Given a layer selection, this script creates a shape layer with an expression on a path to follow those layers. Hold alt/option for tangents driven by the layers' scale and rotation.");
            break;

            case "isolateProperties":
            alert("Selects the selected property on multiple layers.\nSelect a bunch of layers, command- or control-select a property, and run the script. Hold shift while running the script to select the property on all of the layers in the comp-- not just the selected layers. Hint: Press \'ss\' after the script runs to reveal the properties.");
            break;

            case "lookAt":
            alert("Applies a simple Math.atan2 lookAt expression to the selected properties. First, select the target layer. And then, command-select the properties you want to have the expression.");
            break;

            case "nullInPlace":
            alert("Creates a parent null with the same position and rotation values at the current time for each selected layer. Choose one or more layers and run the script.");
            break;

            case "parentChain":
            alert("Given a selection of layers, this script will parent each layer to the previously selected layer.");
            break;

            case "parentSwap":
            alert("Given a selection of layers, this script will find each layer's parent and grandparent. It will then:\n1.) Parent the selected layer to the grandparent.\n2.) Parent the selected layer's existing parent to the selected layer.");
            break;

            case "replaceWithSolid":
            alert("Replaces the selected layers with solids.");
            break;

            case "restoreOrder":
            alert("Given a bunch of selected properties, this script moves the keyframing to start at the playhead. Works best as a way to 'undo' sequencing keyframes on many layers. Select a bunch of layers and command-select the property on one layer whose keyframes are staggered on the rest of the layers and run the script.");
            break;



            case "revealShapeColor - Fill":
            alert("Selects all instances of the Shape Layer Fill Color on the selected layers. Hint: Press \'ss\' to reveal them.");
            break;

            case "revealShapeColor - Stroke":
            alert("Selects all instances of the Shape Layer Stroke Color on the selected layers. Hint: Press \'ss\' to reveal them.");
            break;

            case "quickBake":
            alert("Use this to bake an expression that gives you a constant value. Doesn't create keyframes like Keyframe Assistant > Convert Expression to Keyframes. Instead, it sets the value of the property to the expression-calculated value at the playhead, and then clears the expression. Or hold alt/option to simply disable the expression without clearing it.");
            break;

            case "quickShapeCombine":
            alert("Given a selection of Shape layers, this script combines the top level Shape Groups into the first-selected layer. Hold shift to break top-level Shape Groups into their own layers.");
            break;

            case "selectImmediateChildren":
            alert("Pretty self-explanatory. Selects the first-generation children parented to the selected layer.");
            break;

            case "selectUnparented":
            alert("Pretty self-explanatory. Selects all layers that don't have a parent. Hold shift to add to your existing selection.");
            break;

            case "strayFileFinder":
            alert("Run this script to find which files in your project are outside of a specified folder.");
            break;

            case "toComp":
            alert("Choose a layer to follow, choose all of the properties on which you want to have a basic toComp expression, and then run the script.");
            break;

            case "trimIn":
            alert("Use with caution.");
            break;

            case "trimOut":
            alert("Use with caution.");
            break;

            case "unevenWheel":
            alert("If you want to roll an object that's not perfectly round, this script will find the edges of your shape and apply an expression to affect the position based on the various contours of your wheel as you animate the rotation.\n\nThe script will also create a null object called \"groundNull\" which acts as the floor. If you have a null already called groundNull, it will not create one.... but instead use the existing groundNull.\n\nProvide a number when prompted (up to 26), and the script will make that many evenly-spaced instances of the Point Control effect around the outer edge of your wheel. They need to be on there as they tell the position expression where the contours are. You can drag any of those points manually once the script finishes to refine the shape (if the script missed a protruding corner, for instance).\n\nThe contour is generated by sampling the alpha channel, so your wheel needs to either be a png, tif, or ai (not-continuously rasterized) with alpha or a stagnant shape in a comp. Masked solids or shape layers need to be precomped, I think.\n\nSelect your wheel and run the script. It'll take a bit of time to process, so be patient.");
            break;

            case "versionUp":
            alert("Run this script to save the next version of your project file that utilizes an underscore-delimited naming scheme and alpha-numeric versioning (ex. \"a05\").\n\nHold shift while running to version up the letter.");
            break;

            default:
            alert("Sorry. Haven't written this yet.");
          }

        }

        // Setup panel sizing and make panel resizable
        myPanel.layout.layout(true);
        //myPanel.grp.minimumSize = myPanel.grp.size;
        myPanel.layout.resize();
        myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}

        return myPanel;
      }

      // Build script panel
      var launcherUIPal = launcherUI_buildUI(thisObj);

      if ((launcherUIPal != null) && (launcherUIPal instanceof Window)) {
          launcherUIPal.center();
          launcherUIPal.show();
      }
  }

  // Execute script
  launcherUI(this);
}
