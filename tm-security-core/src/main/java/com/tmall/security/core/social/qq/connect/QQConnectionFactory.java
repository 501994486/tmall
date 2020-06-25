package com.tmall.security.core.social.qq.connect;

import com.tmall.security.core.social.qq.api.QQ;
import org.springframework.social.connect.support.OAuth2ConnectionFactory;

public class QQConnectionFactory extends OAuth2ConnectionFactory<QQ> {

	/**
	 * @param providerId    我们给服务提供商的唯一标识
	 * @param appId 服务提供商给的AppId
	 * @param appSecret 服务提供商给的App密码
	 */
	public QQConnectionFactory(String providerId, String appId, String appSecret) {
		super(providerId, new QQServiceProvider(appId, appSecret), new QQAdapter());
	}

}
