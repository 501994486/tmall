package com.tmall.user.application.service;

import com.tmall.user.domain.entity.User;
import com.tmall.user.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public boolean addUser(User user){
		user.setUserId(1);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setActivateFlag((byte)0);
		user.setLastLoginTime(new Timestamp(System.currentTimeMillis()));
		user.setEntryDate(new Timestamp(System.currentTimeMillis()));
		user.setModifyDate(new Timestamp(System.currentTimeMillis()));

		if(userRepository.addUser(user)==1){
			return true;
		}
		return  false;
	}

	@Override
	public User findUserByUserId(int userId) {
		return userRepository.findUserByUserId(userId);
	}

	@Override
	public User findUserByMailOrPhone(String userName) {
		return userRepository.findUserByMailOrPhone(userName);
	}


}
