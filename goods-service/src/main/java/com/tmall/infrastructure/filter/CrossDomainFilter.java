package com.tmall.infrastructure.filter;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 跨域过滤器
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
public class CrossDomainFilter extends OncePerRequestFilter {

	private final static Logger logger = LoggerFactory.getLogger(CrossDomainFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		try {
			// 跨域
			String origin = request.getHeader("Origin");
			if (origin == null) {
				response.addHeader("Access-Control-Allow-Origin", "*");
			} else {
				response.addHeader("Access-Control-Allow-Origin", origin);
			}
			response.addHeader("Access-Control-Allow-Headers",
					"Origin, x-requested-with, Content-Type, Accept,X-Cookie, token");
			response.addHeader("Access-Control-Allow-Credentials", "true");
			response.addHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS,DELETE");
			if (request.getMethod().equals("OPTIONS")) {
				response.setStatus(HttpServletResponse.SC_OK);
				return;
			}
			filterChain.doFilter(request, response);
		} catch (Exception e) {
			logger.error("Exception in crossDomainFilter.doFilter", e);
			throw e;
		}
	}

	@Override
	public void destroy() {
	}

}