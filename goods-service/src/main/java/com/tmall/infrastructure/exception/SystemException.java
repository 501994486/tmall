package com.tmall.infrastructure.exception;

public class SystemException extends RuntimeException{
	// 错误码
	private Integer code;

	public SystemException(String message){
		super(message);
	}

	public SystemException(Integer code, String message){
		super(message);
		this.code = code;
	}

	public Integer getCode(){
		return code;
	}

	public void setCode(Integer code){
		this.code = code;
	}
}
