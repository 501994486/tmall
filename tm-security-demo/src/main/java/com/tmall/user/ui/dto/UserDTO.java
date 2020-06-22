package com.tmall.user.ui.dto;

import lombok.Data;

@Data
public class UserDTO {

	private String mail;

	private String phone;

	private String password;

	private byte activateFlag;

	private byte recieveMailFlag;

	private byte recieveMessageFlag;
}
