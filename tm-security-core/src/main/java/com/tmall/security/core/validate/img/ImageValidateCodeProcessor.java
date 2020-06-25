package com.tmall.security.core.validate.img;


import com.tmall.security.core.validate.AbstractValidateCodeProcessor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.ServletWebRequest;

import javax.imageio.ImageIO;


@Component
public class ImageValidateCodeProcessor extends AbstractValidateCodeProcessor<ImageCode> {

	/**
	 * 将验证码写入到流中
	 * @param request
	 * @param imageCode
	 * @throws Exception
	 */
	@Override
	protected void send(ServletWebRequest request, ImageCode imageCode) throws Exception {
		ImageIO.write(imageCode.getImage(), "JPEG", request.getResponse().getOutputStream());
	}
	
}
