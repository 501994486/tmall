package com.tmall.technologyMall.utils;

import org.apache.commons.lang3.StringUtils;

/**
 * All rights Reserved, Designed By technologyMall
 * @Title:  DetabaseUtils
 * @Package com.tm.technologyMall
 * @Description 用于处理java与数据库字段关系的工具类
 * @author sun.h
 * @date   2019年5月20日
 * @version V1.0
 */
public class DetabaseUtils {

	/**
	 * 把实体属性转换成数据库中对应的列名.
	 * @param property 实体属性
	 * @return
	 */
	public static String convertDomainFieldToColumnName(String property) {
		if (!StringUtils.isBlank(property)) {
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < property.length(); i++) {
				char c = property.charAt(i);
				if (i == 0) {
					c = Character.toLowerCase(c);
					sb.append(c);
				}
				else {
					if (Character.isUpperCase(c)) {
						sb.append("_" + Character.toLowerCase(c));
					}
					else {
						sb.append(c);
					}
				}
			}
			return sb.toString();
		}
		return null;
	}

	/**
	 * 转义LIKE查询中的 wildcard characters.
	 * @param str
	 * @return
	 */
	public static String escapeWildcardForLikeOperator(String str) {
		String temp = "";
		for (int i = 0; i < str.length(); i++) {
			if (str.charAt(i) == '%' || str.charAt(i) == '_') {
				temp += "\\" + str.charAt(i);
			}
			else {
				temp += str.charAt(i);
			}
		}
		return temp;
	}
}
