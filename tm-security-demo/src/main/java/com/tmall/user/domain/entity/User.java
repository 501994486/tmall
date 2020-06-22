package com.tmall.user.domain.entity;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class User {
	private Integer userId;

	private String mail;

	private String phone;

	private String password;

	private byte activateFlag;

	private byte recieveMailFlag;

	private byte recieveMessageFlag;

	private Timestamp lastLoginTime;

	private Timestamp entryDate;

	private Timestamp modifyDate;

}
