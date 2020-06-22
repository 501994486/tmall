package com.tmall.infrastructure.interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 自定义拦截器配置文件
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
@Configuration
public class InterceptorsConfig implements WebMvcConfigurer {
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		//拦截的路径
		String[] addPathPatterns = {"/**"};
		//不拦截的路径
		String [] excludePathPatterns = {};
		//这里可以添加多个拦截器
		registry.addInterceptor(new LoginTimeInterceptor()).addPathPatterns(addPathPatterns).excludePathPatterns(excludePathPatterns);

	}

}