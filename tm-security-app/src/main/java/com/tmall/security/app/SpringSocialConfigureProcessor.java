package com.tmall.security.app;

import com.tmall.security.core.properties.SecurityConstants;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.social.security.SpringSocialConfigurer;
import org.springframework.stereotype.Component;

/**
 * Bean后处理器
 * @author Administrator
 *
 */
@Component
public class SpringSocialConfigureProcessor implements BeanPostProcessor {

	/* (non-Javadoc)
	 * @see org.springframework.beans.factory.config.BeanPostProcessor#postProcessBeforeInitialization(java.lang.Object, java.lang.String)
	 */
	@Override
	public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		System.out.println("bean执行之后");
		return bean;
	}

	/* (non-Javadoc)
	 * @see org.springframework.beans.factory.config.BeanPostProcessor#postProcessAfterInitialization(java.lang.Object, java.lang.String)
	 */
	@Override
	public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		System.out.println("bean 执行之前");
		if (StringUtils.equals(beanName, "imoocSocialSecurityConfig")) {
			SpringSocialConfigurer configurer = (SpringSocialConfigurer) bean;
			configurer.signupUrl(SecurityConstants.DEFAULT_SOCIAL_SIGNUP_URL);
			return configurer;
		}
		return bean;
	}

}
