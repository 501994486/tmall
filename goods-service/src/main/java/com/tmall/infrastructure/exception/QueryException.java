package com.tmall.infrastructure.exception;

public class QueryException extends RuntimeException{
	// 错误码
	private Integer code;

	public QueryException(String message){
		super(message);
	}

	public QueryException(Integer code, String message){
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
