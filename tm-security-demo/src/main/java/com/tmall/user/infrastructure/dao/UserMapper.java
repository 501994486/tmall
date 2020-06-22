package com.tmall.user.infrastructure.dao;

import com.tmall.user.domain.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

	@Select("SELECT * FROM TM_USER WHERE user_id = #{userId}")
	User selectTmUserByUserId(Integer userId);

	@Select("SELECT * FROM TM_USER WHERE mail = #{mail} or phone = #{userName}")
	User selectTmUserByMailOrPhone(String userName);

	@Insert("INSERT INTO TM_USER VALUES (#{userId}, #{mail},#{phone},#{password},#{activateFlag},#{recieveMailFlag},#{recieveMessageFlag},#{lastLoginTime},#{entryDate},#{modifyDate})")
	int insertUser(User user);
}
