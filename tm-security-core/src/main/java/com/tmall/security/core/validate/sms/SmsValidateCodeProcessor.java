/**
 * 
 */
package com.tmall.security.core.validate.sms;

import com.tmall.security.core.properties.SecurityConstants;
import com.tmall.security.core.validate.ValidateCode;
import com.tmall.security.core.validate.AbstractValidateCodeProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.ServletRequestUtils;
import org.springframework.web.context.request.ServletWebRequest;

/**
 * @author Administrator
 *
 */
@Component
public class SmsValidateCodeProcessor extends AbstractValidateCodeProcessor<ValidateCode> {

	// 短信验证码发送器
	@Autowired
	private SmsCodeSender smsCodeSender;

	/**
	 * 发送短信
	 * @param request
	 * @param validateCode
	 * @throws Exception
	 */
	@Override
	protected void send(ServletWebRequest request, ValidateCode validateCode) throws Exception {
		String paramName = SecurityConstants.DEFAULT_PARAMETER_NAME_MOBILE;
		String mobile = ServletRequestUtils.getRequiredStringParameter(request.getRequest(), paramName);
		smsCodeSender.send(mobile, validateCode.getCode());
	}

}
