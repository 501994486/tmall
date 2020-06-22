package com.tmall.user.application.convert;

import com.tmall.user.domain.entity.User;
import com.tmall.user.ui.dto.UserDTO;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class UserDTOConvert implements DTOConvert<UserDTO, User>{

	@Override
	public User convert(UserDTO userDTO) throws Exception {
		User user = new User();
		BeanUtils.copyProperties(user,userDTO);
		return user;
	}

}
