// sm_labelUtil v1.0 191023

{

  function selectByLabel(labelInd, selMode, hMode){
    var curComp = app.project.activeItem;
    if (curComp != null && curComp instanceof CompItem){
      var allLayers = curComp.layers;
      if (allLayers.length != 0){
        app.beginUndoGroup("sm_labelUtil - Select");
        for (var i = 1; i <= curComp.numLayers; i++){
          var curLayer = allLayers[i];
          if (curLayer.locked){ continue; }
          switch (selMode){
            case 0:
              curLayer.selected = false;
              if (hMode){
                  curLayer.selected = curLayer.label == labelInd;
              } else {
                if (curLayer.enabled){
                  curLayer.selected = curLayer.label == labelInd;
                }
              }
              break;
            case 1:
              if (curLayer.label == labelInd){
                if (hMode){
                  curLayer.selected = true;
                } else {
                  if (curLayer.enabled){
                    curLayer.selected = true;
                  }
                }
              }
              break;
            case 2:
              if (curLayer.label == labelInd){
                curLayer.selected = false;
              }
              break;
            case 3:
              curLayer.selected = false;
              if (curLayer.label !== labelInd){
                if (hMode){
                  curLayer.selected = true;
                } else {
                  if (curLayer.enabled){
                    curLayer.selected = true;
                  }
                }
              }
              break;
            default:
              curLayer.selected = false;

          }
        }
        app.endUndoGroup();
      }
    }
  }

  function eyeByLabel(labelInd, eyeMode){
    var curComp = app.project.activeItem;
    if (curComp != null && curComp instanceof CompItem){
      var allLayers = curComp.layers;
      if (allLayers.length != 0){
        app.beginUndoGroup("sm_labelUtil - Eye");
        for (var i = 1; i <= curComp.numLayers; i++){
          var curLayer = allLayers[i];
          if (curLayer.isTrackMatte){continue;}
          switch (eyeMode){
            case 0:
              curLayer.enabled = curLayer.label == labelInd;
              break;
            case 1:
              if (curLayer.label == labelInd){
                curLayer.enabled = true;
              }
              break;
            case 2:
              if (curLayer.label == labelInd){
                curLayer.enabled = false;
              }
              break;
            case 3:
              curLayer.enabled = !(curLayer.label == labelInd);
              break;
            default:
              curLayer.enabled = false;

          }
        }
        app.endUndoGroup();
      }
    }
  }

  function soloByLabel(labelInd, soloMode){
    var curComp = app.project.activeItem;
    if (curComp != null && curComp instanceof CompItem){
      var allLayers = curComp.layers;
      if (allLayers.length != 0){
        app.beginUndoGroup("sm_labelUtil - Solo");
        for (var i = 1; i <= curComp.numLayers; i++){
          var curLayer = allLayers[i];
          if (!curLayer.enabled){continue;}
          switch (soloMode){
            case 0:
              curLayer.solo = curLayer.label == labelInd;
              break;
            case 1:
              if (curLayer.label == labelInd){
                curLayer.solo = true;
              }
              break;
            case 2:
              if (curLayer.label == labelInd){
                curLayer.solo = false;
              }
              break;
            case 3:
              curLayer.solo = !(curLayer.label == labelInd);
              break;
            default:
              curLayer.solo = false;

          }
        }
        app.endUndoGroup();
      }
    }
  }

  function lockByLabel(labelInd, lockMode){
    var curComp = app.project.activeItem;
    if (curComp != null && curComp instanceof CompItem){
      var allLayers = curComp.layers;
      if (allLayers.length != 0){
        app.beginUndoGroup("sm_labelUtil - Lock");
        for (var i = 1; i <= curComp.numLayers; i++){
          var curLayer = allLayers[i];
          switch (lockMode){
            case 0:
              curLayer.locked = curLayer.label == labelInd;
              break;
            case 1:
              if (curLayer.label == labelInd){
                curLayer.locked = true;
              }
              break;
            case 2:
              if (curLayer.label == labelInd){
                curLayer.locked = false;
              }
              break;
            case 3:
              curLayer.locked = !(curLayer.label == labelInd);
              break;
            default:
              curLayer.locked = false;

          }
        }
        app.endUndoGroup();
      }
    }
  }

  function shyByLabel(labelInd, shyMode){
    var curComp = app.project.activeItem;
    if (curComp != null && curComp instanceof CompItem){
      var allLayers = curComp.layers;
      if (allLayers.length != 0){
        app.beginUndoGroup("sm_labelUtil - Shy");
        for (var i = 1; i <= curComp.numLayers; i++){
          var curLayer = allLayers[i];
          switch (shyMode){
            case 0:
              curLayer.shy = curLayer.label == labelInd;
              break;
            case 1:
              if (curLayer.label == labelInd){
                curLayer.shy = true;
              }
              break;
            case 2:
              if (curLayer.label == labelInd){
                curLayer.shy = false;
              }
              break;
            case 3:
              curLayer.shy = !(curLayer.label == labelInd);
              break;
            default:
              curLayer.shy = false;

          }
        }
        app.endUndoGroup();
      }
    }
  }








   function myScript(thisObj) {
      function myScript_buildUI(thisObj) {
                var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "sm_labelUtil");

                var icoEye = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00\u00C7IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00A8\u0081C\u00D0@f n\x01\u00E2\u009B@|\x07\u0098\u00C4f\x01i\x01\u00BCI\r$\u0089\x03\u00CB\x01\u00F1\u00B9\x7F\u00FF\u00FE\u00FD\x05\u00E2h \u00DB\x03H\u00BF\x03\u00D2o\u0081\u00B4\x15.}\u00B8\\\u00E8\x05\u00C4\u0087\u0080\u00D8\u0090\u0091\u0091\u00D1\t\u0088?\x01\u00D9<@\u00DA\r\u00A8\t\u00A4g'\u0090\u008E'\u00C5\u00CB\u00A6@,\x0F\u00D4\x04r\u00D1m \u00FB.\x10\u00FF\x00\u00E2\u00F7@C\u00AF\x011\x0F\u0090\u00EDM\u0092\u0097\u0081\u00DE\u00CA\x06b \u00F3\u00FFb 6\x01b\x0B \u00EE\x06\t\x00\u00C5\u00A7\x02).l\u00FA\u00F0\u0085!\b\u00FB\x005\u00DF\x07\u00E2\u00B3@\u00F6~ ~\x0F\u00C4\x19\u00F8\u00F4\x102\x10\u0084\u00CD\u0081x=\x10o\x07Y@H=\u00E3hi3\x02\f\x04\b0\x00\u00B5\u00EE#%=\x04&x\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var icoSolo = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00~IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00A8\u0081\u00B47P\x13\u00887\x02\u00F1g \u00FE\x04\u00C4\u00EB\u0081X\r\u00AF\x0EP\u00B2\u00C1\u0081\u00B5\u0080\u00F8\u00FD\x7FL\x00\x12S\u00C3\u00A5\x0F\u009F\u0081\x1B\u00FE\u00E3\x06kq\u00E9c\u00C4\u0093\u00B0A\u00DE\u00E4\u00C1!\x07\u00F2>?5#\u00E5?9\u0091\u00B2\u0087,9<a\u00A8\u0081#R\u00DE\x01\u00B129\u0091\x02\u00C2\u00AA\u00D0\b\u00F8\b\u00C4\x1F\u0080x\rT\u008C\u0081\u009CH\x19\u00CD\u00CB\u00C3\u00C5@\u0080\x00\x03\x00\x17\n\x17h\x1A.\u00D4j\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var icoLock = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00\u00CEIDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00F00P\x13\u0088gB\u00B1\x16A\u00D5\u00A0H\u00C1\u00839\u0080x\u00DB\x7F\x04\u00D8\x06\x15\u00C3\u00A9\u0087\u0090\u0081\u00F3\u00A0\x06M\u0081\u00E2\u00FFP1\u00B2\f\x14\u0081\x1A\u00B0\x0EIl\x1DTL\x04\u0097>|a\u00F8\x17J_F\x12\u00BB\u008C&\u0087\x01X\u00F0\x18h\t\u00A5\u009D\u0081\u00F8=\x12\x1B&\u00B7\u008D\u0094H\u00A9\x02\u00E2\x0B\u00FFq\u0083\x0BP5D{Y\x10\u0088y\u0091\u00F8\u00DEP\f\x03\u00BCP5D{\u00F9'\x10\u00FFF\u00E2_A\u0093\u00FF\rUC\u00B4\u0081\u009C@\u00CC\u008E\u00C4wB\u0093g\u0087\u00AA!\u00DA@\u0090\u008B\u00B4\u0081X\x01\u00CA\u00EFG\u0093\u00BF\u0089\u00C5\u00D5x\r\u00DC\t\u00C4o\u0080\u00F8\t\x10\u00BF\x06b\x19\u00A88\u0088/\n\u00C4\x1B\u0081\u00F8,6\u008D\u008C\u00A3\u00E5!\u00C5\x00 \u00C0\x00O\u00C1 B!\u00EAE\x15\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var icoShy = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x01\x01IDATx\u00DA\u00EC\u00D4\u00BDj\x02A\x10\u00C0qW\u00CE\x0FR\x04\x1BES\u00A8i\x02Z\u00DB\u00F8*\u00B1\u00B1\x13,\u00C57H\u0095./\u0090\u0097H/B\u0082\x12H\u00A5\u00A8\u0085\u00CF 6i\u00FC8X\u00FF\x07\u00A3\u00AEr\u00ACwja\u00E1\u00C0\u008F;v\u00F7\u0086\u00B9\u009De\u0095\u00D6:r\u00CD\u0088F\u00AE\x1C\u00B7\u009F\u00D0\t0\u00E6\u0086\u0099\u00B7U\u00A8\u008C\u00C5id\u008C\x04\u00EA\u009C_^#\u0087\x0E\u00C6\x18\u00E1\x07\x05\u0099\u00F3O\u00EA\x1D\u009B#\u008E<\x13\u00E8b\u00A9\u00F7\u00B1@\x1F\x0FP\u00C6\u00DA\x1D[\u00855\u00BC \u0081.\u00FE\u0090D\x16\r\u00AF\u0096\u00A0M\u00D9F\x15O\u00E8\u00A1,\u00BF\u00F8\u008DgT\u00C2ty\u00BB7\u009F\u0098\u00A1\u0084\u0094\u008C\u00CD\u00F1\u008E\u00AF0M\u00F1\u00BA\u00F8\u0086\u00B6\u00BC\u00BF\u00E2\x17\x13\u00D4\u00B1BK\x12\u00BBA+\x1CH'\x17\u00C8\u00A3\u0088Gy\u00FF\u00C7\x10SY{\u00B0\u0097\u00CA\u00E7r\u0088I23\u009A\u0088\u00E3\u00C3\u00A7 \u00F7TB\u00E7\u00E8\u008Ci\u00E3#\u00DB\u009C\u00B5\u00CB\u00DA\u00B25\u00D6\u00FBN\u00DD\u00EF\u00C3\u008Bc#\u00C0\x00\u00BBEx\u00D6(\x128\x1E\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoAqua = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]`\u00D5\u0099\x13$\x05j\u0098\u0089\x05\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\x06\u00F9\n#\u009A\u00EF\u008D\u00B5\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoBlue = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05] \u00A3\u00EE!I\u0081:\u00A3I\u009Eq\u0084\u0087\u00E1\u00A8\u0081\u00A3\x06\x0E\x06\x03\x19G\u00CBC\u008A\x01@\u0080\x01\x00\u00F0\u009A\n#K\u00CD\u00CD\u00B7\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoBrown = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]\u00A0\u00C1M\u009B\u00A4@m\u00D8u\u0095q\u0084\u0087\u00E1\u00A8\u0081\u00A3\x06\x0E\x06\x03\x19G\u00CBC\u008A\x01@\u0080\x01\x00\u00C8z\n#\u00E6\u00BD\x1C\u00BE\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoCyan = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]\u00C0n\u00F12\u0092\x02\u00F5Pl\x14\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\u00E4\u009A\n#\x1E\u0097\x10#\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoDarkGreen = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]@\u00DEQ\u009E\u00A4@}\u00B8\u00FF!\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\u00B3\x1A\n#\u008A\u009A\u0096\u00BC\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoFucshia = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]\u00E0k\u00DEu\u0092\x02\u0095{\u0092&\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\x069\n#\u00D0\x0E\x7F\\\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoGreen = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]\u00C0{\u00A9/I\u0081\u00BA5z3\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\u00D6\u00BA\n#\u00D8\u00C9\u00FF\u00DB\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoLavender = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]`\u00D5\u00AA\u00D3$\x05jX\u0098)\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\x01)\n#\u00885\u008DU\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoNone = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05] ==\u009D\u00A4@\u009D9s&\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\u00D5:\n#%R\u00F9Y\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoOrange = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]\u00E0\u00E5d>\u0092\x02U<\u00F7\x13\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\u00E5*\n#D\u0088\u00A8\u00DC\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoPeach = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]\u00E0\u00C5\u00A1\u00F9$\x05\u00AA\u0084]\"\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\t\t\n#<\u00F9\n\u00F6\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoPink = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]\u00E0\u00D9\u00DES$\x05\u00AA\u0094\u00B3\x19\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\x0F\u00C9\n# \u0092-\"\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoPurple = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]\u00A0_w6I\u0081Zx9\u0095q\u0084\u0087\u00E1\u00A8\u0081\u00A3\x06\x0E\x06\x03\x19G\u00CBC\u008A\x01@\u0080\x01\x00\u00DB\u009A\n#\u00F7U\u00AE\u00D6\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoRed = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]`\u009B\u00A5%I\u0081\u00EAu\u00FC8\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\u00D2\u00CA\n#\u00D1s\u00FCl\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoSandstone = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]`\u00E5\u00F4\n\u0092\x025<\u00B3\u0083q\u0084\u0087\u00E1\u00A8\u0081\u00A3\x06\x0E\x06\x03\x19G\u00CBC\u008A\x01@\u0080\x01\x00\u00ED\u00CA\n#m\u0083\u00E3s\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoSeaFoam = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]`\u00CB\u0089-$\x05\u00AA\u008F\u0085\x0F\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\x04Y\n#\u00DB\x18A\u00BC\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var colorIcoYellow = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x06\x00\x00\x00\u008D\u0089\x1D\r\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAb\u00FC\u00FF\u00FF?\x035\x01\x13\x03\u0095\u00C1\u00E07\u0090\x05]\u00E0\u00E9M_\u0092\x02UZ}3\u00E3\b\x0F\u00C3Q\x03G\r\x1C\f\x062\u008E\u0096\u0087\x14\x03\u0080\x00\x03\x00\u00FDZ\n#4F\u00EDz\x00\x00\x00\x00IEND\u00AEB`\u0082";

                var labels = ["None","Red","Yellow","Aqua","Pink","Lavender","Peach","SeaFoam","Blue","Green","Purple","Orange","Brown","Fuchsia","Cyan","Sandstone","DarkGreen"];

                res = "group{orientation:'column', alignment: ['fill', 'fill'], alignChildren: ['left', 'top'], spacing: 2,\
                  noneGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  redGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  yellowGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  aquaGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  pinkGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  lavenderGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  peachGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  seafoamGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  blueGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  greenGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  purpleGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  orangeGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  brownGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  fuchsiaGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  cyanGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  sandstoneGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  darkgreenGroup: Group{orientation: 'row', spacing: 2,\
                    eyeB: IconButton{size: [22,22]},\
                    soloB: IconButton{size: [22,22]},\
                    lockB: IconButton{size: [22,22]},\
                    shyB: IconButton{size: [22,22]},\
                    defaultB: IconButton{size: [22,22]},\
                  },\
                  hiddenCheck: Checkbox{text:'Hidden layers?'},\
                }";

                // Adds resource string to panel

                myPanel.grp = myPanel.add(res);

                var hCheck;

                myPanel.grp.noneGroup.eyeB.image = icoEye;
                myPanel.grp.redGroup.eyeB.image = icoEye;
                myPanel.grp.yellowGroup.eyeB.image = icoEye;
                myPanel.grp.aquaGroup.eyeB.image = icoEye;
                myPanel.grp.pinkGroup.eyeB.image = icoEye;
                myPanel.grp.lavenderGroup.eyeB.image = icoEye;
                myPanel.grp.peachGroup.eyeB.image = icoEye;
                myPanel.grp.seafoamGroup.eyeB.image = icoEye;
                myPanel.grp.blueGroup.eyeB.image = icoEye;
                myPanel.grp.greenGroup.eyeB.image = icoEye;
                myPanel.grp.purpleGroup.eyeB.image = icoEye;
                myPanel.grp.orangeGroup.eyeB.image = icoEye;
                myPanel.grp.brownGroup.eyeB.image = icoEye;
                myPanel.grp.fuchsiaGroup.eyeB.image = icoEye;
                myPanel.grp.cyanGroup.eyeB.image = icoEye;
                myPanel.grp.sandstoneGroup.eyeB.image = icoEye;
                myPanel.grp.darkgreenGroup.eyeB.image = icoEye;

                myPanel.grp.noneGroup.soloB.image = icoSolo;
                myPanel.grp.redGroup.soloB.image = icoSolo;
                myPanel.grp.yellowGroup.soloB.image = icoSolo;
                myPanel.grp.aquaGroup.soloB.image = icoSolo;
                myPanel.grp.pinkGroup.soloB.image = icoSolo;
                myPanel.grp.lavenderGroup.soloB.image = icoSolo;
                myPanel.grp.peachGroup.soloB.image = icoSolo;
                myPanel.grp.seafoamGroup.soloB.image = icoSolo;
                myPanel.grp.blueGroup.soloB.image = icoSolo;
                myPanel.grp.greenGroup.soloB.image = icoSolo;
                myPanel.grp.purpleGroup.soloB.image = icoSolo;
                myPanel.grp.orangeGroup.soloB.image = icoSolo;
                myPanel.grp.brownGroup.soloB.image = icoSolo;
                myPanel.grp.fuchsiaGroup.soloB.image = icoSolo;
                myPanel.grp.cyanGroup.soloB.image = icoSolo;
                myPanel.grp.sandstoneGroup.soloB.image = icoSolo;
                myPanel.grp.darkgreenGroup.soloB.image = icoSolo;

                myPanel.grp.noneGroup.lockB.image = icoLock;
                myPanel.grp.redGroup.lockB.image = icoLock;
                myPanel.grp.yellowGroup.lockB.image = icoLock;
                myPanel.grp.aquaGroup.lockB.image = icoLock;
                myPanel.grp.pinkGroup.lockB.image = icoLock;
                myPanel.grp.lavenderGroup.lockB.image = icoLock;
                myPanel.grp.peachGroup.lockB.image = icoLock;
                myPanel.grp.seafoamGroup.lockB.image = icoLock;
                myPanel.grp.blueGroup.lockB.image = icoLock;
                myPanel.grp.greenGroup.lockB.image = icoLock;
                myPanel.grp.purpleGroup.lockB.image = icoLock;
                myPanel.grp.orangeGroup.lockB.image = icoLock;
                myPanel.grp.brownGroup.lockB.image = icoLock;
                myPanel.grp.fuchsiaGroup.lockB.image = icoLock;
                myPanel.grp.cyanGroup.lockB.image = icoLock;
                myPanel.grp.sandstoneGroup.lockB.image = icoLock;
                myPanel.grp.darkgreenGroup.lockB.image = icoLock;

                myPanel.grp.noneGroup.shyB.image = icoShy;
                myPanel.grp.redGroup.shyB.image = icoShy;
                myPanel.grp.yellowGroup.shyB.image = icoShy;
                myPanel.grp.aquaGroup.shyB.image = icoShy;
                myPanel.grp.pinkGroup.shyB.image = icoShy;
                myPanel.grp.lavenderGroup.shyB.image = icoShy;
                myPanel.grp.peachGroup.shyB.image = icoShy;
                myPanel.grp.seafoamGroup.shyB.image = icoShy;
                myPanel.grp.blueGroup.shyB.image = icoShy;
                myPanel.grp.greenGroup.shyB.image = icoShy;
                myPanel.grp.purpleGroup.shyB.image = icoShy;
                myPanel.grp.orangeGroup.shyB.image = icoShy;
                myPanel.grp.brownGroup.shyB.image = icoShy;
                myPanel.grp.fuchsiaGroup.shyB.image = icoShy;
                myPanel.grp.cyanGroup.shyB.image = icoShy;
                myPanel.grp.sandstoneGroup.shyB.image = icoShy;
                myPanel.grp.darkgreenGroup.shyB.image = icoShy;

                myPanel.grp.noneGroup.defaultB.image = colorIcoNone;
                myPanel.grp.redGroup.defaultB.image = colorIcoRed;
                myPanel.grp.yellowGroup.defaultB.image = colorIcoYellow;
                myPanel.grp.aquaGroup.defaultB.image = colorIcoAqua;
                myPanel.grp.pinkGroup.defaultB.image = colorIcoPink;
                myPanel.grp.lavenderGroup.defaultB.image = colorIcoLavender;
                myPanel.grp.peachGroup.defaultB.image = colorIcoPeach;
                myPanel.grp.seafoamGroup.defaultB.image = colorIcoSeaFoam;
                myPanel.grp.blueGroup.defaultB.image = colorIcoBlue;
                myPanel.grp.greenGroup.defaultB.image = colorIcoGreen;
                myPanel.grp.purpleGroup.defaultB.image = colorIcoPurple;
                myPanel.grp.orangeGroup.defaultB.image = colorIcoOrange;
                myPanel.grp.brownGroup.defaultB.image = colorIcoBrown;
                myPanel.grp.fuchsiaGroup.defaultB.image = colorIcoFucshia;
                myPanel.grp.cyanGroup.defaultB.image = colorIcoCyan;
                myPanel.grp.sandstoneGroup.defaultB.image = colorIcoSandstone;
                myPanel.grp.darkgreenGroup.defaultB.image = colorIcoDarkGreen;

                // Assign function to UI elements


                // SELECT
                //NONE GROUP
                myPanel.grp.noneGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(0, mode, hCheck);
                };

                // RED GROUP
                myPanel.grp.redGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(1, mode, hCheck);
                };

                // YELLOW GROUP
                myPanel.grp.yellowGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(2, mode, hCheck);
                };

                // AQUA GROUP
                myPanel.grp.aquaGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(3, mode, hCheck);
                };
                // PINK GROUP
                myPanel.grp.pinkGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(4, mode, hCheck);
                };

                // LAVENDER GROUP
                myPanel.grp.lavenderGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(5, mode, hCheck);
                };

                // PEACH GROUP
                myPanel.grp.peachGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(6, mode, hCheck);
                };

                // SEAFOAM GROUP
                myPanel.grp.seafoamGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(7, mode, hCheck);
                };

                // BLUE GROUP
                myPanel.grp.blueGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(8, mode, hCheck);
                };

                // GREEN GROUP
                myPanel.grp.greenGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(9, mode, hCheck);
                };

                // PURPLE GROUP
                myPanel.grp.purpleGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(10, mode, hCheck);
                };

                // ORANGE GROUP
                myPanel.grp.orangeGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(11, mode, hCheck);
                };

                // BROWN GROUP
                myPanel.grp.brownGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(12, mode, hCheck);
                };

                // FUCSHIA GROUP
                myPanel.grp.fuchsiaGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(13, mode, hCheck);
                };

                // CYAN GROUP
                myPanel.grp.cyanGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(14, mode, hCheck);
                };

                // SANDSTONE GROUP
                myPanel.grp.sandstoneGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(15, mode, hCheck);
                };

                // DARK GREEN GROUP
                myPanel.grp.darkgreenGroup.defaultB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;
                  hCheck = myPanel.grp.hiddenCheck.value;
                  selectByLabel(16, mode, hCheck);
                };

                // LOCK
                //NONE GROUP
                myPanel.grp.noneGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(0, mode);
                };

                // RED GROUP
                myPanel.grp.redGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(1, mode);
                };

                // YELLOW GROUP
                myPanel.grp.yellowGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(2, mode);
                };

                // AQUA GROUP
                myPanel.grp.aquaGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(3, mode);
                };
                // PINK GROUP
                myPanel.grp.pinkGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(4, mode);
                };

                // LAVENDER GROUP
                myPanel.grp.lavenderGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(5, mode);
                };

                // PEACH GROUP
                myPanel.grp.peachGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(6, mode);
                };

                // SEAFOAM GROUP
                myPanel.grp.seafoamGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(7, mode);
                };

                // BLUE GROUP
                myPanel.grp.blueGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(8, mode);
                };

                // GREEN GROUP
                myPanel.grp.greenGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(9, mode);
                };

                // PURPLE GROUP
                myPanel.grp.purpleGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(10, mode);
                };

                // ORANGE GROUP
                myPanel.grp.orangeGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(11, mode);
                };

                // BROWN GROUP
                myPanel.grp.brownGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(12, mode);
                };

                // FUCSHIA GROUP
                myPanel.grp.fuchsiaGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(13, mode);
                };

                // CYAN GROUP
                myPanel.grp.cyanGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(14, mode);
                };

                // SANDSTONE GROUP
                myPanel.grp.sandstoneGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(15, mode);
                };

                // DARK GREEN GROUP
                myPanel.grp.darkgreenGroup.lockB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  lockByLabel(16, mode);
                };


                // SOLO
                //NONE GROUP
                myPanel.grp.noneGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(0, mode);
                };

                // RED GROUP
                myPanel.grp.redGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(1, mode);
                };

                // YELLOW GROUP
                myPanel.grp.yellowGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(2, mode);
                };

                // AQUA GROUP
                myPanel.grp.aquaGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(3, mode);
                };
                // PINK GROUP
                myPanel.grp.pinkGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(4, mode);
                };

                // LAVENDER GROUP
                myPanel.grp.lavenderGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(5, mode);
                };

                // PEACH GROUP
                myPanel.grp.peachGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(6, mode);
                };

                // SEAFOAM GROUP
                myPanel.grp.seafoamGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(7, mode);
                };

                // BLUE GROUP
                myPanel.grp.blueGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(8, mode);
                };

                // GREEN GROUP
                myPanel.grp.greenGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(9, mode);
                };

                // PURPLE GROUP
                myPanel.grp.purpleGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(10, mode);
                };

                // ORANGE GROUP
                myPanel.grp.orangeGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(11, mode);
                };

                // BROWN GROUP
                myPanel.grp.brownGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(12, mode);
                };

                // FUCSHIA GROUP
                myPanel.grp.fuchsiaGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(13, mode);
                };

                // CYAN GROUP
                myPanel.grp.cyanGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(14, mode);
                };

                // SANDSTONE GROUP
                myPanel.grp.sandstoneGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(15, mode);
                };

                // DARK GREEN GROUP
                myPanel.grp.darkgreenGroup.soloB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  soloByLabel(16, mode);
                };

                // EYE
                //NONE GROUP
                myPanel.grp.noneGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(0, mode);
                };

                // RED GROUP
                myPanel.grp.redGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(1, mode);
                };

                // YELLOW GROUP
                myPanel.grp.yellowGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(2, mode);
                };

                // AQUA GROUP
                myPanel.grp.aquaGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(3, mode);
                };
                // PINK GROUP
                myPanel.grp.pinkGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(4, mode);
                };

                // LAVENDER GROUP
                myPanel.grp.lavenderGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(5, mode);
                };

                // PEACH GROUP
                myPanel.grp.peachGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(6, mode);
                };

                // SEAFOAM GROUP
                myPanel.grp.seafoamGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(7, mode);
                };

                // BLUE GROUP
                myPanel.grp.blueGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(8, mode);
                };

                // GREEN GROUP
                myPanel.grp.greenGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(9, mode);
                };

                // PURPLE GROUP
                myPanel.grp.purpleGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(10, mode);
                };

                // ORANGE GROUP
                myPanel.grp.orangeGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(11, mode);
                };

                // BROWN GROUP
                myPanel.grp.brownGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(12, mode);
                };

                // FUCSHIA GROUP
                myPanel.grp.fuchsiaGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(13, mode);
                };

                // CYAN GROUP
                myPanel.grp.cyanGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(14, mode);
                };

                // SANDSTONE GROUP
                myPanel.grp.sandstoneGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(15, mode);
                };

                // DARK GREEN GROUP
                myPanel.grp.darkgreenGroup.eyeB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  eyeByLabel(16, mode);
                };


                // SHY
                //NONE GROUP
                myPanel.grp.noneGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(0, mode);
                };

                // RED GROUP
                myPanel.grp.redGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(1, mode);
                };

                // YELLOW GROUP
                myPanel.grp.yellowGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(2, mode);
                };

                // AQUA GROUP
                myPanel.grp.aquaGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(3, mode);
                };
                // PINK GROUP
                myPanel.grp.pinkGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(4, mode);
                };

                // LAVENDER GROUP
                myPanel.grp.lavenderGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(5, mode);
                };

                // PEACH GROUP
                myPanel.grp.peachGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(6, mode);
                };

                // SEAFOAM GROUP
                myPanel.grp.seafoamGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(7, mode);
                };

                // BLUE GROUP
                myPanel.grp.blueGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(8, mode);
                };

                // GREEN GROUP
                myPanel.grp.greenGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(9, mode);
                };

                // PURPLE GROUP
                myPanel.grp.purpleGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(10, mode);
                };

                // ORANGE GROUP
                myPanel.grp.orangeGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(11, mode);
                };

                // BROWN GROUP
                myPanel.grp.brownGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(12, mode);
                };

                // FUCSHIA GROUP
                myPanel.grp.fuchsiaGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(13, mode);
                };

                // CYAN GROUP
                myPanel.grp.cyanGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(14, mode);
                };

                // SANDSTONE GROUP
                myPanel.grp.sandstoneGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(15, mode);
                };

                // DARK GREEN GROUP
                myPanel.grp.darkgreenGroup.shyB.onClick = function(){
                  var shiftPressed = ScriptUI.environment.keyboardState.shiftKey ? 1 : 0;
                  var altPressed = ScriptUI.environment.keyboardState.altKey ? 2 : 0;
                  var mode = shiftPressed + altPressed;

                  shyByLabel(16, mode);
                };









                // Setup panel sizing and make panel resizable
                myPanel.layout.layout(true);
                myPanel.grp.minimumSize = myPanel.grp.size;
                //myPanel.layout.resize();
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
