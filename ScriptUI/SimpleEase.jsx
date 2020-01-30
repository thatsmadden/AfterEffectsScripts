// SimpleEase v3.0 2019-10-24
// Copyright (c) 2017-2019 Steve Madden. All rights reserved.

// Buttons that act like Easy Ease, but with different Velocity Influence percentages.
// To use: Grab a mess of keyframes and press a button.
// Top row buttons ease both in and out. Bottom row ease either in ">" or out "<" the percentage above.

// Legal stuff:
// This script is provided "as is," without warranty of any kind, expressed or
// implied. In no event shall the author be held liable for any damages
// arising in any way from the use of this script.

{

function storeKeyframes(n, easeType){
    var comp = app.project.activeItem;
    if (!comp || comp.typeName !== "Composition") return;
    var properties = comp.selectedProperties;
    var i, I=properties.length;
    var ease = new KeyframeEase(0,n);
    var eType = easeType; // easeType 0 is ease in and out, easeType 1 is ease in, easeType 2 is ease out

    for (i=0; i<I; i++){
        if (properties[i] instanceof Property) setEase(properties[i], ease, eType);
    };
};

function setEase(property, ease, eType){
    var keySelection = property.selectedKeys;
    var i, I=keySelection.length;
    if (eType == 0){ //ease both
      for (i=0; i<I; i++){
  				var sKey = keySelection[i];
          switch(property.propertyValueType){
              case PropertyValueType.TwoD_SPATIAL:
              case PropertyValueType.ThreeD_SPATIAL:
  						case PropertyValueType.OneD:
              case PropertyValueType.COLOR:
              case PropertyValueType.SHAPE:
              case PropertyValueType.CUSTOM_VALUE:
                  property.setTemporalEaseAtKey(sKey, [ease], [ease]);
                  break;
              case PropertyValueType.TwoD:
                  property.setTemporalEaseAtKey(sKey, [ease, ease], [ease, ease]);
                  break;
              case PropertyValueType.ThreeD:
                  property.setTemporalEaseAtKey(sKey, [ease, ease, ease], [ease, ease, ease]);
          };
    };

} else if (eType == 1){ //ease in
  for (i=0; i<I; i++){
        var sKey = keySelection[i];
        var inInterp = property.keyInInterpolationType(sKey);
        var outInterp = property.keyOutInterpolationType(sKey);
        var inTempEase = property.keyInTemporalEase(sKey);
        var outTempEase = property.keyOutTemporalEase(sKey);
        switch(property.propertyValueType){
            case PropertyValueType.TwoD_SPATIAL:
            case PropertyValueType.ThreeD_SPATIAL:
                property.setTemporalEaseAtKey(sKey, [ease], outTempEase);
                property.setInterpolationTypeAtKey(sKey, KeyframeInterpolationType.BEZIER, outInterp);
                break;
            case PropertyValueType.OneD:
            case PropertyValueType.COLOR:
            case PropertyValueType.SHAPE:
            case PropertyValueType.CUSTOM_VALUE:
                property.setTemporalEaseAtKey(sKey, [ease], outTempEase);
                property.setInterpolationTypeAtKey(sKey, KeyframeInterpolationType.BEZIER, outInterp);
                break;
            case PropertyValueType.TwoD:
                property.setTemporalEaseAtKey(sKey, [ease, ease], outTempEase);
                property.setInterpolationTypeAtKey(sKey, KeyframeInterpolationType.BEZIER, outInterp);
                break;
            case PropertyValueType.ThreeD:
                property.setTemporalEaseAtKey(sKey, [ease, ease, ease], outTempEase);
                property.setInterpolationTypeAtKey(sKey, KeyframeInterpolationType.BEZIER, outInterp);
        };
      };
} else {  //ease out
    for (i=0; i<I; i++){
        var sKey = keySelection[i];
        var inInterp = property.keyInInterpolationType(sKey);
        var outInterp = property.keyOutInterpolationType(sKey);
        var inTempEase = property.keyInTemporalEase(sKey);
        var outTempEase = property.keyOutTemporalEase(sKey);

        switch(property.propertyValueType){
            case PropertyValueType.TwoD_SPATIAL:
            case PropertyValueType.ThreeD_SPATIAL:
                property.setTemporalEaseAtKey(sKey, inTempEase, [ease]);
                property.setInterpolationTypeAtKey(sKey, inInterp, KeyframeInterpolationType.BEZIER);
                break;
            case PropertyValueType.OneD:
            case PropertyValueType.COLOR:
            case PropertyValueType.SHAPE:
            case PropertyValueType.CUSTOM_VALUE:
                property.setTemporalEaseAtKey(sKey, inTempEase, [ease]);
                property.setInterpolationTypeAtKey(sKey, inInterp, KeyframeInterpolationType.BEZIER);
                break;
            case PropertyValueType.TwoD:
                property.setTemporalEaseAtKey(sKey, inTempEase, [ease, ease]);
                property.setInterpolationTypeAtKey(sKey, inInterp, KeyframeInterpolationType.BEZIER);
                break;
            case PropertyValueType.ThreeD:
                property.setTemporalEaseAtKey(sKey, inTempEase, [ease, ease, ease]);
                property.setInterpolationTypeAtKey(sKey, inInterp, KeyframeInterpolationType.BEZIER);
        };
    };
  };
};

function w(thisObj) // Build panel with buttons
{
          function w_buildUI(thisObj) {
                    var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette");

                    res="group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                            g50:Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                                        b50: Button{text:'50%'},\
                                        io:Group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                                          b50i: Button{text:'>'},\
                                          b50o: Button{text:'<'},\
                                      },\
                              },\
                            g60:Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                                        b60: Button{text:'60%'},\
                                        io:Group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                                          b60i: Button{text:'>'},\
                                          b60o: Button{text:'<'},\
                                      },\
                              },\
                              g80:Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                                        b80: Button{text:'80%'},\
                                        io:Group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                                          b80i: Button{text:'>'},\
                                          b80o: Button{text:'<'},\
                                      },\
                              },\
                              g100:Group{orientation:'column', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                                        b100: Button{text:'100%'},\
                                        io:Group{orientation:'row', alignment:['fill', 'fill'], alignChildren:['fill', 'fill'], spacing:2,\
                                          b100i: Button{text:'>'},\
                                          b100o: Button{text:'<'},\
                                        },\
                              },\
                    }"

                    //Add resource string to panel
                    myPanel.grp = myPanel.add(res);

          myPanel.grp.g50.b50.onClick = function(){
					  app.beginUndoGroup("SimpleEase 50");
					  storeKeyframes(50,0);
					  app.endUndoGroup();
					};

					myPanel.grp.g50.io.b50i.onClick = function(){
					  app.beginUndoGroup("SimpleEaseIn 50");
					  storeKeyframes(50,1);
					  app.endUndoGroup();
					};

          myPanel.grp.g50.io.b50o.onClick = function(){
					  app.beginUndoGroup("SimpleEaseOut 50");
					  storeKeyframes(50,2);
					  app.endUndoGroup();
					};


					myPanel.grp.g60.b60.onClick = function(){
					  app.beginUndoGroup("SimpleEase 60");
					  storeKeyframes(60,0);
					  app.endUndoGroup();
					};

          myPanel.grp.g60.io.b60i.onClick = function(){
					  app.beginUndoGroup("SimpleEaseIn 60");
					  storeKeyframes(60,1);
					  app.endUndoGroup();
					};

          myPanel.grp.g60.io.b60o.onClick = function(){
					  app.beginUndoGroup("SimpleEaseOut 60");
					  storeKeyframes(60,2);
					  app.endUndoGroup();
					};

					myPanel.grp.g80.b80.onClick = function(){
					  app.beginUndoGroup("SimpleEase 80");
					  storeKeyframes(80,0);
					  app.endUndoGroup();
					};

          myPanel.grp.g80.io.b80i.onClick = function(){
					  app.beginUndoGroup("SimpleEaseIn 80");
					  storeKeyframes(80,1);
					  app.endUndoGroup();
					};

          myPanel.grp.g80.io.b80o.onClick = function(){
					  app.beginUndoGroup("SimpleEaseOut 80");
					  storeKeyframes(80,2);
					  app.endUndoGroup();
					};

          myPanel.grp.g100.b100.onClick = function(){
					  app.beginUndoGroup("SimpleEase 100");
					  storeKeyframes(100,0);
					  app.endUndoGroup();
					};

          myPanel.grp.g100.io.b100i.onClick = function(){
					  app.beginUndoGroup("SimpleEaseIn 100");
					  storeKeyframes(100,1);
					  app.endUndoGroup();
					};

          myPanel.grp.g100.io.b100o.onClick = function(){
					  app.beginUndoGroup("SimpleEaseOut 100");
					  storeKeyframes(100,2);
					  app.endUndoGroup();
					};

                    //Setup panel sizing and make panel resizable
                    myPanel.layout.layout();
                    myPanel.layout.resize(true);
                    myPanel.onResizing = myPanel.onResize = function () {this.layout.resize();}

                    return myPanel;
          };

          var wPal = w_buildUI(thisObj);


          if ((wPal != null) && (wPal instanceof Window)) {
                    wPal.center();
                    wPal.show();
                    }
          }


          w(this);
}
