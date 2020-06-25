/**
 * 
 */
package com.tmall.security.core.social.weixin.connect;

import org.springframework.social.oauth2.AccessGrant;

/**
 * 对微信access_token信息的封装
 * 与标准的OAuth2协议不同，微信在获取access_token时会同时返回openId，并没有单独的通过accessToke换取openId的服务
 * 在此处继承标准AccessGrant（Spring提供的令牌封装类），添加openId字段
 */
public class WeixinAccessGrant extends AccessGrant {

	/**
	 * @param accessToken
	 * @param scope
	 * @param refreshToken
	 * @param expiresIn
	 */
	public WeixinAccessGrant(String accessToken, String scope, String refreshToken, Long expiresIn) {
		super(accessToken, scope, refreshToken, expiresIn);
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 8529084489038651387L;
	
	private String openId;
	
	public WeixinAccessGrant() {
		super("");
	}

}
