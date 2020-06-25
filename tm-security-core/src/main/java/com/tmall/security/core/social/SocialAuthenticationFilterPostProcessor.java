/**
 * 
 */
package com.tmall.security.core.social;

import org.springframework.social.security.SocialAuthenticationFilter;

/**
 * @author Administrator
 *
 */
public interface SocialAuthenticationFilterPostProcessor {

	void process(SocialAuthenticationFilter socialAuthenticationFilter);
	
}
