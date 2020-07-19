package com.tmall.infrastructure.init;

import com.tmall.common.AppConstants;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import java.lang.reflect.Field;


/**
 * All rights Reserved, Designed By technologyMall
 * @Description servlet初始化
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
@WebServlet(name = "initServlet")
public class SystemInitalize extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	public void init(ServletConfig config) throws ServletException {
		ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(config.getServletContext());

		initSystemVariable(context, config.getServletContext());

		super.init(config);
	}

	/**
	 * 将常量放到ApplicationContext中
	 * @param context
	 * @param sc
	 */
	public void initSystemVariable(ApplicationContext context, ServletContext sc) {
		try {
			Class clazz = Class.forName("com.tmall.common.AppConstants");
			try {
				for (Field field : clazz.getDeclaredFields()) {
					sc.setAttribute(AppConstants.SYMBOL_UNDERSCORE + field.getName(), field.get(clazz));
				}
			}
			catch (IllegalArgumentException e) {
				e.printStackTrace();
			}
			catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		catch (ClassNotFoundException e) {
			System.out.println("AppConstants not found!");
		}
	}

}