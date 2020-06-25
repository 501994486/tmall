function changeShowValue(gridId, ids) {
	// 动态设置【生年】【生月】【生日】显示的值 （【生年 = 数值 + "年"】, 【生月 = 数值 + "月"】, 【生日 = 数值 + "日"】）
	for (var i = 0; i < ids.length; i ++) {
		var id = ids[i];
		var yearValue = gridId.getCell(id, "A15"),
			monthValue = gridId.getCell(id, "A14"),
			dayValue = gridId.getCell(id, "A13"),
			sexTwo = gridId.getCell(id, "A27"),
			sexThree = gridId.getCell(id, "A28");
		if (yearValue && yearValue != "") {
			gridId.jqGrid('setRowData', id, {"A15": yearValue + "<m>年</m>"});
		}
		if (monthValue && monthValue != "") {
			gridId.jqGrid('setRowData', id, {'A14': monthValue + "<m>月</m>"});
		}
		if (dayValue && dayValue != "") {
			gridId.jqGrid('setRowData', id, {'A13': dayValue + "<m>日</m>"});
		}
		if (sexThree && sexThree != "") {
			var showValue = "";
			if (sexThree == '0') {
				showValue = "<m>男性</m>";
			}
			else if (sexThree == "1") {
				showValue = "<m>女性</m>";
			}
			else if (sexThree == "2") {
				showValue = "<m>どちらでもない</m>";
			}
			gridId.jqGrid('setRowData', id, {'A28': showValue});
		}
		if (sexTwo && sexTwo != "") {
			var showValue = "";
			if (sexTwo == '0') {
				showValue = "<m>男性</m>";
			}
			else if (sexTwo == "1") {
				showValue = "<m>女性</m>";
			}
			gridId.jqGrid('setRowData', id, {'A27': showValue});
		}
	}
}