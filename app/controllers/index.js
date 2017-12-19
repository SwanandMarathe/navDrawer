var screenWidth = Ti.Platform.displayCaps.xdpi;
var screenHeight = Ti.Platform.displayCaps.ydpi;
var sectionsData = [];
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
	"Id" : 124,
	"Name" : "Winter Wear"
}, {
	"Id" : 129,
	"Name" : "Men",
	"Childrens" : [{
		"Id" : 115,
		"Name" : "T-Shirts",
		"Childrens" : [{
			"Id" : 143,
			"Name" : "Polo Tees"
		}, {
			"Id" : 144,
			"Name" : "Graphic Tees"
		}, {
			"Id" : 145,
			"Name" : "Solid Tees"
		}]
	}, {
		"Id" : 146,
		"Name" : "Shirts"
	}, {
		"Id" : 147,
		"Name" : "Denims"
	}, {
		"Id" : 148,
		"Name" : "Trousers"
	}, {
		"Id" : 149,
		"Name" : "Blazers"
	}, {
		"Id" : 161,
		"Name" : "Jackets"
	}]
}, {
	"Id" : 130,
	"Name" : "Women",
	"Childrens" : [{
		"Id" : 132,
		"Name" : "Indian Ethnic Wear",
		"Childrens" : [{
			"Id" : 133,
			"Name" : "Kurtas And Kurtis"
		}, {
			"Id" : 134,
			"Name" : "Leggings And Churidar"
		}]
	}, {
		"Id" : 135,
		"Name" : "Party Dresses"
	}, {
		"Id" : 136,
		"Name" : "Casual Dresses"
	}, {
		"Id" : 137,
		"Name" : "Tops & T-Shirts"
	}, {
		"Id" : 138,
		"Name" : "Jackets & Shrugs"
	}, {
		"Id" : 139,
		"Name" : "Denims"
	}, {
		"Id" : 140,
		"Name" : "Skirts & Bottoms"
	}, {
		"Id" : 141,
		"Name" : "Shirts"
	}]
}, {
	"Id" : 152,
	"Name" : "New Arrivals",
	"Childrens" : [{
		"Id" : 131,
		"Name" : "Women"
	}, {
		"Id" : 142,
		"Name" : "Men"
	}]
}, {
	"Id" : 154,
	"Name" : "Offers",
	"Childrens" : [{
		"Id" : 155,
		"Name" : "Men",
		"Childrens" : [{
			"Id" : 156,
			"Name" : "Upto 40% Off"
		}, {
			"Id" : 157,
			"Name" : "Upto 60% Off"
		}]
	}, {
		"Id" : 158,
		"Name" : "Women",
		"Childrens" : [{
			"Id" : 159,
			"Name" : "Upto 40% Off"
		}, {
			"Id" : 160,
			"Name" : "Upto 60% Off"
		}]
	}]
}, {
	"Id" : 162,
	"Name" : "Fashion Blogs"
}, {
	"Id" : 163,
	"Name" : "Hot",
	"Childrens" : [{
		"Id" : 167,
		"Name" : "Men"
	}, {
		"Id" : 168,
		"Name" : "Women"
	}]
}, {
	"Id" : 169,
	"Name" : "Shop By Price",
	"Childrens" : [{
		"Id" : 170,
		"Name" : "Women"
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
function BuildRowdata(inParam, level) {
	console.log(inParam);
	var row = Ti.UI.createTableViewRow({
		height : 45,
		color : '#ffffff',
		backgroundSelectedColor : "#ff00ff",
		className : 'sideRow',
		rowId : inParam.Id,
		rowData : inParam,
		isParent : inParam.Childrens ? true : false,
		Expanded : false,
		Level : level,
		childCount : inParam.Childrens ? inParam.Childrens.length : 0
	});
	row.addEventListener('click', rowClick);
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
		rowId : inParam.Id,
		rowData : inParam,
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
		Id : inParam.Id
	});

	row.add(title);
	row.add(view);
	return row;
}

processData();

function processData() {
	var dCnt = 0;
	printList(Categories);
	var tableData = [];
	for ( dCnt = 0; dCnt < Categories.length; dCnt += 1) {
		//    	Ti.API.info('dCnt'+dCnt);
		var sectionView = Ti.UI.createView({
			top : 0,
			left : 0,
			right : 0,
			height : 33,
			backgroundGradient : {
				type : 'linear',
				colors : [{
					color : '#818181',
					offset : 0.0
				}, {
					color : '#B2B2B2',
					offset : 0.12
				}, {
					color : '#C3C3C3',
					offset : 0.85
				}]
			}
		});
		var sectionViewLabel = Ti.UI.createLabel({
			top : 0,
			left : 0,
			width : '100%',
			height : '100%',
			text : '  ' + Categories[dCnt].Name,
			sectionData : Categories[dCnt].Childrens ? Categories[dCnt].Childrens : "",
			textAlign : 'left',
			color : "#ffffff",
			font : {
				fontSize : 14,
				fontWeight : 'bold'
			},
			secValue : dCnt,
			EXPANDED : false
		});
		sectionView.add(sectionViewLabel);
		//        sectionView.addEventListener('touchend', sectionProcess);

		var section = Ti.UI.createTableViewSection({
			headerView : sectionView
		});
		var rCnt = 0;
		tableData.push(BuildRowdata(Categories[dCnt], 0));
		if (Categories[dCnt].Childrens) {
			while (rCnt <= Categories[dCnt].Childrens.length - 1) {
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
		//   sectionsData.push(section);
	}
	$.tableView.setData(tableData);
	return;
}

function rowClick(e) {
	//	alert(e.index);

	var rowdata = e.row.rowData.rowData;
	//	console.log(JSON.stringify(rowdata.Childrens));

	if (e.row.isParent) {
		if (!e.row.Expanded) {
			ExpandRow(e);
			/*if (rowdata.Childrens) {
			 var rowChildrenArray = rowdata.Childrens;
			 for (var i = 0; i <= rowChildrenArray.length - 1; i++) {
			 $.tableView.insertRowAfter(e.index + i, BuildRowdata(rowChildrenArray[i]));
			 };
			 e.row.Expanded = true;
			 }*/
		} else {
			//alert(e.row.childCount);
			var rows = $.tableView.data;
			//console.log((rows[0].rows[e.index]));
			var deleteChildCount = e.row.childCount;
			e.row.Expanded = false;
			var i = 1;
			for (var i = 1; i <= deleteChildCount; i++) {
				//console.log("i = " + i + " -  deleteChildCount  - " + deleteChildCount);
				//console.log('e.index + i  ' + (e.index + i));

				//alert(i);
				if (rows[0].rows[e.index + 1].Expanded == true) {
					deleteChildCount += rows[0].rows[e.index + 1].childCount;
				}
				$.tableView.deleteRow(e.index + 1);
			};
//			var i = 1;
			// var inter = setInterval(function(e) {
// 
				// if (i <= deleteChildCount) {
// 
					// if (rows[0].rows[e.index + i].Expanded == true) {
						// deleteChildCount += rows[0].rows[e.index + i].childCount;
					// }
					// $.tableView.deleteRow(e.index + 1);
					// i++;
// 
				// } else {
					// clearInterval(inter);
				// }
			// }, 500);
		}
	}
}

function ExpandRow(e) {
	var rowdata = e.row.rowData.rowData;
	var rowChildrenArray = rowdata.Childrens;
	Ti.API.info("level", JSON.stringify(e.row.rowData));
	var parentLevel = e.row.rowData.Level;
	for (var i = 0; i <= rowChildrenArray.length - 1; i++) {
		// Ti.API.info("level",JSON.stringify(rowChildrenArray[i]));

		$.tableView.insertRowAfter(e.index + i, BuildRowdata(rowChildrenArray[i]), parentLevel + 1);
	};
	e.row.Expanded = true;
}

//console.log(array);
$.index.open();
