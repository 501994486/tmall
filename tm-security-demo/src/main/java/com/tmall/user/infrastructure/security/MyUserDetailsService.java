package com.tmall.user.infrastructure.security;

import com.tmall.user.application.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.social.security.SocialUser;
import org.springframework.social.security.SocialUserDetails;
import org.springframework.social.security.SocialUserDetailsService;
import org.springframework.stereotype.Component;

@Component
public class MyUserDetailsService implements UserDetailsService, SocialUserDetailsService {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		logger.info("form username:" + username);
		return buildUser(username);
	}

	// TODO 为什么必须要实现SocialUserDetailsService
	@Override
	public SocialUserDetails loadUserByUserId(String userId) throws UsernameNotFoundException {
		logger.info("social userId:" + userId);
		return buildUser(userId);
	}

	private SocialUserDetails buildUser(String userId) {
		String password = userService.findUserByMailOrPhone(userId).getPassword();
		logger.info("password:" + password);
		return new SocialUser(userId, password, true, true, true, true, 
				AuthorityUtils.commaSeparatedStringToAuthorityList("admin,ROLE_USER"));
	}

}
