package com.tmall.security.browser;

import com.tmall.security.core.authentication.AbstractChannelSecurityConfig;
import com.tmall.security.core.authentication.mobile.SmsCodeAuthenticationSecurityConfig;
import com.tmall.security.core.authorize.AuthorizeConfigManager;
import com.tmall.security.core.properties.SecurityProperties;
import com.tmall.security.core.validate.config.ValidateCodeSecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.session.InvalidSessionStrategy;
import org.springframework.security.web.session.SessionInformationExpiredStrategy;
import org.springframework.social.security.SpringSocialConfigurer;

import javax.sql.DataSource;



@Configuration
public class BrowserSecurityConfig extends AbstractChannelSecurityConfig {
	
	@Autowired
	private SecurityProperties securityProperties;

	@Autowired
	private DataSource dataSource;

	@Autowired
	private SmsCodeAuthenticationSecurityConfig smsCodeAuthenticationSecurityConfig;
	
	@Autowired
	private ValidateCodeSecurityConfig validateCodeSecurityConfig;
	
	@Autowired
	private SpringSocialConfigurer imoocSocialSecurityConfig;
	
	@Autowired
	private InvalidSessionStrategy invalidSessionStrategy;
	
	@Autowired
	private SessionInformationExpiredStrategy sessionInformationExpiredStrategy;
	
	@Autowired
	private LogoutSuccessHandler tmallLogoutSuccessHandler;
	
	@Autowired
	private AuthorizeConfigManager authorizeConfigManager;
	
	@Bean
	public PersistentTokenRepository persistentTokenRepository() {
		JdbcTokenRepositoryImpl tokenRepository = new JdbcTokenRepositoryImpl();
		tokenRepository.setDataSource(dataSource);
		// 如果token表不存在，使用下面语句可以初始化该表；若存在，请注释掉这条语句，否则会报错。
//        tokenRepository.setCreateTableOnStartup(true);
		return tokenRepository;
	};
		
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
//		http.httpBasic().and().authorizeRequests().anyRequest().authenticated();

//		http.formLogin().loginPage("/imooc-signIn.html")
//		.loginProcessingUrl("/user/login")
//		.and().authorizeRequests()
//		.antMatchers("/imooc-signIn.html").permitAll()
//		.anyRequest().authenticated()
//		.and().csrf().disable();
		
		applyPasswordAuthenticationConfig(http);
		
//	 	ValidateCodeFilter validateCodeFilter = new ValidateCodeFilter();
//		validateCodeFilter.setAuthenticationFailureHandler(imoocAuthenticationFailureHandler);
//		validateCodeFilter.setSecurityProperties(securityProperties);
//		validateCodeFilter.setValidateCodeProcessorHolder(validateCodeProcessorHolder);
//		validateCodeFilter.afterPropertiesSet();
		
//		SmsCodeFilter smsCodeFilter = new SmsCodeFilter();
//		smsCodeFilter.setAuthenticationFailureHandler(imoocAuthenticationFailureHandler);
//		smsCodeFilter.setSecurityProperties(securityProperties);
//		smsCodeFilter.setValidateCodeProcessorHolder(validateCodeProcessorHolder);
//		smsCodeFilter.afterPropertiesSet();
		
		http
		.apply(validateCodeSecurityConfig)
		.and()
		.apply(smsCodeAuthenticationSecurityConfig)
		.and()
		.apply(imoocSocialSecurityConfig)
		.and()
//		.addFilterBefore(smsCodeFilter, UsernamePasswordAuthenticationFilter.class)
//		.addFilterBefore(validateCodeFilter, UsernamePasswordAuthenticationFilter.class)
//		.formLogin()		
//		.loginPage(SecurityConstants.DEFAULT_UNAUTHENTICATION_URL)
//		.loginProcessingUrl(SecurityConstants.DEFAULT_LOGIN_PROCESSING_URL_FORM)
//		.successHandler(imoocAuthenticationSucessHandler)
//		.failureHandler(imoocAuthenticationFailureHandler)
		
//		.and()
//		.rememberMe()
//		.tokenRepository(persistentTokenRepository())
//		.tokenValiditySeconds(securityProperties.getBrowser().getRememberMeSeconds())
//		.userDetailsService(userDetailsService)
//		.and()
		.sessionManagement()
		.invalidSessionStrategy(invalidSessionStrategy)
//		.invalidSessionUrl(SecurityConstants.DEFAULT_SESSION_INVALID_URL)
		.maximumSessions(securityProperties.getBrowser().getSession().getMaximumSessions())
		.maxSessionsPreventsLogin(securityProperties.getBrowser().getSession().isMaxSessionsPreventsLogin())
		.expiredSessionStrategy(sessionInformationExpiredStrategy)
		.and()
		.and()
		.logout()
//		.logoutUrl("/signOut")
		.logoutSuccessHandler(tmallLogoutSuccessHandler)
//		.deleteCookies("JSESSIONID")
//		.logoutSuccessUrl("imooc-logout.html")
		.and()
//		.authorizeRequests()
//		.antMatchers(SecurityConstants.DEFAULT_UNAUTHENTICATION_URL,
//				SecurityConstants.DEFAULT_LOGIN_PROCESSING_URL_MOBILE,
//				securityProperties.getBrowser().getLoginPage(),
//				SecurityConstants.DEFAULT_VALIDATE_CODE_URL_PREFIX + "/*",
//				securityProperties.getBrowser().getSignUpUrl(),
//				SecurityConstants.DEFAULT_SESSION_INVALID_URL,
//				"/user/regist")
//		.permitAll()
//		.antMatchers(HttpMethod.GET, "/user/*")
////		.access("hasRole('ADMIN') and hasIpAddress('xxxx')")
//		.hasRole("ADMIN")
//		.anyRequest().authenticated()
//		.and()
		.csrf()
		.disable();
		authorizeConfigManager.config(http.authorizeRequests());
	}

}
