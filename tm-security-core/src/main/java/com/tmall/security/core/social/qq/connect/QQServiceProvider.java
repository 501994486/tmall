/**
 * 
 */
package com.tmall.security.core.social.qq.connect;

import com.tmall.security.core.social.qq.api.QQ;
import com.tmall.security.core.social.qq.api.QQImpl;
import org.springframework.social.oauth2.AbstractOAuth2ServiceProvider;

/**
 * 泛型是API接口的类型
 */
public class QQServiceProvider extends AbstractOAuth2ServiceProvider<QQ> {

	private String appId;

	private static final String URL_AUTHORIZE = "https://graph.qq.com/oauth2.0/authorize";  //获取授权码地址
	private static final String URL_ACCESS_TOKEN = "https://graph.qq.com/oauth2.0/token";   //获取用户令牌地址

	/**
	 *
	 * @param appId
	 * @param appSecret
	 */
	public QQServiceProvider(String appId, String appSecret) {
		super(new QQOAuth2Template(appId, appSecret, URL_AUTHORIZE, URL_ACCESS_TOKEN));
		this.appId = appId;
	}

	@Override
	public QQ getApi(String accessToken) {
		return new QQImpl(accessToken, appId);
	}

}
