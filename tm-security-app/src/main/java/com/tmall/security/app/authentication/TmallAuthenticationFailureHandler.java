package com.tmall.security.app.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tmall.security.core.properties.LoginType;
import com.tmall.security.core.properties.SecurityProperties;
import com.tmall.security.core.support.SimpleResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class TmallAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	private static final Logger logger = LoggerFactory.getLogger(TmallAuthenticationFailureHandler.class);

	@Autowired
	private ObjectMapper objectMapper;

	
	@Autowired
	private SecurityProperties securityProperties;

	/**
	 * JSON格式的登陆失败处理(默认是跳转页面)
	 * @param request
	 * @param response
	 * @param exception
	 * @throws IOException
	 * @throws ServletException
	 */
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		logger.info("login fail");

		if (LoginType.JSON.equals(securityProperties.getBrowser().getLoginType())) {
			response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
			response.setContentType("application/json;charset=UTF-8");
//			response.getWriter().write(objectMapper.writeValueAsString(exception));
			response.getWriter().write(objectMapper.writeValueAsString(new SimpleResponse(exception.getMessage())));
		} else {
			super.onAuthenticationFailure(request, response, exception);
		}
	}

}
