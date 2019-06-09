package com.tmall.infrastructure.exception;

public class DBException extends RuntimeException{
	// 错误码
	private Integer code;

	public DBException(String message){
		super(message);
	}

	public DBException(Integer code, String message){
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
