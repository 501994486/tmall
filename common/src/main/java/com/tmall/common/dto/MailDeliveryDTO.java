package com.tmall.common.dto;

import lombok.Data;

import java.util.List;

@Data
public class MailDeliveryDTO {
	private String mailTitle;

	private String mailBody;

	private String returnAddress;

	private String sendAddress;

	private List<String> attachmentFileAddressList;
}
