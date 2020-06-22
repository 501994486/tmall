package com.tmall.common.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

public class JsonUtil {

	public static String toJSONString(Object object) {
		return JSON.toJSONString(object, SerializerFeature.DisableCircularReferenceDetect);
	}

}