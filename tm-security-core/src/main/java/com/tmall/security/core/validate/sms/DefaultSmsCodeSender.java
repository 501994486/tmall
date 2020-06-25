/**
 * 
 */
package com.tmall.security.core.validate.sms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;


public class DefaultSmsCodeSender implements SmsCodeSender {

	private static final Logger logger = LoggerFactory.getLogger(AuthenticationSuccessHandler.class);

	public void send(String mobile, String code) {
		logger.info("向手机"+mobile+"发送短信验证码"+code+"");
	}
}
