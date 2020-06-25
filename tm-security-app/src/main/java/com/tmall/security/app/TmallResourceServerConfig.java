package com.tmall.security.app;

import com.tmall.security.app.social.openid.OpenIdAuthenticationSecurityConfig;
import com.tmall.security.core.authentication.mobile.SmsCodeAuthenticationSecurityConfig;
import com.tmall.security.core.authorize.AuthorizeConfigManager;
import com.tmall.security.core.properties.SecurityConstants;
import com.tmall.security.core.properties.SecurityProperties;
import com.tmall.security.core.validate.config.ValidateCodeSecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.social.security.SpringSocialConfigurer;

/**
 * 资源服务器
 */
@Configuration
@EnableResourceServer
public class TmallResourceServerConfig extends ResourceServerConfigurerAdapter {

	@Autowired
	private SecurityProperties securityProperties;

	@Autowired
	protected AuthenticationSuccessHandler imoocAuthenticationSuccessHandler;

	@Autowired
	protected AuthenticationFailureHandler imoocAuthenticationFailureHandler;

	@Autowired
	private SmsCodeAuthenticationSecurityConfig smsCodeAuthenticationSecurityConfig;

	@Autowired
	private SpringSocialConfigurer imoocSocialSecurityConfig;

	@Autowired
	private ValidateCodeSecurityConfig validateCodeSecurityConfig;

	@Autowired
	private AuthorizeConfigManager authorizeConfigManager;

	@Autowired
	private OpenIdAuthenticationSecurityConfig openIdAuthenticationSecurityConfig;

	@Override
	public void configure(HttpSecurity http) throws Exception {

		http.formLogin()
				.loginPage(SecurityConstants.DEFAULT_UNAUTHENTICATION_URL)
				.loginProcessingUrl(SecurityConstants.DEFAULT_LOGIN_PROCESSING_URL_FORM)
				.successHandler(imoocAuthenticationSuccessHandler)
				.failureHandler(imoocAuthenticationFailureHandler);

		http
			.apply(smsCodeAuthenticationSecurityConfig)
			.and()
			.apply(imoocSocialSecurityConfig)
			.and()
			.apply(openIdAuthenticationSecurityConfig)
			.and()
			.authorizeRequests()
			.antMatchers(SecurityConstants.DEFAULT_UNAUTHENTICATION_URL,
					SecurityConstants.DEFAULT_LOGIN_PROCESSING_URL_MOBILE,
					securityProperties.getBrowser().getLoginPage(),
					SecurityConstants.DEFAULT_VALIDATE_CODE_URL_PREFIX + "/*",
					securityProperties.getBrowser().getSignUpUrl(),
					SecurityConstants.DEFAULT_SESSION_INVALID_URL,
					SecurityConstants.DEFAULT_SOCIAL_SIGNUP_URL,
					"/user/regist")
			.permitAll()
			.anyRequest()
			.authenticated()
			.and()
				.csrf()
				.disable();
	}

}
