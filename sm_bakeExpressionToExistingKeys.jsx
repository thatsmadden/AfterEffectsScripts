{
	function bakeExpressionToExistingKeyframes(){
		var prop = app.project.activeItem.selectedProperties;
		var timeHolder = app.project.activeItem.time;
		app.beginUndoGroup("sm_bakeExpressionToExistingKeys");
		for (var i=0; i<prop.length; i++){
			if (prop[i] instanceof Property && prop[i].numKeys !== 0 && prop[i].expressionEnabled){
				var keyData = new Array();
				for (var j = 1; j <= prop[i].numKeys; j++){
					var keyHolder = new Object();
					app.project.activeItem.time = prop[i].keyTime(j);
					keyHolder.calcVal = prop[i].value;
					keyHolder.ind = j;
					keyData.push(keyHolder);
				}
				prop[i].expression = "";
				for (var k = 0; k < keyData.length; k++){
					prop[i].setValueAtKey(keyData[k].ind, keyData[k].calcVal);
				}
			}
		}
		app.project.activeItem.time = timeHolder;
		app.endUndoGroup();
	}
	bakeExpressionToExistingKeyframes();
}
