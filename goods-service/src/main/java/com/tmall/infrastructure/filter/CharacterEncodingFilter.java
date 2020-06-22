package com.tmall.infrastructure.filter;


import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 字符过滤器(去除前后空格和编码过滤)
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
public class CharacterEncodingFilter implements Filter {
	static final String ENCODEING_UTF8 = "UTF-8";
	private String encoding = ENCODEING_UTF8;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		String encodingParam = filterConfig.getInitParameter("encode");
		if (encoding != null) {
			this.encoding = encodingParam;
		}
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp,
						 FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;

		request.setCharacterEncoding(encoding);
		response.setContentType("text/html;charset=" + encoding);
		response.setCharacterEncoding(encoding);
		chain.doFilter(new CharacterEncodingRequest(request), response);
	}

	@Override
	public void destroy() {

	}
}

/**
 * 对参数值做trim处理，并对Get方式传值转为UTF-8编码.
 */
class CharacterEncodingRequest extends HttpServletRequestWrapper {
	static final String ENCODEING_ISO8859_1 = "ISO-8859-1";
	static final String HTTP_GET_METHOD = "get";

	private HttpServletRequest request = null;

	public CharacterEncodingRequest(HttpServletRequest request) {
		super(request);
		this.request = request;
	}

	@Override
	public String getParameter(String name) {
		String value = super.getParameter(name);
		if (value == null) {
			return null;
		}

		String method = request.getMethod();
		if (HTTP_GET_METHOD.equalsIgnoreCase(method)) {
			try {
				// GET 方式，把参数值转为UTF-8编码
				value = new String(value.getBytes(ENCODEING_ISO8859_1), request.getCharacterEncoding());
			}
			catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}

		// 去掉两边的空格
		return value.trim();
	}
}
