package com.tmall;

import com.tmall.domain.entity.Goods;

import java.lang.reflect.InvocationTargetException;

public class TestCommon {
	public static void main(String[] args) throws InvocationTargetException, IllegalAccessException {
		/*String input = AppConstants.HTML_INPUT_FILE;
		DetabaseUtils.convertDomainFieldToColumnName("a");*/

		Goods goods = new Goods();
		goods.setSpuId((long)1);

		System.out.println("1");
	}
}
