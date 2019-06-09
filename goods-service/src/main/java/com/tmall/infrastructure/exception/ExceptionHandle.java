package com.tmall.infrastructure.exception;

import com.tmall.application.assembler.ResultAssembler;
import com.tmall.infrastructure.enums.ResultEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ExceptionHandle {

	//增加异常日志打印   
	private final static Logger logger = LoggerFactory.getLogger(ExceptionHandle.class);

	//设置异常错误的页面
	public static final String DEFAULT_ERROR_VIEW_404 = "error404";

	public static final String DEFAULT_ERROR_VIEW_500 = "error500";

	@ExceptionHandler(value = QueryException.class)
	@ResponseBody
	public Object QueryExceptionHandler(HttpServletRequest req, QueryException e) throws Exception {
		logger.error("【查询异常】={}",e);
		return ResultAssembler.getError(ResultEnum.QUERY_EXCEPTION.getCode(),ResultEnum.QUERY_EXCEPTION.getMsg());
	}

	@ExceptionHandler(value = ServiceException.class)
	@ResponseBody
	public Object ServiceExceptionHandler(HttpServletRequest req, ServiceException e) throws Exception {
		logger.error("【服务异常】={}",e);
		return ResultAssembler.getError(ResultEnum.SERVICE_EXCEPTION.getCode(),ResultEnum.SERVICE_EXCEPTION.getMsg());
	}

	@ExceptionHandler(value = DBException.class)
	@ResponseBody
	public Object DBExceptionHandler(HttpServletRequest req, DBException e) throws Exception {
		logger.error("【数据库异常】={}",e);
		return ResultAssembler.getError(ResultEnum.DB_EXCEPTION.getCode(),ResultEnum.DB_EXCEPTION.getMsg());
	}

	@ExceptionHandler(value = UnKnownException.class)
	@ResponseBody
	public Object UnKnownExceptionHandler(HttpServletRequest req, UnKnownException e) throws Exception {
		logger.error("【未知异常】={}",e);
		return ResultAssembler.getError(ResultEnum.UN_KNOWN_EXCEPTION.getCode(),ResultEnum.UN_KNOWN_EXCEPTION.getMsg());
	}
}