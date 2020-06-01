package com.tmall.infrastructure.enums;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 注解枚举类
 * @author sun.h
 * @date   2019年7月11日
 * @version V1.0
 */
public enum AnnotationTypeEnum {
	CONTROLLER("SystemControllerLog","log"),
	SERVICE("SystemServiceLog","log");

	private final String name;
	private final String type;

	private AnnotationTypeEnum(String name, String type) {
		this.name = name;
		this.type = type;
	}


	public String getName() {
		return name;
	}

	public String getType() {
		return type;
	}


}
