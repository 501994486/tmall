package com.tmall.infrastructure.exception;

import com.tmall.application.assembler.ResultAssembler;
import com.tmall.infrastructure.enums.ResultEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * All rights Reserved, Designed By technologyMall
 * @Title:  ErrorCommonController
 * @Package com.tmall.infrastructure.exception
 * @Description 全局错误页面的 Controller
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
public class ErrorCommonController {

	private final static Logger logger = LoggerFactory.getLogger(ErrorCommonController.class);


	@RequestMapping("/common/error/valid-error-handler-for-json")
	@ResponseBody
	public Object validErrorHandlerForJson(HttpServletRequest request, HttpServletResponse response) {
		response.setStatus(HttpServletResponse.SC_OK);
		return 	ResultAssembler.getError(ResultEnum.PARAM_EXCEPTION.getCode(),ResultEnum.PARAM_EXCEPTION.getMsg());
	}

	@RequestMapping("/common/error/valid-error-handler")
	public String validErrorHandler(Map<String, Object> uiDataMap, HttpServletRequest request, HttpServletResponse response) {
		return "forward:/common/error/internal-server-error";
	}

	/**
	 * 发生程序内部异常500
	 * @param uiDataMap
	 * @param request
	 * @param res
	 * @return
	 */
	@RequestMapping("/common/error/internal-server-error")
	public String errorInternalServer(Map<String, Object> uiDataMap, HttpServletRequest request, HttpServletResponse res) {
		return "500error";
	}

	/**
	 * 页面未找到异常404
	 * @param request
	 * @param res
	 * @return
	 */
	@RequestMapping("/common/error/custom-error-page-not-found")
	public String customErrorPageNotFound(HttpServletRequest request, HttpServletResponse res) {
		return "404error";
	}
}
