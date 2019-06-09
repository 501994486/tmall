package com.tmall.application.assembler;

import com.tmall.infrastructure.enums.ResultEnum;
import com.tmall.ui.dto.ResultBean;

public class ResultAssembler {

	/** 操作成功的处理流程 */
	public static ResultBean getSuccess(Object object){
		ResultBean ResultBean = new ResultBean();
		//设置操作成功的返回码
		ResultBean.setCode(ResultEnum.SYSTEM_EXCEPTION.getCode());
		//设置操作成功的消息
		ResultBean.setMsg(ResultEnum.SYSTEM_EXCEPTION.getMsg());
		ResultBean.setData(object);
		return ResultBean;
	}

	/** 重载返回成功的方法，因为有时候我们不需要任何的消息数据被返回*/
	public static ResultBean getSuccess(){
		return getSuccess(null);
	}

	/**
	 * 操作失败的处理流程
	 * @param code 错误码
	 * @param msg 错误消息
	 * @param o   错误数据
	 * @return
	 */
	public static ResultBean getError(Integer code, String msg, Object o){
		ResultBean ResultBean = new ResultBean();
		ResultBean.setCode(code);
		ResultBean.setMsg(msg);
		ResultBean.setData(o);
		return ResultBean;
	}

	/**
	 * 重载，操作失败的方法（因为操作失败一般都不需要返回数据内容）
	 * @param code
	 * @param msg
	 * @return
	 */
	public static ResultBean getError(Integer code,String msg){
		return getError(code, msg, null);
	}
}
