package com.tmall.security.core.properties;

public class SmsCodeProperties {
	
	private int length = 6;
	
	private int expireIn = 60;
	
	private String url;

	/**
	 * @return the length
	 */
	public int getLength() {
		return length;
	}

	/**
	 * @param length the length to set
	 */
	public void setLength(int length) {
		this.length = length;
	}

	/**
	 * @return the expireIn
	 */
	public int getExpireIn() {
		return expireIn;
	}

	/**
	 * @param expireIn the expireIn to set
	 */
	public void setExpireIn(int expireIn) {
		this.expireIn = expireIn;
	}

	/**
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * @param url the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
	}
	
}
