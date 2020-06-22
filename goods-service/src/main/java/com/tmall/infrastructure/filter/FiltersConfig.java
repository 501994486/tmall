package com.tmall.infrastructure.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * All rights Reserved, Designed By technologyMall
 * @Description 自定义过滤器配置文件
 * @author sun.h
 * @date   2020年5月18日
 * @version V1.0
 */
@Configuration
public class FiltersConfig {

	@Bean
	public FilterRegistrationBean crossDomainFilterRegistration() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setOrder(Integer.MAX_VALUE);
		registration.setFilter(new CrossDomainFilter());
		registration.addUrlPatterns("/*");
		registration.setName("CrossDomainFilter");
		return registration;
	}

	/**
	 * 字符过滤
	 * @return
	 */
	@Bean
	public FilterRegistrationBean InitfilterRegistration() {
		FilterRegistrationBean registration = new FilterRegistrationBean();
		registration.setOrder(Integer.MAX_VALUE-1);
		registration.setFilter(new CharacterEncodingFilter());
		registration.addUrlPatterns("/no");
		registration.setName("Initfilter");
		return registration;
	}
}
