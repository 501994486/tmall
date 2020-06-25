package com.tmall.security.core.validate.img;

import com.tmall.security.core.validate.ValidateCode;
import lombok.Data;

import java.awt.image.BufferedImage;
import java.time.LocalDateTime;

@Data
public class ImageCode extends ValidateCode {
	private BufferedImage image;

	public ImageCode(BufferedImage image,String code,int expireIn){
		super(code,expireIn);
		this.image = image;
	}

	public ImageCode(BufferedImage image,String code,LocalDateTime expireTime){
		super(code,expireTime);
		this.image = image;
	}
}