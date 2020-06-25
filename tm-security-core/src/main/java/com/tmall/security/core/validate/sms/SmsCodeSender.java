/**
 * 
 */
package com.tmall.security.core.validate.sms;

/**
 * @author Administrator
 *
 */
public interface SmsCodeSender {
	
	void send(String moblie, String code);
	
}
