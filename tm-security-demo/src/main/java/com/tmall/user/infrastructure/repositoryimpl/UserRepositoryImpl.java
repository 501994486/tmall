package com.tmall.user.infrastructure.repositoryimpl;

import com.tmall.user.domain.entity.User;
import com.tmall.user.domain.repository.UserRepository;
import com.tmall.user.infrastructure.dao.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {

	@Autowired
	private UserMapper userMapper;

	@Override
	public int addUser(User user) {
		return userMapper.insertUser(user);
	}

	@Override
	public User findUserByUserId(int userId) {
		return userMapper.selectTmUserByUserId(userId);
	}

	@Override
	public User findUserByMailOrPhone(String userName) {
		return userMapper.selectTmUserByMailOrPhone(userName);
	}


}
