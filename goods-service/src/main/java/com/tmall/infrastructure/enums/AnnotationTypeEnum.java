package com.tmall.infrastructure.enums;

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
