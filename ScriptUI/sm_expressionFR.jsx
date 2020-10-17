// sm_expressionFR v1.2
// Window for doing a simple Find and Replace in expressions.
{
  function expressionFR(_found, _replaced, mode){
    var comp = app.project.activeItem;
    var l = comp.selectedLayers;
    var pr = comp.selectedProperties;
    app.beginUndoGroup("sm_expressionFR");
    for (var i = 0; i < pr.length; i++){
      var curProp = pr[i];

      if (curProp.expression != null){
        var gFound = new RegExp(escapeRegExp(_found), "g");
        curProp.expression = curProp.expression.replace(gFound, _replaced);
      }

    }
    app.endUndoGroup();
  }

  function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  function myScript(thisObj) {
      function myScript_buildUI(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "sm_expressionFR", [0, 0, 50, 25]);

        res = "group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
          textGroup: Group{orientation:'column',preferredSize:[200,25],spacing:2,\
            findText: EditText{text: 'findText', alignment:['fill', 'fill'], properties:{multiline:true}},\
            replaceText: EditText{text: 'replaceText', alignment:['fill', 'fill'], properties:{multiline:true}},\
          },\
          doButton: Button{text:'*',alignment:['right', 'fill'], maximumSize:[30,600]},\
          qButton: Button{text:'?',alignment:['right', 'fill'], maximumSize:[30,600]},\
          }\
        }"

        // Adds resource string to panel
        myPanel.grp = myPanel.add(res);
        //myPanel.grp.dropper.selection = 0;
        // Assign function to UI elements
        myPanel.grp.doButton.onClick = function(){
          var findText = myPanel.grp.textGroup.findText.text;
          var replaceText = myPanel.grp.textGroup.replaceText.text;
          expressionFR(findText, replaceText, 1);
        }

        myPanel.grp.qButton.onClick = function(){
          alert("Basic find and replace for expressions. Fill the top text field with the text you want to replace, and the bottom text field with the new text.")

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
