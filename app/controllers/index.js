
var screenWidth = Ti.Platform.displayCaps.xdpi;
var	screenHeight = Ti.Platform.displayCaps.ydpi;
var sectionsData=[];
// Animation to show sidebar
var showSideBar = Ti.UI.createAnimation({
	left : 0,
	duration : 500
});

// Animation to hide sidebar
var hideSideBar = Ti.UI.createAnimation({
	left : '-' + screenWidth,
	duration : 500
});

/**
 * this closes the window when user taps on anywhere in screen, apart form the menu
 * @param {Object} e
 */
function closeWin(e) {
	$.SideBarScreen.animate(hideSideBar);
}
var Categories = [{
  "Id": 124,
  "Name": "Winter Wear"
}, {
  "Id": 129,
  "Name": "Men",
  "Childrens": [{
    "Id": 115,
    "Name": "T-Shirts",
    "Childrens": [{
      "Id": 143,
      "Name": "Polo Tees"
    }, {
      "Id": 144,
      "Name": "Graphic Tees"
    }, {
      "Id": 145,
      "Name": "Solid Tees"
    }]
  }, {
    "Id": 146,
    "Name": "Shirts"
  }, {
    "Id": 147,
    "Name": "Denims"
  }, {
    "Id": 148,
    "Name": "Trousers"
  }, {
    "Id": 149,
    "Name": "Blazers"
  }, {
    "Id": 161,
    "Name": "Jackets"
  }]
}, {
  "Id": 130,
  "Name": "Women",
  "Childrens": [{
    "Id": 132,
    "Name": "Indian Ethnic Wear",
    "Childrens": [{
      "Id": 133,
      "Name": "Kurtas And Kurtis"
    }, {
      "Id": 134,
      "Name": "Leggings And Churidar"
    }]
  }, {
    "Id": 135,
    "Name": "Party Dresses"
  }, {
    "Id": 136,
    "Name": "Casual Dresses"
  }, {
    "Id": 137,
    "Name": "Tops & T-Shirts"
  }, {
    "Id": 138,
    "Name": "Jackets & Shrugs"
  }, {
    "Id": 139,
    "Name": "Denims"
  }, {
    "Id": 140,
    "Name": "Skirts & Bottoms"
  }, {
    "Id": 141,
    "Name": "Shirts"
  }]
}, {
  "Id": 152,
  "Name": "New Arrivals",
  "Childrens": [{
    "Id": 131,
    "Name": "Women"
  }, {
    "Id": 142,
    "Name": "Men"
  }]
}, {
  "Id": 154,
  "Name": "Offers",
  "Childrens": [{
    "Id": 155,
    "Name": "Men",
    "Childrens": [{
      "Id": 156,
      "Name": "Upto 40% Off"
    }, {
      "Id": 157,
      "Name": "Upto 60% Off"
    }]
  }, {
    "Id": 158,
    "Name": "Women",
    "Childrens": [{
      "Id": 159,
      "Name": "Upto 40% Off"
    }, {
      "Id": 160,
      "Name": "Upto 60% Off"
    }]
  }]
}, {
  "Id": 162,
  "Name": "Fashion Blogs"
}, {
  "Id": 163,
  "Name": "Hot",
  "Childrens": [{
    "Id": 167,
    "Name": "Men"
  }, {
    "Id": 168,
    "Name": "Women"
  }]
}, {
  "Id": 169,
  "Name": "Shop By Price",
  "Childrens": [{
    "Id": 170,
    "Name": "Women"
  }]
}];
/*
var Categories = [
  {
    "Id": 124,
    "Name": "Winter Wear",
    sectionNum : 1,
  },
  {
    "Id": 129,
    "Name": "Men",
   	sectionNum: 2,
    child:true,
    "Childrens": [
      {
        "Id": 115,
        "Name": "T-Shirts",
        level:  1,
        child: true,
        "Childrens": [
          {
            "Id": 143,
            "Name": "Polo Tees",
            level:  2,
            child: false
          },
          {
            "Id": 144,
            "Name": "Graphic Tees",
            level:  2,
            child: false
          },
          {
            "Id": 145,
            "Name": "Solid Tees",
            level:  2,
            child: false
          }
        ]
      },
      {
        "Id": 146,
        "Name": "Shirts",
        level:  1,
        child: false
      },
      {
        "Id": 147,
        "Name": "Denims",
        level:  1,
        child: false
      },
      {
        "Id": 148,
        "Name": "Trousers",
        level:  1,
        child: false
      },
      {
        "Id": 149,
        "Name": "Blazers",
        level:  1,
        child: false
      },
      {
        "Id": 161,
        "Name": "Jackets",
        level:  1,
        child: false
      }
    ]
  }];
*/
function BuildRowdata(inParam){
		var row = Ti.UI.createTableViewRow({
		height : 45,
		color : '#ffffff',
		backgroundSelectedColor : "#ff00ff",
		className : 'sideRow'
	});

	// var icon = Ti.UI.createLabel({
		// left : 2,
		// color : '#ffffff',
		// height : 40,
		// width : 40,
		// font : {
			// fontFamily : "FontAwesome",
			// fontSize : OS_IOS ? 20 : 25
		// },
		// text : option.icon,
		// left : 10
// 
	// });
		// row.add(icon);
	var title = Ti.UI.createLabel({
		color : '#ffffff',
		left : 60,
		height : 25,
		width : Ti.UI.SIZE,
		text : inParam.Name,
		rowId: inParam.Id,
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
		name : inParam.Name,
		 Id: inParam.Id
	});

	row.add(title);
	row.add(view);
	return row;
}

processData();

function processData() {
    var dCnt = 0;
	printList(Categories);
    for (dCnt = 0; dCnt < Categories.length; dCnt += 1) {
    	Ti.API.info('dCnt'+dCnt);
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
            sectionData: Categories[dCnt].Childrens ? Categories[dCnt].Childrens : "",
            textAlign:  'left',
            color:  "#ffffff",
            font: {
                fontSize:  14,
                fontWeight:  'bold'
            },
            secValue:  dCnt,
            EXPANDED:  false
        });
        sectionView.add(sectionViewLabel);
        sectionView.addEventListener('touchend', sectionProcess);

        var section = Ti.UI.createTableViewSection({
            headerView:  sectionView
        });
        var rCnt = 0;
        if(Categories[dCnt].Childrens){
	         while (rCnt <= Categories[dCnt].Childrens.length-1) {
	         	//var rowArray = checkArrayChildren(Categories[dCnt].Childrens);
	         //	Ti.API.info('rowArray',JSON.stringify(rowArray));
	         //	section.add(BuildRowdata(Categories[dCnt].Childrens[rCnt]));
	         	// checkArrayChildren(Categories[dCnt].Childrens);
	         	// if(innerRows){
	         		// section.add(innerRows);
	         	// }
	            // Ti.API.info("rcnt="+rCnt+"json" +JSON.stringify(Categories[dCnt].Childrens.length));
	             rCnt += 1;
	            // dCnt +=1;
	         }
        }
        sectionsData.push(section);
    }
    $.tableView.setData(sectionsData);
    return;
}

function sectionProcess(inParam){
	Ti.API.info("sectionClicked:::::: "+ JSON.stringify(inParam));
	var sectionArrayData = Categories[inParam.source.secValue];
	var sectionIndex = inParam.source.secValue;
//	Ti.API.info('i==' + JSON.stringify(sectionArrayData));
	var sections = $.tableView.data;
	Ti.API.info('i===' + JSON.stringify(sections[sectionIndex]));
	if(sectionArrayData.Childrens && sectionArrayData.EXPANDED != true){
		for (var i=0; i < sectionArrayData.Childrens.length-1; i++) {
		  appendRowToSection($.tableView, BuildRowdata(sectionArrayData.Childrens[i]), inParam.source.secValue);
		 // Ti.API.info('i==' + i);
		};
		//inParam.source.ISEXPANDED = true;
	}
	
	
}

function appendRowToSection(tableView, row, sectionIndex) {
        var sections = tableView.data;
        if (!sections || sections.length < sectionIndex || isNaN(+sectionIndex)) {
            return;
        }
        sections[sectionIndex].EXPANDED = true;
        sections[sectionIndex].add(row);
        Ti.API.info(JSON.stringify(sections[sectionIndex]));
        tableView.setData(sections);
    }















var array = [];
function printList(items) {
  switch (items) {
    case "object":
      getChildren(items);
      break;
    case "string":
      array.push(items);
      //console.log(items);
      break;
    case "array":
      printArray(items);
      break;
  }
  alert(JSON.stringify(array));
}

function getChildren(parent) {
  for (var child in parent) {
    //console.log(child);
    array.push(child);
    printList(parent[child]);
    array.push("</ul></li>");
  }
  
}

function printArray(myArray) {
  for (var i = 0; i < myArray.length; i++) {
    console.log(myArray[i]);
    array.push(myArray[i].Name);
    if (myArray[i].Childrens) {
    	array.push("child:"+ myArray[i].Childrens.length);
  		printArray(myArray[i].Childrens);
      //for(var j = 0; j < myArray[i].Childrens.length; j++){
      //array.push("<li>" + myArray[i].Childrens[j].Name + "</li>");
    //}
  }
}
}
printList(Categories);
//console.log(array);
$.index.open();
