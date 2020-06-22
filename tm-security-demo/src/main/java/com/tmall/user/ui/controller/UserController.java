package com.tmall.user.ui.controller;

import com.tmall.security.core.properties.SecurityProperties;
import com.tmall.user.application.convert.DTOConvert;
import com.tmall.user.application.service.UserService;
import com.tmall.user.domain.entity.User;
import com.tmall.user.ui.dto.UserDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.social.connect.web.ProviderSignInUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


@RequestMapping(value = "/user")
@RestController
public class UserController {
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private ProviderSignInUtils providerSignInUtils;

	@Autowired
	private UserService userService;

	@Autowired
	private SecurityProperties securityProperties;

	@Autowired
	private DTOConvert <UserDTO, User> dTOConvert;
	
	@PostMapping("/regist")
	public void regist(UserDTO userDto, HttpServletRequest request) throws Exception {
		userService.addUser(dTOConvert.convert (userDto));
	}

	@GetMapping("/me")
	public Object getCurrentUser(Authentication user, HttpServletRequest request) throws Exception {
		
		String header = request.getHeader("Authorization");
		String token = StringUtils.substringAfter(header, "bearer ");
		
		Claims claims = Jwts.parser().setSigningKey(securityProperties.getOauth2().getJwtSigningKey().getBytes("UTF-8"))
		.parseClaimsJws(token).getBody();
		String company = (String)claims.get("company");
		logger.info("-->" + company);
		return user;
	}

}
