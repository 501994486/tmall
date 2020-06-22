/**
 * 
 */
package com.tmall.security.app.social.impl;

import com.tmall.security.core.social.SocialAuthenticationFilterPostProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.social.security.SocialAuthenticationFilter;
import org.springframework.stereotype.Component;

/**
 * @author Administrator
 *
 */
@Component
public class AppSocialAuthenticationFilterPostProcessor implements SocialAuthenticationFilterPostProcessor {

	@Autowired
	private AuthenticationSuccessHandler imoocAuthenticationSuccessHandler;

	/* (non-Javadoc)
	 * @see com.tmall.security.core.social.SocialAuthenticationFilterPostProcessor#process(org.springframework.social.security.SocialAuthenticationFilter)
	 */
	@Override
	public void process(SocialAuthenticationFilter socialAuthenticationFilter) {
		socialAuthenticationFilter.setAuthenticationSuccessHandler(imoocAuthenticationSuccessHandler);
	}

}
