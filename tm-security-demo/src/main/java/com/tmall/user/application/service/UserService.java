package com.tmall.user.application.service;

import com.tmall.user.domain.entity.User;

public interface UserService {

	boolean addUser(User user);

	User findUserByUserId(int userId);

	User findUserByMailOrPhone(String userName);
}
