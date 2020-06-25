package com.tmall.security.core.social.qq.connect;

import com.tmall.security.core.social.qq.api.QQ;
import com.tmall.security.core.social.qq.api.QQUserInfo;
import org.springframework.social.connect.ApiAdapter;
import org.springframework.social.connect.ConnectionValues;
import org.springframework.social.connect.UserProfile;

/**
 * 用于对个性化服务提供商的用户数据和spring social的标准数据进行适配
 */
public class QQAdapter implements ApiAdapter<QQ> {


	/**
	 * 用来测试当前的API是否可用
	 * @param api
	 * @return
	 */
	@Override
	public boolean test(QQ api) {
		return true;
	}

	/**
	 * 将服务提供商个性化的用户信息映射到ConnectionValues标准的数据化结构上
	 * @param api
	 * @param values
	 */
	@Override
	public void setConnectionValues(QQ api, ConnectionValues values) {
		QQUserInfo userInfo = api.getUserInfo();
		
		values.setDisplayName(userInfo.getNickname());//显示的用户名称
		values.setImageUrl(userInfo.getFigureurl_qq_1());//用户的头像
		values.setProfileUrl(null);
		values.setProviderUserId(userInfo.getOpenId());//QQService的唯一标识
	}

	/**
	 * 和上面的方法类似
	 * @param api
	 * @return
	 */
	@Override
	public UserProfile fetchUserProfile(QQ api) {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 *
	 * @param api
	 * @param message
	 */
	@Override
	public void updateStatus(QQ api, String message) {
		// TODO Auto-generated method stub
	}

}
