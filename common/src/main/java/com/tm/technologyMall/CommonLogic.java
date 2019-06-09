package com.tm.technologyMall;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;

/**
 * All rights Reserved, Designed By technologyMall
 * @Title:  CommonLogic
 * @Package com.tm.technologyMall
 * @Description 项目通用业务处理
 * @author sun.h
 * @date   2019年5月20日
 * @version V1.0
 */
public class CommonLogic {

	/**
	 * 从JSON格式的字符串里以Key取得VALUE.
	 * @param jsonString
	 * @param key
	 * @return
	 */
	public static String getJsonValue(String jsonString, String key) {
		if (StringUtils.isNotEmpty(jsonString)) {
			try{
				ObjectMapper mapper = new ObjectMapper();
				JsonNode node = mapper.readTree(jsonString);
				if (node.get(key) != null) {
					return node.get(key).toString();
				}
			}catch(Exception e){
				return StringUtils.EMPTY;
			}
		}
		return StringUtils.EMPTY;
	}

	/**
	 * 如果Obj为空，返回空字符串；非空时，Obj转成字符串返回.
	 * @param obj
	 */
	public static String defaultString(Object obj) {
		String result = StringUtils.EMPTY;
		if (obj != null) {
			result = StringUtils.trim(StringUtils.defaultString(String.valueOf(obj)));
		}
		return result;
	}
	
}
