{
  var preString = "\/\/ This is a messy way to calculate a minimum enclosing shape given a set of 2D points. Just replace the \"points[0]=.... ;\" section with your own selection of points.\r\n\r\n\/\/ The expression uses a Graham scan to find the points on the outer edge of the shape-- utilizing a cross product to find the point with the greatest \"left-turn\" for the next vertex on the hull.\r\n\r\n\/\/ It\'s meant to go on a path shape-- either a mask path or a Shape Layer path.\r\nfunction indexOfMin(arr) { \/\/ find index of point that has the lowest x-position.\r\n\tif (arr.length === 0) {\r\n\t\treturn -1;\r\n\t}\r\n\tvar curMin = arr[0][0];\r\n\tvar minIndex = 0;\r\n\r\n\tfor (var i = 1; i < arr.length; i++) {\r\n\t\tif (arr[i][0] < curMin) {\r\n\t\t\tminIndex = i;\r\n\t\t\tcurMin = arr[i][0];\r\n\t\t}\r\n\t}\r\n\treturn minIndex;\r\n}\r\n\r\n\/\/ create the necessary things\r\npoints = [];\r\nt = [];\r\nhull = [];\r\npInd = [];\r\nhullInd = 0;\r\n\n";

  var postString = "\n\/\/ simple modulo to make sure our indices stay in-range of the length of the points array\r\n\r\nfunction cInd(_i) {\r\n\treturn _i % points.length;\r\n}\r\n\r\n\/\/ find left-most point\r\n\r\ni1 = indexOfMin(points);\r\n\r\n\r\n\/\/ add leftMost to hullArray\r\naddToHull(i1);\r\n\r\n\/\/ tentative winner\r\ncwInd = cInd(i1 + 1);\r\n\r\n\/\/ loop through every point to find the actual winner\r\nfor (var j = 1; j < points.length; j++) {\r\n\r\n\tcheckInd = cInd(pInd[hullInd - 1] + j); \/\/ the contender\r\n\r\n\tv1 = sub(hull[hullInd - 1], points[cwInd]); \/\/ vector from the last point on the hull to the tentative winner\r\n\tv2 = sub(hull[hullInd - 1], points[checkInd]); \/\/ vector from the last point on the hull to the contender\r\n\tif (cross(v1, v2)[2] < 0) { \/\/ if v2 is counter-clockwise to v1, v2 is the new winner\r\n\t\tcwInd = checkInd;\r\n\t}\r\n\r\n\t\/\/ when we reach the end of the loop, add the winner to the hull\r\n\r\n\tif (j == points.length - 1) {\r\n\t\treached = addToHull(cwInd);\r\n\t\tcwInd = cInd(cwInd + 1);\r\n\r\n\r\n\t\t\/\/ reset loop until the winning hull point is the left-most point again\r\n\t\tif (!reached) {\r\n\t\t\tj = 1;\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction addToHull(_pInd) {\r\n\ttemp = hullInd;\r\n\tendReached = false;\r\n\r\n\tif (pInd[0] == null || pInd[0] !== _pInd) {\r\n\t\thull[hullInd] = points[_pInd]; \/\/ add winning point to hull\r\n\t\tpInd[hullInd] = _pInd; \/\/ store index of this point\'s index \r\n\t\tt[hullInd] = [0, 0]; \/\/ add point tangents\r\n\t\thullInd++;\r\n\t} else {\r\n\t\tendReached = true;\r\n\t}\r\n\treturn endReached;\r\n}\r\n\r\ncreatePath(hull, t, t, true);";

  var comp = app.project.activeItem;
  var l = comp.selectedLayers;
  var pointsString = "";

  for (var i = 0; i < l.length; i++){
    pointsString += "points[" + i.toString() + "] = fromCompToSurface(thisComp.layer(\"" + l[i].name + "\").toComp(thisComp.layer(\"" + l[i].name + "\").anchorPoint));\r\n";
  }


  var newShape = comp.layers.addShape();
  newShape.name = "fastShape_" + l[0].name;
  shapeGroup = newShape.property("ADBE Root Vectors Group");
  shapePathGroup = shapeGroup.addProperty("ADBE Vector Shape - Group"); // add a path
  shapePath = shapePathGroup.property("ADBE Vector Shape");

  shapePath.expression = preString + pointsString + postString;
  shapePath.expressionEnabled = true;
  shapeStroke = shapeGroup.addProperty("ADBE Vector Graphic - Stroke");
}
