package com.tmall.infrastructure.exception;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 用于捕获404错误并将请求转发至ErrorCommonController
 * @author sun.h
 * @date   2019年5月18日
 * @version V1.0
 */
@Controller
public class NoFoundExceptionHandler implements ErrorController {
	@Override
	public String getErrorPath() {
		return "/error";
	}

	@RequestMapping(value = "/error")
	public String error(HttpServletResponse resp, HttpServletRequest req) {
		// 错误处理逻辑
		return "forward:/common/error/custom-error-page-not-found";
	}
}

