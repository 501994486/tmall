package com.tmall.user.infrastructure.security;

import com.tmall.security.core.authorize.AuthorizeConfigProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;


@Component
public class DemoAuthorizeConfigProvider implements AuthorizeConfigProvider {

	/* (non-Javadoc)
	 * @see com.tmall.security.core.authorize.AuthorizeConfigProvider#config(org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer.ExpressionInterceptUrlRegistry)
	 */
	@Override
	public boolean config(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry config) {
		config
		.antMatchers("/user")
		.hasRole("ADMIN")
		.antMatchers("/demo.html")
		.hasRole("DEMO");
		return false;
	}

}
