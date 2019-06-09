package com.tmall;

import com.tm.technologyMall.AppConstants;
import com.tm.technologyMall.DetabaseUtils;

public class TestCommon {
	public static void main(String[] args) {
		String input = AppConstants.HTML_INPUT_FILE;
		DetabaseUtils.convertDomainFieldToColumnName("a");
	}
}
