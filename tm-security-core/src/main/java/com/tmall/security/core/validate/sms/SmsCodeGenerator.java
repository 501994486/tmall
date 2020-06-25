package com.tmall.security.core.validate.sms;

import com.tmall.security.core.properties.SecurityProperties;
import com.tmall.security.core.validate.ValidateCode;
import com.tmall.security.core.validate.ValidateCodeGenerator;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.ServletWebRequest;

@Component
public class SmsCodeGenerator implements ValidateCodeGenerator {

	@Autowired
	private SecurityProperties securityProperties;
	
	/**
	 * @return the securityProperties
	 */
	public SecurityProperties getSecurityProperties() {
		return securityProperties;
	}

	/**
	 * @param securityProperties the securityProperties to set
	 */
	public void setSecurityProperties(SecurityProperties securityProperties) {
		this.securityProperties = securityProperties;
	}

	/**
	 * 生成短信验证码
	 * @param request
	 * @return
	 */
	public ValidateCode generate(ServletWebRequest request) {
		String code = RandomStringUtils.randomNumeric(securityProperties.getCode().getSms().getLength());
		return new ValidateCode(code, securityProperties.getCode().getSms().getExpireIn());
	}
	
}
