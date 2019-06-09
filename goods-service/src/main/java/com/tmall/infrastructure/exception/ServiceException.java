package com.tmall.infrastructure.exception;

public class ServiceException extends RuntimeException{
	// 错误码
	private Integer code;

	public ServiceException(String message){
		super(message);
	}

	public ServiceException(Integer code, String message){
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
