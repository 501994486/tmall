/**
 * 
 */
package com.tmall.security.core.validate;

import org.springframework.web.context.request.ServletWebRequest;

public interface ValidateCodeGenerator {
	ValidateCode generate(ServletWebRequest request);
}

