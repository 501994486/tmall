package com.tmall.infrastructure.interceptor;

import com.tmall.common.utils.DateTimeUtils;
import com.tmall.common.utils.LogUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 用于输出方法调用前后的时间
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
public class LoginTimeInterceptor extends HandlerInterceptorAdapter {

	private final static Logger logger = LoggerFactory.getLogger(LoginTimeInterceptor.class);

	//在控制器执行前调用
	public boolean preHandle(HttpServletRequest request,
							 HttpServletResponse response, Object handler) throws Exception {
		Timestamp currentTime = DateTimeUtils.getCurrentTimestamp();
		LogUtils.writeInfoLog(logger,LoginTimeInterceptor.class,"preHandle","方法开始执行:"+currentTime);
		return true;
	}
	//在后端控制器执行后调用
	public void postHandle(HttpServletRequest request,
						   HttpServletResponse response, Object handler,
						   ModelAndView modelAndView) throws Exception {
		Timestamp currentTime = DateTimeUtils.getCurrentTimestamp();
		LogUtils.writeInfoLog(logger,LoginTimeInterceptor.class,"preHandle","后端控制器执行完成:"+currentTime);
	}
	//整个请求执行完成后调用
	public void afterCompletion(HttpServletRequest request,
								HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		Timestamp currentTime = DateTimeUtils.getCurrentTimestamp();
		LogUtils.writeInfoLog(logger,LoginTimeInterceptor.class,"preHandle","请求调用完成:"+currentTime);
		super.afterCompletion(request, response, handler, ex);
	}
}