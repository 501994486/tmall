
package com.tmall.security.core.properties;

import lombok.Data;

/**
 * 微信登录配置
 */
@Data
public class WeixinProperties {
	
	private String providerId = "weixin";//第三方id，用来决定发起第三方登录的url，默认是weixin
	private String appId = "";
	private String appSecret = "";

}
