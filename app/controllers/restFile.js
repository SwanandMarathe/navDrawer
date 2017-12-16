// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;



/*

var win = null;
var viewTable = null;
var viewheight = 33;
var imageheight = 18;
var tableData = null;
var sectionsData = [];

var minusImg = 'default.png';
var plusImg = 'default.png';

var viewTable = Ti.UI.createTableView({
        rowHeight:  0,
        backgroundColor:'transparent',
		height:Ti.UI.FILL,
		bottom:'5dp',
		scrollable:true,
        backgroundColor:  'transparent',
        separatorColor:  '#000000',
        separatorStyle:  0,
        left: 0
    });

viewTable.addEventListener('touchend', expandCollapseView);
processData();
$.Sidebarview.add(viewTable);

function buildTableRow(inParam) {'use strict';
 //Ti.API.info("inParam--- "+ JSON.stringify(inParam.title));
    var row = Ti.UI.createTableViewRow({
        title: inParam.Name,
        height: viewheight,
        indentionLevel: inParam.level,
        backgroundColor:"#f0f0f0",
        backgroundGradient: {
            type: 'linear',
            colors: [{
                color: '#414141',
                offset: 0.0
            }, {
                color: '#B2B2B2',
                offset: 0.12
            }, {
                color: '#A1A1F1',
                offset: 0.85
            }]
        },
        color: '#000000',
        font: {
            fontSize: 14,
            fontWeight: 'normal'
        },
        LEVEL: inParam.level,
        EXPANDED: (inParam.level < 2) ? true : false,
        CHILDEXPANDED: (inParam.level < 1) ? true : false,
        CHILD: inParam.child
    });
    
    // Create a Label.
    var rowLabel = Ti.UI.createLabel({
        text : inParam.Name,
        color : '#000000',
        font : {fontSize:14},
        height : viewheight,
        left : 0,
        textAlign : 'left'
    });
    
    // Add to the parent view.
    row.add(rowLabel);
    
    var rowImg = Ti.UI.createImageView({
        right: 30,
        height: 18,
        width: 18,
        top: 7,
        image: (inParam.child) ? plusImg : ''
    });
    var clickView = Ti.UI.createView({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent'
    });
    row.add(rowImg);
    row.add(clickView);

    row.height = (inParam.level < 2) ? viewheight : 0;
    rowImg.height = (inParam.level < 2) ? imageheight : 0;

    return row;
}
function processData() {'use strict';
    var dCnt = 0;

    for ( dCnt = 0; dCnt < Categories.length; dCnt += 1) {
        var sectionView = Ti.UI.createView({
            top:  0,
            left:  0,
            right:  0,
            height:  33,
            backgroundGradient: {
                type:  'linear',
                colors:  [{
                    color:  '#818181',
                    offset:  0.0
                }, {
                    color:  '#B2B2B2',
                    offset:  0.12
                }, {
                    color:  '#C3C3C3',
                    offset:  0.85
                }]
            }
        });
        var sectionViewLabel = Ti.UI.createLabel({
            top:  0,
            left:  0,
            width:  '100%',
            height:  '100%',
            text:  '  ' + Categories[dCnt].Name,
            textAlign:  'left',
            color:  "#ffffff",
            font: {
                fontSize:  14,
                fontWeight:  'bold'
            },
           secValue:  Categories[dCnt].sectionNum,
            EXPANDED:  true
        });
        sectionView.add(sectionViewLabel);
        sectionView.addEventListener('touchend', sectionProcess);

        var section = Ti.UI.createTableViewSection({
            headerView:  sectionView
        });
        var rCnt = 0;
        
        if(Categories[dCnt].Childrens)
         while (rCnt < Categories[dCnt].Childrens.length-1) {
         	 if(Categories[dCnt].Childrens[rCnt].Childrens){
         	 	Ti.API.info(JSON.stringify(Categories[dCnt].Childrens[rCnt].Childrens));
         	 }
             section.add(buildTableRow(Categories[dCnt].Childrens[rCnt]));
             // Ti.API.info(JSON.stringify(Categories[dCnt].Childrens[rCnt]));
             rCnt += 1;
         }
        sectionsData.push(section);
    }
    viewTable.setData(sectionsData);

    return;
}

function sectionProcess(inParam) {'use strict';

// Ti.API.info("inParam.source" + inParam.source);
    var iCnt = 0;
    var tCnt = 0;
    var baseLevel = 0;
    var rowStart = 0;

    var secTableData = viewTable.getData();
    var sectionData = secTableData[inParam.source.secValue];
    var rowData = sectionData.rows;
    var setViewHeight = (inParam.source.EXPANDED)  ?  0  :  viewheight;
    var setImgHeight = (inParam.source.EXPANDED)  ?  0  :  imageheight;
    var childLevelChk = {};
    var keyChk = 'AA0';

    inParam.source.EXPANDED = (inParam.source.EXPANDED)  ?  false  :  true;

    while (iCnt < rowData.length) {
        var setRowHeight = setViewHeight;
        var setImgRowHeight = setImgHeight;

        if (setRowHeight > 0) {
            if (rowData[iCnt].LEVEL === 1) {
                baseLevel += 1;
                keyChk = 'AA' + baseLevel;
                childLevelChk[keyChk] = [];
                childLevelChk[keyChk][1] = rowData[iCnt].CHILDEXPANDED;
            } else {
                var currLevel = rowData[iCnt].LEVEL;
                var prevLevel = currLevel - 1;

                childLevelChk[keyChk][currLevel] = (childLevelChk[keyChk][prevLevel])  ?  rowData[iCnt].CHILDEXPANDED  :  false;

                setRowHeight = (childLevelChk[keyChk][prevLevel])  ?  setViewHeight  :  0;
                setImgRowHeight = (childLevelChk[keyChk][prevLevel])  ?  setImgHeight  :  0;
            }
        }
        if (rowData[iCnt].EXPANDED) {
            rowData[iCnt].height = setRowHeight;
            rowData[iCnt].children[0].height = setImgRowHeight;
        }
  //      Ti.API.info("rowData---  "+JSON.stringify(rowData[iCnt].LEVEL));
        iCnt += 1;
    }
    return;
}

function expandCollapseView(inParam) {'use strict';
//Ti.API.info("inParam.rowData ------------ " + JSON.stringify(inParam));
	
    var inLevel = inParam.row.LEVEL;
    var inExpanded = inParam.row.CHILDEXPANDED;
    var rowTableData = viewTable.data;

    // need to find the section of the row ...
    var secLevel = 0;
    var totalRowCnt = 0;
    var sectionRows = null;
    var sectionStartRow = 0;
    var currentSectionRow = 0;
    var childLevelChk = [];

    for ( secLevel = 0; secLevel < rowTableData.length; secLevel += 1) {
        totalRowCnt = totalRowCnt + rowTableData[secLevel].rows.length;

        if (totalRowCnt >= (inParam.index + 1)) {
            sectionRows = rowTableData[secLevel].rows;
            sectionStartRow = totalRowCnt - sectionRows.length;
            currentSectionRow = inParam.index - sectionStartRow;
            break;
        }
    }
    var setViewHeight = (inExpanded)  ?  0  :  viewheight;
    var setImgHeight = (inExpanded)  ?  0  :  imageheight;
    var tCnt = 0;
    var tmpLevel = 0;
    var bCnt = 0;

    tCnt = currentSectionRow + 1;

    childLevelChk[inLevel] = (inExpanded)  ?  false  :  true;

    while (tCnt < sectionRows.length) {
        tmpLevel = sectionRows[tCnt].LEVEL;

        if (tmpLevel <= inLevel) {
            break;
        }
        childLevelChk[tmpLevel] = (childLevelChk[tmpLevel - 1])  ?  sectionRows[tCnt].CHILDEXPANDED  :  false;

        sectionRows[tCnt].height = setViewHeight;
        sectionRows[tCnt].children[0].height = setImgHeight;
        sectionRows[tCnt].EXPANDED = (inExpanded)  ?  false  :  true;
        bCnt = tCnt + 1;

        if (bCnt < sectionRows.length) {
            while (sectionRows[bCnt].LEVEL > tmpLevel) {
                // here is the complex one.... A child level can be expanded but a parent level can be collapsed so need to validate which it is ...
                childLevelChk[sectionRows[bCnt].LEVEL] = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?   sectionRows[bCnt].CHILDEXPANDED  :  false;
                var setRowHeight = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?  setViewHeight  :  0;
                var setImgRowHeight = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?  setImgHeight  :  0;

                if (sectionRows[bCnt].EXPANDED) {
                    sectionRows[bCnt].height = setRowHeight;
                    sectionRows[bCnt].children[0].height = setImgRowHeight;
                }
                bCnt += 1;

                if (bCnt >= sectionRows.length) {
                    break;
                }
            }
        }
        tCnt = bCnt;
    }
    inParam.row.CHILDEXPANDED = (inExpanded)  ?  false  :  true;
    inParam.row.children[0].image = (inExpanded)  ?  plusImg  :  minusImg;

    return;
}
function sectionProcess(inParam) {'use strict';
Ti.API.info("inParam.source" + JSON.stringify(inParam.source));
    var iCnt = 0;
    var tCnt = 0;
    var baseLevel = 0;
    var rowStart = 0;

    var secTableData = viewTable.getData();
    var sectionData = secTableData[inParam.source.secValue];
    var rowData = sectionData.rows;
    var setViewHeight = (inParam.source.EXPANDED)  ?  0  :  viewheight;
    var setImgHeight = (inParam.source.EXPANDED)  ?  0  :  imageheight;
    var childLevelChk = {};
    var keyChk = 'AA0';

    inParam.source.EXPANDED = (inParam.source.EXPANDED)  ?  false  :  true;

    while (iCnt < rowData.length) {
        var setRowHeight = setViewHeight;
        var setImgRowHeight = setImgHeight;

        if (setRowHeight > 0) {
            if (rowData[iCnt].LEVEL === 1) {
                baseLevel += 1;
                keyChk = 'AA' + baseLevel;
                childLevelChk[keyChk] = [];
                childLevelChk[keyChk][1] = rowData[iCnt].CHILDEXPANDED;
            } else {
                var currLevel = rowData[iCnt].LEVEL;
                var prevLevel = currLevel - 1;

                childLevelChk[keyChk][currLevel] = (childLevelChk[keyChk][prevLevel])  ?  rowData[iCnt].CHILDEXPANDED  :  false;

                setRowHeight = (childLevelChk[keyChk][prevLevel])  ?  setViewHeight  :  0;
                setImgRowHeight = (childLevelChk[keyChk][prevLevel])  ?  setImgHeight  :  0;
            }
        }
        if (rowData[iCnt].EXPANDED) {
            rowData[iCnt].height = setRowHeight;
            rowData[iCnt].children[0].height = setImgRowHeight;
        }
  //      Ti.API.info("rowData---  "+JSON.stringify(rowData[iCnt].LEVEL));
        iCnt += 1;
    }
    return;
}

function expandCollapseView(inParam) {'use strict';
//Ti.API.info("inParam.rowData ------------ " + JSON.stringify(inParam));
	
    var inLevel = inParam.row.LEVEL;
    var inExpanded = inParam.row.CHILDEXPANDED;
    var rowTableData = viewTable.data;

    // need to find the section of the row ...
    var secLevel = 0;
    var totalRowCnt = 0;
    var sectionRows = null;
    var sectionStartRow = 0;
    var currentSectionRow = 0;
    var childLevelChk = [];

    for ( secLevel = 0; secLevel < rowTableData.length; secLevel += 1) {
        totalRowCnt = totalRowCnt + rowTableData[secLevel].rows.length;

        if (totalRowCnt >= (inParam.index + 1)) {
            sectionRows = rowTableData[secLevel].rows;
            sectionStartRow = totalRowCnt - sectionRows.length;
            currentSectionRow = inParam.index - sectionStartRow;
            break;
        }
    }
    var setViewHeight = (inExpanded)  ?  0  :  viewheight;
    var setImgHeight = (inExpanded)  ?  0  :  imageheight;
    var tCnt = 0;
    var tmpLevel = 0;
    var bCnt = 0;

    tCnt = currentSectionRow + 1;

    childLevelChk[inLevel] = (inExpanded)  ?  false  :  true;

    while (tCnt < sectionRows.length) {
        tmpLevel = sectionRows[tCnt].LEVEL;

        if (tmpLevel <= inLevel) {
            break;
        }
        childLevelChk[tmpLevel] = (childLevelChk[tmpLevel - 1])  ?  sectionRows[tCnt].CHILDEXPANDED  :  false;

        sectionRows[tCnt].height = setViewHeight;
        sectionRows[tCnt].children[0].height = setImgHeight;
        sectionRows[tCnt].EXPANDED = (inExpanded)  ?  false  :  true;
        bCnt = tCnt + 1;

        if (bCnt < sectionRows.length) {
            while (sectionRows[bCnt].LEVEL > tmpLevel) {
                // here is the complex one.... A child level can be expanded but a parent level can be collapsed so need to validate which it is ...
                childLevelChk[sectionRows[bCnt].LEVEL] = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?   sectionRows[bCnt].CHILDEXPANDED  :  false;
                var setRowHeight = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?  setViewHeight  :  0;
                var setImgRowHeight = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?  setImgHeight  :  0;

                if (sectionRows[bCnt].EXPANDED) {
                    sectionRows[bCnt].height = setRowHeight;
                    sectionRows[bCnt].children[0].height = setImgRowHeight;
                }
                bCnt += 1;

                if (bCnt >= sectionRows.length) {
                    break;
                }
            }
        }
        tCnt = bCnt;
    }
    inParam.row.CHILDEXPANDED = (inExpanded)  ?  false  :  true;
    inParam.row.children[0].image = (inExpanded)  ?  plusImg  :  minusImg;

    return;
}



*/




/*

var win = null;
var viewTable = null;
var viewheight = 33;
var imageheight = 18;
var tableData = null;
var sectionsData = [];

var minusImg = 'default.png';
var plusImg = 'default.png';

var viewTable = Ti.UI.createTableView({
        rowHeight:  0,
        backgroundColor:'transparent',
		height:Ti.UI.FILL,
		bottom:'5dp',
		scrollable:true,
        backgroundColor:  'transparent',
        separatorColor:  '#000000',
        separatorStyle:  0,
        left: 0
    });

viewTable.addEventListener('touchend', expandCollapseView);
processData();
$.Sidebarview.add(viewTable);

function buildTableRow(inParam) {'use strict';
 //Ti.API.info("inParam--- "+ JSON.stringify(inParam.title));
    var row = Ti.UI.createTableViewRow({
        title: inParam.Name,
        height: viewheight,
        indentionLevel: inParam.level,
        backgroundColor:"#f0f0f0",
        backgroundGradient: {
            type: 'linear',
            colors: [{
                color: '#414141',
                offset: 0.0
            }, {
                color: '#B2B2B2',
                offset: 0.12
            }, {
                color: '#A1A1F1',
                offset: 0.85
            }]
        },
        color: '#000000',
        font: {
            fontSize: 14,
            fontWeight: 'normal'
        },
        LEVEL: inParam.level,
        EXPANDED: (inParam.level < 2) ? true : false,
        CHILDEXPANDED: (inParam.level < 1) ? true : false,
        CHILD: inParam.child
    });
    
    // Create a Label.
    var rowLabel = Ti.UI.createLabel({
        text : inParam.Name,
        color : '#000000',
        font : {fontSize:14},
        height : viewheight,
        left : 0,
        textAlign : 'left'
    });
    
    // Add to the parent view.
    row.add(rowLabel);
    
    var rowImg = Ti.UI.createImageView({
        right: 30,
        height: 18,
        width: 18,
        top: 7,
        image: (inParam.child) ? plusImg : ''
    });
    var clickView = Ti.UI.createView({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent'
    });
    row.add(rowImg);
    row.add(clickView);

    row.height = (inParam.level < 2) ? viewheight : 0;
    rowImg.height = (inParam.level < 2) ? imageheight : 0;

    return row;
}
function processData() {'use strict';
    var dCnt = 0;

    for ( dCnt = 0; dCnt < Categories.length; dCnt += 1) {
        var sectionView = Ti.UI.createView({
            top:  0,
            left:  0,
            right:  0,
            height:  33,
            backgroundGradient: {
                type:  'linear',
                colors:  [{
                    color:  '#818181',
                    offset:  0.0
                }, {
                    color:  '#B2B2B2',
                    offset:  0.12
                }, {
                    color:  '#C3C3C3',
                    offset:  0.85
                }]
            }
        });
        var sectionViewLabel = Ti.UI.createLabel({
            top:  0,
            left:  0,
            width:  '100%',
            height:  '100%',
            text:  '  ' + Categories[dCnt].Name,
            textAlign:  'left',
            color:  "#ffffff",
            font: {
                fontSize:  14,
                fontWeight:  'bold'
            },
           secValue:  Categories[dCnt].sectionNum,
            EXPANDED:  true
        });
        sectionView.add(sectionViewLabel);
        sectionView.addEventListener('touchend', sectionProcess);

        var section = Ti.UI.createTableViewSection({
            headerView:  sectionView
        });
        var rCnt = 0;
        
        if(Categories[dCnt].Childrens)
         while (rCnt < Categories[dCnt].Childrens.length-1) {
         	 if(Categories[dCnt].Childrens[rCnt].Childrens){
         	 	Ti.API.info(JSON.stringify(Categories[dCnt].Childrens[rCnt].Childrens));
         	 }
             section.add(buildTableRow(Categories[dCnt].Childrens[rCnt]));
             // Ti.API.info(JSON.stringify(Categories[dCnt].Childrens[rCnt]));
             rCnt += 1;
         }
        sectionsData.push(section);
    }
    viewTable.setData(sectionsData);

    return;
}

function sectionProcess(inParam) {'use strict';

// Ti.API.info("inParam.source" + inParam.source);
    var iCnt = 0;
    var tCnt = 0;
    var baseLevel = 0;
    var rowStart = 0;

    var secTableData = viewTable.getData();
    var sectionData = secTableData[inParam.source.secValue];
    var rowData = sectionData.rows;
    var setViewHeight = (inParam.source.EXPANDED)  ?  0  :  viewheight;
    var setImgHeight = (inParam.source.EXPANDED)  ?  0  :  imageheight;
    var childLevelChk = {};
    var keyChk = 'AA0';

    inParam.source.EXPANDED = (inParam.source.EXPANDED)  ?  false  :  true;

    while (iCnt < rowData.length) {
        var setRowHeight = setViewHeight;
        var setImgRowHeight = setImgHeight;

        if (setRowHeight > 0) {
            if (rowData[iCnt].LEVEL === 1) {
                baseLevel += 1;
                keyChk = 'AA' + baseLevel;
                childLevelChk[keyChk] = [];
                childLevelChk[keyChk][1] = rowData[iCnt].CHILDEXPANDED;
            } else {
                var currLevel = rowData[iCnt].LEVEL;
                var prevLevel = currLevel - 1;

                childLevelChk[keyChk][currLevel] = (childLevelChk[keyChk][prevLevel])  ?  rowData[iCnt].CHILDEXPANDED  :  false;

                setRowHeight = (childLevelChk[keyChk][prevLevel])  ?  setViewHeight  :  0;
                setImgRowHeight = (childLevelChk[keyChk][prevLevel])  ?  setImgHeight  :  0;
            }
        }
        if (rowData[iCnt].EXPANDED) {
            rowData[iCnt].height = setRowHeight;
            rowData[iCnt].children[0].height = setImgRowHeight;
        }
  //      Ti.API.info("rowData---  "+JSON.stringify(rowData[iCnt].LEVEL));
        iCnt += 1;
    }
    return;
}

function expandCollapseView(inParam) {'use strict';
//Ti.API.info("inParam.rowData ------------ " + JSON.stringify(inParam));
	
    var inLevel = inParam.row.LEVEL;
    var inExpanded = inParam.row.CHILDEXPANDED;
    var rowTableData = viewTable.data;

    // need to find the section of the row ...
    var secLevel = 0;
    var totalRowCnt = 0;
    var sectionRows = null;
    var sectionStartRow = 0;
    var currentSectionRow = 0;
    var childLevelChk = [];

    for ( secLevel = 0; secLevel < rowTableData.length; secLevel += 1) {
        totalRowCnt = totalRowCnt + rowTableData[secLevel].rows.length;

        if (totalRowCnt >= (inParam.index + 1)) {
            sectionRows = rowTableData[secLevel].rows;
            sectionStartRow = totalRowCnt - sectionRows.length;
            currentSectionRow = inParam.index - sectionStartRow;
            break;
        }
    }
    var setViewHeight = (inExpanded)  ?  0  :  viewheight;
    var setImgHeight = (inExpanded)  ?  0  :  imageheight;
    var tCnt = 0;
    var tmpLevel = 0;
    var bCnt = 0;

    tCnt = currentSectionRow + 1;

    childLevelChk[inLevel] = (inExpanded)  ?  false  :  true;

    while (tCnt < sectionRows.length) {
        tmpLevel = sectionRows[tCnt].LEVEL;

        if (tmpLevel <= inLevel) {
            break;
        }
        childLevelChk[tmpLevel] = (childLevelChk[tmpLevel - 1])  ?  sectionRows[tCnt].CHILDEXPANDED  :  false;

        sectionRows[tCnt].height = setViewHeight;
        sectionRows[tCnt].children[0].height = setImgHeight;
        sectionRows[tCnt].EXPANDED = (inExpanded)  ?  false  :  true;
        bCnt = tCnt + 1;

        if (bCnt < sectionRows.length) {
            while (sectionRows[bCnt].LEVEL > tmpLevel) {
                // here is the complex one.... A child level can be expanded but a parent level can be collapsed so need to validate which it is ...
                childLevelChk[sectionRows[bCnt].LEVEL] = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?   sectionRows[bCnt].CHILDEXPANDED  :  false;
                var setRowHeight = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?  setViewHeight  :  0;
                var setImgRowHeight = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?  setImgHeight  :  0;

                if (sectionRows[bCnt].EXPANDED) {
                    sectionRows[bCnt].height = setRowHeight;
                    sectionRows[bCnt].children[0].height = setImgRowHeight;
                }
                bCnt += 1;

                if (bCnt >= sectionRows.length) {
                    break;
                }
            }
        }
        tCnt = bCnt;
    }
    inParam.row.CHILDEXPANDED = (inExpanded)  ?  false  :  true;
    inParam.row.children[0].image = (inExpanded)  ?  plusImg  :  minusImg;

    return;
}
function sectionProcess(inParam) {'use strict';
Ti.API.info("inParam.source" + JSON.stringify(inParam.source));
    var iCnt = 0;
    var tCnt = 0;
    var baseLevel = 0;
    var rowStart = 0;

    var secTableData = viewTable.getData();
    var sectionData = secTableData[inParam.source.secValue];
    var rowData = sectionData.rows;
    var setViewHeight = (inParam.source.EXPANDED)  ?  0  :  viewheight;
    var setImgHeight = (inParam.source.EXPANDED)  ?  0  :  imageheight;
    var childLevelChk = {};
    var keyChk = 'AA0';

    inParam.source.EXPANDED = (inParam.source.EXPANDED)  ?  false  :  true;

    while (iCnt < rowData.length) {
        var setRowHeight = setViewHeight;
        var setImgRowHeight = setImgHeight;

        if (setRowHeight > 0) {
            if (rowData[iCnt].LEVEL === 1) {
                baseLevel += 1;
                keyChk = 'AA' + baseLevel;
                childLevelChk[keyChk] = [];
                childLevelChk[keyChk][1] = rowData[iCnt].CHILDEXPANDED;
            } else {
                var currLevel = rowData[iCnt].LEVEL;
                var prevLevel = currLevel - 1;

                childLevelChk[keyChk][currLevel] = (childLevelChk[keyChk][prevLevel])  ?  rowData[iCnt].CHILDEXPANDED  :  false;

                setRowHeight = (childLevelChk[keyChk][prevLevel])  ?  setViewHeight  :  0;
                setImgRowHeight = (childLevelChk[keyChk][prevLevel])  ?  setImgHeight  :  0;
            }
        }
        if (rowData[iCnt].EXPANDED) {
            rowData[iCnt].height = setRowHeight;
            rowData[iCnt].children[0].height = setImgRowHeight;
        }
  //      Ti.API.info("rowData---  "+JSON.stringify(rowData[iCnt].LEVEL));
        iCnt += 1;
    }
    return;
}

function expandCollapseView(inParam) {'use strict';
//Ti.API.info("inParam.rowData ------------ " + JSON.stringify(inParam));
	
    var inLevel = inParam.row.LEVEL;
    var inExpanded = inParam.row.CHILDEXPANDED;
    var rowTableData = viewTable.data;

    // need to find the section of the row ...
    var secLevel = 0;
    var totalRowCnt = 0;
    var sectionRows = null;
    var sectionStartRow = 0;
    var currentSectionRow = 0;
    var childLevelChk = [];

    for ( secLevel = 0; secLevel < rowTableData.length; secLevel += 1) {
        totalRowCnt = totalRowCnt + rowTableData[secLevel].rows.length;

        if (totalRowCnt >= (inParam.index + 1)) {
            sectionRows = rowTableData[secLevel].rows;
            sectionStartRow = totalRowCnt - sectionRows.length;
            currentSectionRow = inParam.index - sectionStartRow;
            break;
        }
    }
    var setViewHeight = (inExpanded)  ?  0  :  viewheight;
    var setImgHeight = (inExpanded)  ?  0  :  imageheight;
    var tCnt = 0;
    var tmpLevel = 0;
    var bCnt = 0;

    tCnt = currentSectionRow + 1;

    childLevelChk[inLevel] = (inExpanded)  ?  false  :  true;

    while (tCnt < sectionRows.length) {
        tmpLevel = sectionRows[tCnt].LEVEL;

        if (tmpLevel <= inLevel) {
            break;
        }
        childLevelChk[tmpLevel] = (childLevelChk[tmpLevel - 1])  ?  sectionRows[tCnt].CHILDEXPANDED  :  false;

        sectionRows[tCnt].height = setViewHeight;
        sectionRows[tCnt].children[0].height = setImgHeight;
        sectionRows[tCnt].EXPANDED = (inExpanded)  ?  false  :  true;
        bCnt = tCnt + 1;

        if (bCnt < sectionRows.length) {
            while (sectionRows[bCnt].LEVEL > tmpLevel) {
                // here is the complex one.... A child level can be expanded but a parent level can be collapsed so need to validate which it is ...
                childLevelChk[sectionRows[bCnt].LEVEL] = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?   sectionRows[bCnt].CHILDEXPANDED  :  false;
                var setRowHeight = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?  setViewHeight  :  0;
                var setImgRowHeight = (childLevelChk[sectionRows[bCnt].LEVEL - 1])  ?  setImgHeight  :  0;

                if (sectionRows[bCnt].EXPANDED) {
                    sectionRows[bCnt].height = setRowHeight;
                    sectionRows[bCnt].children[0].height = setImgRowHeight;
                }
                bCnt += 1;

                if (bCnt >= sectionRows.length) {
                    break;
                }
            }
        }
        tCnt = bCnt;
    }
    inParam.row.CHILDEXPANDED = (inExpanded)  ?  false  :  true;
    inParam.row.children[0].image = (inExpanded)  ?  plusImg  :  minusImg;

    return;
}



*/


var options = [{
	title : 'Home',
//	_window : 'TimelineViewScreen',
	icon : '\uf015'
}, {
	title : 'My Profile',
	// _window : 'MyProfile',
	icon : '\uf007'
}, /*{
 title : 'Create Organization',
 _window : 'CreateOrganisation',
 icon : '\uf0e8'
 },*/
{
	title : 'Join Team',
	// _window : 'AccessAndSearchScreen',
	icon : '\uf090'
}, {
	title : 'My Participant',
	// _window : 'MyChildScreen',
	icon : '\uf1ae'
}, {
	title : 'Teams',
	// _window : 'TeamScreen',
	icon : '\uf0c0'
}, /* {
 title : 'Groups',
 _window : 'GroupScreen',
 icon : '\uf0c0'
 }, */
{
	title : 'Drills',
	// _window : 'DrillScreen',
	icon : '\uf01d'
}, {
	title : 'Reports',
	// _window : 'ReportsNewScreen',
	icon : '\uf022'
}, {

	title : 'Support',
	_window : 'SupportScreen',
	icon : '\uf1cd'
}, {

	title : 'Logout',
	_window : '',
	icon : '\uf08b'
}];

var data = [];
_.each(Categories, function(option) {
	//Ti.API.info(JSON.stringify(option.Childrens));
	var image;
	var Id = option.Id;
	var Name = option.Name;
	var row = Ti.UI.createTableViewRow({
		height : 45,
		color : '#ffffff',
		backgroundSelectedColor : "#ff00ff",
		className : 'sideRow'
	});

	var icon = Ti.UI.createLabel({
		left : 2,
		color : '#ffffff',
		height : 40,
		width : 40,
		font : {
			fontFamily : "FontAwesome",
			fontSize : OS_IOS ? 20 : 25
		},
		text : option.icon,
		left : 10

	});
		row.add(icon);
	var title = Ti.UI.createLabel({
		color : '#ffffff',
		left : 60,
		height : 25,
		width : Ti.UI.SIZE,
		text : Name,
		rowId: Id,
		font : {
			fontFamily : "FontAwesome",
			fontSize : OS_IOS ? 13 : 16,
		}
	});
	var view = Ti.UI.createView({
		width : '100%',
		height : '100%',
		backgroundColor : 'transparent',
		top : 0,
		left : 0,
		//_window : option._window,
		name : Name,
		Id: Id
	});

	row.add(title);
	row.add(view);
	data.push(row);

});
//$.tableView.setData(data);

var newArray = [];
function checkArrayChildren(array){
	for(i = 0; i<= array.length - 1;i++){
		Ti.API.info("Categories[i] -------   " + JSON.stringify(array[i]));
		if(Categories[i].Childrens){
			Ti.API.info("Categories[i].Childrens---   " + JSON.stringify(array[i].Childrens));
		}
	}
}

