package com.tmall.infrastructure.exception;

public class UnKnownException  extends RuntimeException{
	// 错误码
	private Integer code;

	public UnKnownException(String message){
		super(message);
	}

	public UnKnownException(Integer code, String message){
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
