package com.tmall.security.core.validate;

import com.tmall.security.core.properties.SecurityConstants;
import com.tmall.security.core.properties.ValidateCodeType;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class ValidateCodeFilter extends OncePerRequestFilter implements InitializingBean {
	private static final Logger logger = LoggerFactory.getLogger(ValidateCodeFilter.class);
	// 验证码校验失败处理器
	@Autowired
	private AuthenticationFailureHandler authenticationFailureHandler;

	// 校验码处理器
	@Autowired
	private ValidateCodeProcessorHolder validateCodeProcessorHolder;

	// 存放需要校验码的url
	private Map<String, ValidateCodeType> urlMap = new HashMap<>();

	// 验证请求url与配置的url是否匹配的工具类
	private AntPathMatcher antPathMatcher = new AntPathMatcher();

	public AuthenticationFailureHandler getAuthenticationFailureHandler() {
		return authenticationFailureHandler;
	}

	public void setAuthenticationFailureHandler(AuthenticationFailureHandler authenticationFailureHandler) {
		this.authenticationFailureHandler = authenticationFailureHandler;
	}

	/**
	 * 初始化要拦截的url配置信息
	 * @throws ServletException
	 */
	@Override
	public void afterPropertiesSet() throws ServletException {
		super.afterPropertiesSet();
		urlMap.put(SecurityConstants.DEFAULT_LOGIN_PROCESSING_URL_FORM, ValidateCodeType.IMAGE);
		urlMap.put(SecurityConstants.DEFAULT_LOGIN_PROCESSING_URL_MOBILE, ValidateCodeType.SMS);
	}

	/**
	 * 校验验证码，交予processor进行验证
	 * @param request
	 * @param response
	 * @param filterChain
	 * @throws ServletException
	 * @throws IOException
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request,HttpServletResponse response,
									FilterChain filterChain)throws ServletException, IOException {
		// 获取验证码的类型
		ValidateCodeType validateCodeType = getValidateCodeType(request);

		// 非空就是需要校验
		if (validateCodeType != null) {
			logger.info("校验请求(" + request.getRequestURI() + ")中的验证码，验证码类型为" + validateCodeType);
			try {
				validateCodeProcessorHolder.findValidateCodeProcessor(validateCodeType).validate(new ServletWebRequest(request, response));
			} catch (ValidateCodeException e) {
				authenticationFailureHandler.onAuthenticationFailure(request, response, e);
				return;
			}
		}

		filterChain.doFilter(request, response);
	}

	/**
	 * 获取校验码的类型
	 * @param request
	 * @return
	 */
	private ValidateCodeType getValidateCodeType(HttpServletRequest request) {
		ValidateCodeType validateCodeType = null;
		// get方法不校验
		if (StringUtils.equalsIgnoreCase(request.getMethod(), "get")) {
			return validateCodeType;
		}
		for (String url : urlMap.keySet()) {
			if (antPathMatcher.match(url, request.getRequestURI())) {
				validateCodeType = urlMap.get(url);
				break;
			}
		}
		return validateCodeType;
	}
}
