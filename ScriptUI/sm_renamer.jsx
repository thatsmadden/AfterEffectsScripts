//sm_renamer 4.0
{
  function selShapesToArray(_sel){
    var arr = new Array();
    for (var s = 0; s< _sel.length; s++){
      if (_sel[s].matchName == "ADBE Vector Group"){
        arr.push(_sel[s]);
      }
    }
    return arr;
  }

  function rqUtil(mode, _pre, _suf, _beg, _end){
  	// define variables
  	var thisRender, newPath, oldName, newName, ii, jj;
    var renderQ = app.project.renderQueue;

  	var namesString = "";
  	// loop through each renderQueue item, checking if any are queued
  	app.beginUndoGroup("sm_RQ-append");
  	for (ii = 1; ii <= renderQ.numItems; ii++) {

  		// check if the render item is queued
  		if (renderQ.item(ii).status == RQItemStatus.QUEUED) {

  			// shortcut variable for render item
  			thisRender = renderQ.item(ii);



  			// loop through any output modules
  			for (jj = 1; jj <= thisRender.outputModules.length; ++jj) {

  				var curOM = thisRender.outputModule(jj);
  				var oldName = decodeURI(curOM.file.name).toString();
          var filenameOnly = oldName.substr(0,oldName.lastIndexOf("."));
          var extensionOnly = oldName.substr(oldName.lastIndexOf(".") + oldName.length);

          switch (mode){
            case 0: // append

              var newName = encodeURI(_pre + filenameOnly + _suf + extensionOnly);
              break;

            case 1: // trim

              var beginTrim = filenameOnly.substring(_beg, filenameOnly.length);
              var endTrim = beginTrim.substring(0, beginTrim.length-_end);
              var newName = encodeURI(endTrim + extensionOnly);
              break;

            case 2: // trim: keep first

              var newName = encodeURI(filenameOnly.substring(0, _beg) + extensionOnly);
              break;

            case 3: // trim: keep last

              var newName = encodeURI(filenameOnly.substring(filenameOnly.length-_end, filenameOnly.length) + extensionOnly);
              break;

            case 4: // reset
              var newName = thisRender.comp.name + extensionOnly;
              break;

            case 5: // findReplace
              var newName = findReplace(filenameOnly, _pre, _suf) + extensionOnly;
              break;

            default:
              var newName = oldName;
          }
  				namesString += newName;

  				newPath = curOM.file.path + "/" + newName;

  				// set the new file path
  				curOM.file = new File(newPath);

  			}
  		}
  	}
  	app.endUndoGroup();
  }
  function alphabetSequence(_startStr, _aIndex){
    var newStr = "";
    var carried = 0;


    for (var w = _startStr.length-1; w >= 0; w--){
      var cC = _startStr.charCodeAt(w);
      var cCaseOff = cC > 90 ? 97 : 65;
      var pC = Math.abs(w -_startStr.length + 1);
      var zC = cC-cCaseOff;
      var psBase = Math.floor((_aIndex + carried)/Math.pow(26,pC))%26;
      carried = 0;
      var shifted = zC+psBase;
      carried = Math.floor(shifted/26)*Math.pow(26,pC+1);
      var nChar = shifted%26;
      var tempStr = String.fromCharCode(nChar + cCaseOff) + newStr;
      newStr = tempStr;
    }
    return newStr;
  }


  function rename(_curThing, _index, _newText, _padBase, _start, _startInt, _stepInt, _pre, _suf, _delimiter, _startIsALetterUpper){
    var allLetters = "abcdefghijklmnopqrstuvwxyz";
    var progress;
    var prefixText = "";
    var curName = "";
    var suffixText = "";
    var appendCheck = false;

    // sequencing
    if (_startInt != null) {

      // build number sequencing
      progress = _index * _stepInt + _startInt + _padBase;
      curSeq = progress.toString().substring(1);

    } else {

      // build alphabetical sequencing

      progress = (_index * _stepInt);
      curSeq = alphabetSequence(_start, progress);
    }
    //
    curName = _newText + curSeq;

    // arrange the prefix and suffix with their corresponding delimiters
    if (_pre){
      prefixText = curName + _delimiter;
      appendCheck = true;
    }

    if (_suf){
      suffixText = _delimiter + curName;
      appendCheck = true;
    }

    // set up the naming if 'append' is true; overwrites curName
    if (appendCheck) {
      curName = _curThing.name;
    }
    // put it all together
    newName = prefixText + curName + suffixText;
    doTheRename(_curThing, newName);
  }



  function doTheRename(_thing, _newName){ //This is the function that actually swaps the name. Wrapped in a function to handle the expression updates easily.

    var oldName = _thing.name;
    _thing.name = _newName;
    app.project.autoFixExpressions(oldName, _newName);
  }


  function findReplace(_str, _found, _replaced){
    var gFound = new RegExp(escapeRegExp(_found), "g");
    return _str.replace(gFound, _replaced);

  }

  function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }



  // Reference script to create palette with resource string elements
  // Provided by CreativeDojo.net
  {
     function myWindow(thisObj) {
        function myWindow_buildUI(thisObj) {
                  var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "sm_rename", [0, 0, 300, 300]);

                  res = "group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                          myTabbedPanel: Panel{type:'tabbedpanel', alignChildren:['fill', 'top'],margins:[5,0,0,0],\
                            rsTab: Panel{type:'tab', text:'RENAME + SEQ', orientation:'row', alignChildren:['fill', 'center'],\
                              rsMain: Group{orientation:'column', alignChildren:['fill', 'center'],spacing:5,\
                                rsNameGroup: Group{orientation:'column', spacing:0,\
                                  basenameLabel: StaticText{text:'Base name:',alignment:['left', 'center']},\
                                  basenameText: EditText{text:'TEXT_', alignment:['fill','top']},\
                                },\
                                rsSeqGroup: Group{orientation:'row',spacing:2,alignment:['fill', 'center'],alignChildren:['fill','center'],\
                                  padGroup: Group{orientation:'column', alignChildren:['fill','center'], spacing:0,\
                                    padLabel: StaticText{text:'Padding:', minimumSize:[20,10]},\
                                    padText: EditText{text:'4', justify:'center', minimumSize:[20,10]},\
                                  },\
                                  startGroup: Group{orientation:'column', alignChildren:['fill','center'], spacing:0,\
                                    startLabel: StaticText{text:'Start at:', minimumSize:[20,10]},\
                                    startText: EditText{text:'0', justify:'center', minimumSize:[20,10]},\
                                  },\
                                  stepGroup: Group{orientation:'column', alignChildren:['fill','center'], spacing:0,\
                                    stepLabel: StaticText{text:'Step:', minimumSize:[20,10]},\
                                    stepText: EditText{text:'1', justify:'center'},\
                                  },\
                                },\
                              },\
                              rsAppendPanel: Panel{text:'Append as:', orientation:'column',alignment:['right', 'center'],size:[85,200],spacing:0,margins:2,\
                                space: StaticText{text:'', size:[10,11]},\
                                rsAppendCheck: Group{orientation:'row', alignment:['left', 'center'], alignChildren:['left', 'center'], spacing:5,margins:0,\
                                  rsPrefix: Checkbox{text:'pre'},\
                                  rsSuffix: Checkbox{text:'suf'},\
                                },\
                                delimitGroup: Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['left', 'fill'], spacing:0,\
                                  delimitLabel: StaticText{text:'Delimiter:'},\
                                  delimitText: EditText{text:'_', alignment:['fill','fill'], justify:'center'},\
                                },\
                              },\
                            },\
                            aTab: Panel{type:'tab', text:'APPEND', orientation:'row',\
                              appendText: EditText{text:'SHOT', justify:'center',alignment:['fill','center'], minimumSize:[60,35]},\
                              appendSwitch: Group{orientation:'column',alignment:['right','center'], alignChildren:['left', 'center'],spacing:0,\
                                prefixButton: RadioButton{text:'Prefix'},\
                                suffixButton: RadioButton{text:'Suffix'},\
                              },\
                            },\
                            tTab: Panel{type:'tab', text:'TRIM', orientation:'row', alignChildren:['center', 'center'],\
                              trimText: EditText{text:'4', justify:'center', size:[60,80]},\
                              tSwitch: Group{orientation:'column', alignChildren:['left', 'center'], spacing: 5px,\
                                kFirstButton: RadioButton{text:'Keep only first _'},\
                                kLastButton: RadioButton{text:'Keep only last _'},\
                                trimStartButton: RadioButton{text:'_ off the beginning'},\
                                trimEndButton: RadioButton{text:'_ off the end'},\
                              },\
                            },\
                            frTab: Panel{type:'tab', text:'FIND & REPLACE', orientation:'column', alignChildren:['fill', 'center'], spacing:0,\
                              findLabel: StaticText{text:'Find:'},\
                              findText: EditText{text: 'findText'},\
                              space: StaticText{text:'', size:[10,5]},\
                              replaceLabel: StaticText{text:'Replace:'},\
                              replaceText: EditText{text: 'replaceText'},\
                            },\
                            rTab: Panel{type:'tab', text:'RESET', orientation:'column', alignChildren:['center', 'center'],\
                              rGroup: Panel{orientation:'row', alignment:['fill', 'fill'], alignChildren:['center', 'center'],\
                              },\
                            },\
                          },\
                      executeGroup: Group{orientation:'row',alignment:['fill','bottom'], alignChildren:['left', 'fill'],\
                        dropper: DropDownList{properties:{items:['Layers', 'Compositions', 'Shape Groups', 'Render Queue']}},\
                        renameItButton: Button{text:'RENAME IT!', alignment:['fill', 'fill']},\
                    },\
                  }"

                  // Adds resource string to panel
                  myPanel.grp = myPanel.add(res);

                  myPanel.grp.executeGroup.dropper.selection = 0;



                  myPanel.grp.executeGroup.renameItButton.onClick = function(){
                    var compSelected = false;
                    var layerSelected = false;
                    var shapeSelected = false;
                    var rqSelected = false;

                    var selThings = null;
                    var i, j, k, l = 0;

                    switch (myPanel.grp.executeGroup.dropper.selection.text){
                      case "Layers":
                        selThings = app.project.activeItem.selectedLayers;
                        layerSelected = true;
                        if (selThings.length == 0) {
                          alert("Select some layers and try again.");
                          return;
                        }
                        break;
                      case "Compositions":
                        selThings = app.project.selection;
                        compSelected = true;
                        if (selThings.length == 0) {
                          alert("Select some comps and try again.");
                          return;
                        }
                        break;
                      case "Shape Groups":
                        selThings = selShapesToArray(app.project.activeItem.selectedProperties);
                        shapeSelected = true;
                        if (selThings.length == 0) {
                          alert("Select some Shape Groups and try again.");
                          return;
                        }
                        break;
                      case "Render Queue":
                        selThings = app.project.renderQueue;
                        rqSelected = true;
                        if (selThings.numItems == 0) {
                          alert("Nothing queued. Try again");
                          return;
                        }
                        break;
                      default:
                        alert("Choose an option to the left of the RENAME IT! button, and try again.");
                        return;
                        break;


                    }


                    // check for active tab in panel
                    var selectedPanel = myPanel.grp.myTabbedPanel.selection;
  // start switch
                    switch (selectedPanel.text) {
  // case RENAME + SEQ
                      case 'RENAME + SEQ':
                        var rsBasename, rsPad, rsStart, rsStep, rsDelimiter, rsPrefix, rsSuffix, appendBit;
                        var rsPanel = myPanel.grp.myTabbedPanel.rsTab;

                        // user input: basename and sequencing
                        rsBasename = rsPanel.rsMain.rsNameGroup.basenameText.text;
                        rsPad = rsPanel.rsMain.rsSeqGroup.padGroup.padText.text;
                        rsStart = rsPanel.rsMain.rsSeqGroup.startGroup.startText.text;
                        rsStep = rsPanel.rsMain.rsSeqGroup.stepGroup.stepText.text;

                        // user input: pull append
                        rsDelimiter = rsPanel.rsAppendPanel.delimitGroup.delimitText.text;
                        rsPrefix = rsPanel.rsAppendPanel.rsAppendCheck.rsPrefix.value;
                        rsSuffix = rsPanel.rsAppendPanel.rsAppendCheck.rsSuffix.value;

                        // check for letters in start field
                        var regexLower = /[a-z]/;
                        var regexUpper = /[A-Z]/;
                        var startIsALetterLower = rsStart.match(regexLower) != null; // bool: true if a lowercase letter is found
                        var startIsALetterUpper = rsStart.match(regexUpper) != null; // bool: true if an uppercase letter is found

                        // prepare sequencing
                        var padBase = Math.pow(10, parseInt(rsPad));
                        var stepInt = parseInt(rsStep);
                        var startInt = null;

                        //confirm that sequence start is a number and convert string to integer
                        if (!startIsALetterUpper && !startIsALetterLower) {
                          var startInt = parseInt(rsStart);
                        }


                        if (selThings instanceof RenderQueue){
                          alert("Sorry. Haven't programmed this yet.");
                        } else {
                          app.beginUndoGroup("sm_renameAndSeq");
                          for (i = 0; i < selThings.length; i++)
                          {
                            rename(selThings[i], i, rsBasename, padBase, rsStart, startInt, stepInt, rsPrefix, rsSuffix, rsDelimiter, startIsALetterUpper);
                          }
                          app.endUndoGroup();
                        }

                        break;
  // case APPEND
                      case 'APPEND':
                        // user input
                        var aPanel = myPanel.grp.myTabbedPanel.aTab;
                        var aPrefixSw = aPanel.appendSwitch.prefixButton.value;
                        var aSuffixSw = aPanel.appendSwitch.suffixButton.value;

                        // check that at least one button is switched on
                        if (!aSuffixSw && !aPrefixSw){
                          alert("Choose prefix or suffix, and try again.");
                          return;
                        }

                        //check for switches and set up prefix and suffix accordingly
                        var aPrefix = aPrefixSw ? aPanel.appendText.text : "";
                        var aSuffix = aSuffixSw ? aPanel.appendText.text : "";

                        if (selThings instanceof RenderQueue){
                          rqUtil(0, aPrefix, aSuffix, 0, 0);
                        } else {
                          app.beginUndoGroup("sm_renameAppend");
                          for (j = 0; j < selThings.length; j++){

                            doTheRename(selThings[j], aPrefix + selThings[j].name + aSuffix);

                          }
                          app.endUndoGroup();
                        }
                        break;
  // case TRIM
                      case 'TRIM':


                        // user input
                        var tPanel = myPanel.grp.myTabbedPanel.tTab;
                        var trimAmt = parseInt(tPanel.trimText.text);
                        var kSwFirst = tPanel.tSwitch.kFirstButton.value;
                        var kSwLast = tPanel.tSwitch.kLastButton.value;
                        var tSwBegin = tPanel.tSwitch.trimStartButton.value;
                        var tSwEnd = tPanel.tSwitch.trimEndButton.value;


                        // check that at least one button is switched on
                        if (!tSwBegin && !tSwEnd && !kSwFirst && !kSwLast){
                          alert("Choose a trim option and try again.");
                          return;
                        }
                        if (selThings instanceof RenderQueue){
                          app.beginUndoGroup("sm_renameTrimRQ");


                          if (tSwBegin){
                            rqUtil(1, "", "", trimAmt, 0);
                          }

                          if (tSwEnd){
                            rqUtil(1, "", "", 0, trimAmt);
                          }

                          if (kSwFirst){
                            rqUtil(2, "", "", trimAmt, 0);
                          }

                          if (kSwLast){
                            rqUtil(3, "", "", 0, trimAmt);
                          }

                          app.endUndoGroup();
                        } else {
                          app.beginUndoGroup("sm_renameTrim");
                          for (k = 0; k < selThings.length; k++){

                            var nameHolder = selThings[k].name;
                            if (tSwBegin){
                              doTheRename(selThings[k], nameHolder.substring(trimAmt, nameHolder.length));
                            }

                            if (tSwEnd){
                              doTheRename(selThings[k], nameHolder.substring(0, nameHolder.length-trimAmt));
                            }

                            if (kSwFirst){

                              doTheRename(selThings[k], nameHolder.substring(0, trimAmt));

                            }

                            if (kSwLast){
                              doTheRename(selThings[k], nameHolder.substring(nameHolder.length-trimAmt, nameHolder.length));
                            }
                          }
                          app.endUndoGroup();
                        }

                        break;
                      case 'FIND & REPLACE':
                        var findStr = myPanel.grp.myTabbedPanel.frTab.findText.text;
                        var replaceStr = myPanel.grp.myTabbedPanel.frTab.replaceText.text;

                        // check that at least one button is switched on

                        if (selThings instanceof RenderQueue){
                          rqUtil(5, findStr, replaceStr, 0, 0);
                        } else {
                          app.beginUndoGroup("sm_renameFR");
                          for (j = 0; j < selThings.length; j++){

                            doTheRename(selThings[j], findReplace(selThings[j].name, findStr, replaceStr));

                          }
                          app.endUndoGroup();
                        }
                        break;

                      case 'RESET':

                        if (selThings instanceof RenderQueue){

                          app.beginUndoGroup("sm_renameResetRQ");
                          rqUtil(4, "","", 0, 0);
                          app.endUndoGroup();

                        } else {
                          if (layerSelected){
                            app.beginUndoGroup("sm_renameResetLayers");
                            for (k = 0; k < selThings.length; k++){
                              if (selThings[k].property("sourceText") === null && !(selThings[k] instanceof ShapeLayer)){
                                doTheRename(selThings[k],selThings[k].source.name);
                              }

                              if (selThings[k].property("sourceText") !== null){

                                var textLayerOldName = selThings[k].sourceText.value;
                                if (selThings[k].sourceText.expressionEnabled){

                                  selThings[k].sourceText.expressionEnabled = false;
                                  textLayerOldName = selThings[k].sourceText.value;
                                  selThings[k].sourceText.expressionEnabled = true;

                                }
                                doTheRename(selThings[k],textLayerOldName);
                              }
                              if (selThings[k] instanceof ShapeLayer){
                                doTheRename(selThings[k],"ResetShapeLayer_" + k.toString());
                              }

                            }
                            app.endUndoGroup();
                          }

                          if (shapeSelected){
                            app.beginUndoGroup("sm_renameResetShapes");
                            for (k = 0; k < selThings.length; k++){
                              doTheRename(selThings[k],"Group " + (k+1).toString());
                            }
                            app.endUndoGroup();
                          }

                          if (compSelected){
                            for (k = 0; k < selThings.length; k++){
                              if (selThings[k] instanceof FootageItem){
                                app.beginUndoGroup("sm_renameResetComps");
                                doTheRename(selThings[k],selThings[k].file.name);
                                app.endUndoGroup();
                              }


                            }
                          }
                        }

                        break;


  // case DEFAULT
                      default:
                        break;
                    }

                  }

                  // Setup panel sizing and make panel resizable
                  myPanel.layout.layout(true);
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

}
