package com.tmall.security.core.properties;

public class BrowserProperties {
	
	private SessionProperties session = new SessionProperties();

	private String logoutPage;
	
	private String loginPage = SecurityConstants.DEFAULT_LOGIN_PAGE_URL;
	
	// 注册
	private String signUpUrl = "/signUp.html";
	
	/**
	 * 退出成功时跳转的url，如果配置了，则跳到指定的url，如果没配置，则返回json数据。
	 */
	private String signOutUrl;
	
	private LoginType loginType = LoginType.JSON; 
	
	private int rememberMeSeconds = 30 * 24 * 60;

	public LoginType getLoginType() {
		return loginType;
	}

	public void setLoginType(LoginType loginType) {
		this.loginType = loginType;
	}

	public String getLoginPage() {
		return loginPage;
	}

	public void setLoginPage(String loginPage) {
		this.loginPage = loginPage;
	}

	/**
	 * @return the rememberMeSeconds
	 */
	public int getRememberMeSeconds() {
		return rememberMeSeconds;
	}

	/**
	 * @param rememberMeSeconds the rememberMeSeconds to set
	 */
	public void setRememberMeSeconds(int rememberMeSeconds) {
		this.rememberMeSeconds = rememberMeSeconds;
	}
	
	public SessionProperties getSession() {
		return session;
	}

	public void setSession(SessionProperties session) {
		this.session = session;
	}

	public String getLogoutPage() {
		return logoutPage;
	}

	public void setLogoutPage(String logoutPage) {
		this.logoutPage = logoutPage;
	}

	public String getSignUpUrl() {
		return signUpUrl;
	}

	public void setSignUpUrl(String signUpUrl) {
		this.signUpUrl = signUpUrl;
	}

	public String getSignOutUrl() {
		return signOutUrl;
	}

	public void setSignOutUrl(String signOutUrl) {
		this.signOutUrl = signOutUrl;
	}
}
