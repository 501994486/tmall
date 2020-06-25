/**
 * 
 */
package com.tmall.security.core.social.qq.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.social.oauth2.AbstractOAuth2ApiBinding;
import org.springframework.social.oauth2.TokenStrategy;

import java.io.IOException;

/**
 * 获取用户信息
 * 不能声明为单例，因为每个用户的验证是不同的
 */
public class QQImpl extends AbstractOAuth2ApiBinding implements QQ {

	private Logger logger = LoggerFactory.getLogger(getClass());
	
	private static final String URL_GET_OPENID = "https://graph.qq.com/oauth2.0/me?access_token=%s";
	
	private static final String URL_GET_USERINFO = "https://graph.qq.com/user/get_user_info?oauth_consumer_key=%s&openid=%s";

	private String appId;   //申请QQ登录成功后，分配给应用的appid
	private String openId;  //用户的ID，与QQ号码一一对应。

	private ObjectMapper objectMapper = new ObjectMapper();
	
	public QQImpl(String accessToken, String appId) {
		super(accessToken, TokenStrategy.ACCESS_TOKEN_PARAMETER);//将token作为查询参数
		this.appId = appId;
		String url = String.format(URL_GET_OPENID, accessToken);//拼接成最终的openid的请求地址
		String result = getRestTemplate().getForObject(url, String.class);
		
		logger.info(result);
		
		this.openId = StringUtils.substringBetween(result, "\"openid\":\"", "\"}");
	}

	/**
	 * 获取用户信息
	 * @return
	 */
	@Override
	public QQUserInfo getUserInfo() {
		String url = String.format(URL_GET_USERINFO, appId, openId);
		String result = getRestTemplate().getForObject(url, String.class);
		
		logger.info(result);
		
		QQUserInfo userInfo = null;		
		try {
			userInfo = objectMapper.readValue(result, QQUserInfo.class);
			userInfo.setOpenId(openId);
			return userInfo;
		} catch (IOException e) {
			throw new RuntimeException("获取用户信息失败", e);
		}
	}

}
