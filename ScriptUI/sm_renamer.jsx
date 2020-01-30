//sm_renamer 2.1
{

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
                          myTabbedPanel: Panel{type:'tabbedpanel', orientation:'left', alignChildren:['fill', 'fill'],\
                            rsTab: Panel{type:'tab', text:'RENAME + SEQ', orientation:'row', alignChildren:['fill', 'fill'],\
                              rsMain: Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                                rsNameGroup: Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['left', 'fill'], spacing:0,\
                                  basenameLabel: StaticText{text:'Base name:'},\
                                  basenameText: EditText{text:'TEXT_', alignment:['fill','fill']},\
                                },\
                                rsSeqGroup: Group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'],\
                                  padGroup: Group{orientation:'column', alignment:['fill', 'fill'], spacing:0,\
                                    padLabel: StaticText{text:'Padding:', alignment:['left','fill']},\
                                    padText: EditText{text:'4', alignment:['fill','fill'], justify:'center'},\
                                  },\
                                  startGroup: Group{orientation:'column', alignment:['fill', 'fill'], spacing:0,\
                                    startLabel: StaticText{text:'Start at:', alignment:['left','fill']},\
                                    startText: EditText{text:'0', alignment:['fill','fill'], justify:'center'},\
                                  },\
                                  stepGroup: Group{orientation:'column', alignment:['fill', 'fill'], spacing:2,\
                                    stepLabel: StaticText{text:'Increment:',alignment:['left','fill']},\
                                    stepText: EditText{text:'1', alignment:['fill','fill'], justify:'center'},\
                                  },\
                                },\
                              },\
                              rsAppendPanel: Panel{text:'Append as:', orientation:'column', alignment:['right', 'fill'], alignChildren:['right', 'center'],\
                                rsAppendCheck: Group{orientation:'row', alignment:['fill', 'center'], alignChildren:['left', 'center'],\
                                  rsPrefix: Checkbox{text:'prefix'},\
                                  rsSuffix: Checkbox{text:'suffix'},\
                                },\
                                delimitGroup: Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['left', 'fill'], spacing:0,\
                                  delimitLabel: StaticText{text:'Delimiter: '},\
                                  delimitText: EditText{text:'_', alignment:['fill','fill'], justify:'center'},\
                                },\
                              },\
                            },\
                            aTab: Panel{type:'tab', text:'APPEND', orientation:'column', alignChildren:['fill', 'center'],\
                              appendPanel: Panel{orientation:'column', alignChildren:['fill', 'fill'],\
                                appendTextGroup: Group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['left', 'fill'],\
                                  appendLabel: StaticText{text:'Text to append: '},\
                                  appendText: EditText{text:'SHOT', alignment:['fill','fill']},\
                                },\
                                appendSwitch: Group{orientation:'row', alignment:['center', 'fill'], alignChildren:['left', 'fill'],\
                                  prefixButton: RadioButton{text:'Prefix'},\
                                  suffixButton: RadioButton{text:'Suffix'},\
                                },\
                              },\
                            },\
                            tTab: Panel{type:'tab', text:'TRIM', orientation:'row', alignChildren:['left', 'center'],\
                              trimText: EditText{text:'4', alignment:['fill','fill'], justify:'center'},\
                              tSwitch: Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['left', 'center'], spacing: 5px,\
                                kFirstButton: RadioButton{text:'Keep only first _'},\
                                kLastButton: RadioButton{text:'Keep only last _'},\
                                trimStartButton: RadioButton{text:'_ off the beginning'},\
                                trimEndButton: RadioButton{text:'_ off the end'},\
                              },\
                            },\
                            frTab: Panel{type:'tab', text:'FIND & REPLACE', orientation:'column', alignChildren:['center', 'center'],\
                              findLabel: StaticText{text:'Find:', alignment:['fill', 'fill']},\
                              findText: EditText{text: 'findText', alignment:['fill', 'fill']},\
                              replaceLabel: StaticText{text:'Replace:', alignment:['fill', 'fill']},\
                              replaceText: EditText{text: 'replaceText', alignment:['fill', 'fill']},\
                            },\
                            rTab: Panel{type:'tab', text:'RESET', orientation:'column', alignChildren:['center', 'center'],\
                              rGroup: Panel{orientation:'row', alignment:['fill', 'fill'], alignChildren:['center', 'center'],\
                              },\
                            },\
                          },\
                      executeGroup: Group{orientation:'row', alignChildren:['left', 'fill'],\
                        selectorGroup: Group{orientation:'column', alignChildren:['left', 'center'], spacing: 5px,\
                          compButton: RadioButton{text:'Comps'},\
                          layerButton: RadioButton{text:'Layers'},\
                          rqButton: RadioButton{text:'Render Queue'},\
                        },\
                        renameItButton: Button{text:'RENAME IT!', alignment:['fill', 'fill']},\
                    },\
                  }"

                  // Adds resource string to panel
                  myPanel.grp = myPanel.add(res);



                  myPanel.grp.executeGroup.renameItButton.onClick = function(){
                    var compSelected = myPanel.grp.executeGroup.selectorGroup.compButton.value;
                    var layerSelected = myPanel.grp.executeGroup.selectorGroup.layerButton.value;
                    var rqSelected = myPanel.grp.executeGroup.selectorGroup.rqButton.value;
                    var selThings = null;
                    var i, j, k, l = 0;

                    // check the comp or layer buttons and assign variables accordingly
                    if (compSelected) {
                      selThings = app.project.selection;
                      if (selThings.length == 0) {
                        alert("Select some comps and try again.");
                        return;
                      }

                    } else if (layerSelected) {
                      selThings = app.project.activeItem.selectedLayers;
                      if (selThings.length == 0) {
                        alert("Select some layers and try again.");
                        return;
                      }
                    } else if (rqSelected) {
                      selThings = app.project.renderQueue;
                      if (selThings.numItems == 0) {
                        alert("Nothing queued. Try again");
                        return;
                      }
                    } else {
                      alert("Choose an option to the left of the RENAME IT! button, and try again.");
                      return;
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
                        var aPanel = myPanel.grp.myTabbedPanel.aTab.appendPanel;
                        var aPrefixSw = aPanel.appendSwitch.prefixButton.value;
                        var aSuffixSw = aPanel.appendSwitch.suffixButton.value;

                        // check that at least one button is switched on
                        if (!aSuffixSw && !aPrefixSw){
                          alert("Choose prefix or suffix, and try again.");
                          return;
                        }

                        //check for switches and set up prefix and suffix accordingly
                        var aPrefix = aPrefixSw ? aPanel.appendTextGroup.appendText.text : "";
                        var aSuffix = aSuffixSw ? aPanel.appendTextGroup.appendText.text : "";

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
