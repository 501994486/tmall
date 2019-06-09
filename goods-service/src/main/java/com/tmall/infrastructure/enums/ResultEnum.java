package com.tmall.infrastructure.enums;

public enum ResultEnum{
	SUCCESS(200,"成功"),

	/**系统异常. ErrorCode : -1  */
	SYSTEM_EXCEPTION(500,"系统异常"),

	/**系统异常. ErrorCode : -1  */
	NO_FOUND(404,"输入的链接有误"),

	/**未知异常. ErrorCode : 01*/
	UN_KNOWN_EXCEPTION(01,"未知异常"),

	/** 服务异常. ErrorCode : 02 */
	SERVICE_EXCEPTION(02,"服务异常"),

	/**查询异常. ErrorCode : 03*/
	QUERY_EXCEPTION(03,"查询异常"),

	/**数据库操作异常. ErrorCode : 05 */
	DB_EXCEPTION(05,"数据库操作异常"),

	/**参数验证错误. ErrorCode : 06*/
	PARAM_EXCEPTION(06,"参数验证错误"),

	/**权限验证错误. ErrorCode : 101*/
	NO_LOGIN(101,"未登录"),

	/**权限验证错误. ErrorCode : 101*/
	NO_PERMISSION(102,"无权限"),

	USERNAME_EXIST(103,"用户已存在");

	private Integer code;

	private String msg;

	ResultEnum(Integer code,String msg){
		this.code = code;
		this.msg = msg;
	}

	public Integer getCode(){
		return code;
	}

	public String getMsg(){
		return msg;
	}
}
