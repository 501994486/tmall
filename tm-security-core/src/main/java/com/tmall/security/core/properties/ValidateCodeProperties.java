package com.tmall.security.core.properties;

public class ValidateCodeProperties {

	private ImageCodeProperties image = new ImageCodeProperties();
	
	private SmsCodeProperties sms = new SmsCodeProperties();

	public ImageCodeProperties getImage() {
		return image;
	}

	public void setImage(ImageCodeProperties image) {
		this.image = image;
	}

	/**
	 * @return the sms
	 */
	public SmsCodeProperties getSms() {
		return sms;
	}

	/**
	 * @param sms the sms to set
	 */
	public void setSms(SmsCodeProperties sms) {
		this.sms = sms;
	}
	
}
