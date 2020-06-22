package com.tmall.user.domain.repository;

import com.tmall.user.domain.entity.User;

public interface UserRepository {

	int addUser(User user);

	User findUserByUserId(int userId);

	User findUserByMailOrPhone(String userName);
}
